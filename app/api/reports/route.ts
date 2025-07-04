import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getCurrentUser } from "@/lib/session";

// GET /api/reports - Get various reports data
export async function GET(request: NextRequest) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    // Only admins and managers can access reports
    if (user.role !== 'ADMIN' && user.role !== 'MANAGER') {
      return new NextResponse("Forbidden", { status: 403 });
    }

    const { searchParams } = new URL(request.url);
    const reportType = searchParams.get('type');
    const startDate = searchParams.get('startDate');
    const endDate = searchParams.get('endDate');
    const year = searchParams.get('year');
    const month = searchParams.get('month');

    // Set default date range if not provided
    const defaultStartDate = startDate ? new Date(startDate) : new Date(new Date().getFullYear(), 0, 1);
    const defaultEndDate = endDate ? new Date(endDate) : new Date();

    switch (reportType) {
      case 'overview':
        return await getOverviewReport();
      
      case 'payments':
        return await getPaymentsReport(defaultStartDate, defaultEndDate);
      
      case 'dues':
        return await getDuesReport(year ? parseInt(year) : undefined, month ? parseInt(month) : undefined);
      
      case 'residents':
        return await getResidentsReport();
      
      case 'monthly':
        return await getMonthlyReport(year ? parseInt(year) : new Date().getFullYear());
      
      default:
        return await getAllReports(defaultStartDate, defaultEndDate);
    }
  } catch (error) {
    console.error("Error generating reports:", error);
    return NextResponse.json(
      { error: "Raporlar oluşturulurken hata oluştu" },
      { status: 500 }
    );
  }
}

// Overview Report - General statistics
async function getOverviewReport() {
  const [
    totalApartments,
    totalResidents,
    totalAnnouncements,
    totalDues,
    totalPayments,
    unpaidDues,
    thisMonthPayments,
    recentPayments
  ] = await Promise.all([
    db.apartment.count(),
    db.user.count({ where: { role: { in: ['RESIDENT', 'LANDLORD'] } } }),
    db.announcement.count(),
    db.due.count(),
    db.payment.count(),
    db.due.count({ where: { payment: null } }),
    db.payment.count({
      where: {
        paymentDate: {
          gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1)
        }
      }
    }),
    db.payment.findMany({
      take: 5,
      orderBy: { paymentDate: 'desc' },
      include: {
        due: {
          include: {
            apartment: {
              include: {
                block: true
              }
            }
          }
        },
        payer: {
          select: {
            fullName: true
          }
        }
      }
    })
  ]);

  const totalDueAmount = await db.due.aggregate({
    _sum: { amount: true }
  });

  const totalPaymentAmount = await db.payment.aggregate({
    _sum: { amount: true }
  });

  const unpaidDueAmount = await db.due.aggregate({
    where: { payment: null },
    _sum: { amount: true }
  });

  return NextResponse.json({
    overview: {
      totalApartments,
      totalResidents,
      totalAnnouncements,
      totalDues,
      totalPayments,
      unpaidDues,
      thisMonthPayments,
      totalDueAmount: Number(totalDueAmount._sum.amount || 0),
      totalPaymentAmount: Number(totalPaymentAmount._sum.amount || 0),
      unpaidDueAmount: Number(unpaidDueAmount._sum.amount || 0),
      collectionRate: totalDues > 0 ? ((totalPayments / totalDues) * 100).toFixed(2) : 0,
      recentPayments: recentPayments.map(payment => ({
        id: payment.id,
        amount: Number(payment.amount),
        paymentDate: payment.paymentDate.toISOString(),
        apartment: `${payment.due.apartment.block.name} - ${payment.due.apartment.number}`,
        payer: payment.payer.fullName
      }))
    }
  });
}

// Payments Report - Payment statistics and trends
async function getPaymentsReport(startDate: Date, endDate: Date) {
  const payments = await db.payment.findMany({
    where: {
      paymentDate: {
        gte: startDate,
        lte: endDate
      }
    },
    include: {
      due: {
        include: {
          apartment: {
            include: {
              block: true
            }
          }
        }
      },
      payer: {
        select: {
          id: true,
          fullName: true,
          role: true
        }
      }
    },
    orderBy: { paymentDate: 'desc' }
  });

  // Group by payment method
  const paymentsByMethod = payments.reduce((acc, payment) => {
    const method = payment.paymentMethod || 'Belirtilmemiş';
    if (!acc[method]) {
      acc[method] = { count: 0, amount: 0 };
    }
    acc[method].count++;
    acc[method].amount += Number(payment.amount);
    return acc;
  }, {} as Record<string, { count: number; amount: number }>);

  // Group by month
  const paymentsByMonth = payments.reduce((acc, payment) => {
    const monthKey = payment.paymentDate.toISOString().substring(0, 7); // YYYY-MM
    if (!acc[monthKey]) {
      acc[monthKey] = { count: 0, amount: 0 };
    }
    acc[monthKey].count++;
    acc[monthKey].amount += Number(payment.amount);
    return acc;
  }, {} as Record<string, { count: number; amount: number }>);

  const totalAmount = payments.reduce((sum, payment) => sum + Number(payment.amount), 0);
  const avgPayment = payments.length > 0 ? totalAmount / payments.length : 0;

  return NextResponse.json({
    payments: {
      totalPayments: payments.length,
      totalAmount,
      avgPayment,
      paymentsByMethod,
      paymentsByMonth,
      dateRange: {
        start: startDate.toISOString(),
        end: endDate.toISOString()
      }
    }
  });
}

// Dues Report - Dues status and collections
async function getDuesReport(year?: number, month?: number) {
  const whereConditions: any = {};
  
  if (year) whereConditions.year = year;
  if (month) whereConditions.month = month;

  const [allDues, paidDues, unpaidDues] = await Promise.all([
    db.due.findMany({
      where: whereConditions,
      include: {
        apartment: {
          include: {
            block: true
          }
        },
        payment: true
      },
      orderBy: [
        { year: 'desc' },
        { month: 'desc' },
        { apartment: { block: { name: 'asc' } } },
        { apartment: { number: 'asc' } }
      ]
    }),
    db.due.count({
      where: {
        ...whereConditions,
        payment: { isNot: null }
      }
    }),
    db.due.count({
      where: {
        ...whereConditions,
        payment: null
      }
    })
  ]);

  const totalDueAmount = allDues.reduce((sum, due) => sum + Number(due.amount), 0);
  const paidAmount = allDues
    .filter(due => due.payment)
    .reduce((sum, due) => sum + Number(due.payment!.amount), 0);
  const unpaidAmount = allDues
    .filter(due => !due.payment)
    .reduce((sum, due) => sum + Number(due.amount), 0);

  // Group by block
  const duesByBlock = allDues.reduce((acc, due) => {
    const blockName = due.apartment.block.name;
    if (!acc[blockName]) {
      acc[blockName] = { total: 0, paid: 0, unpaid: 0, totalAmount: 0, paidAmount: 0, unpaidAmount: 0 };
    }
    acc[blockName].total++;
    acc[blockName].totalAmount += Number(due.amount);
    
    if (due.payment) {
      acc[blockName].paid++;
      acc[blockName].paidAmount += Number(due.payment.amount);
    } else {
      acc[blockName].unpaid++;
      acc[blockName].unpaidAmount += Number(due.amount);
    }
    return acc;
  }, {} as Record<string, any>);

  return NextResponse.json({
    dues: {
      total: allDues.length,
      paid: paidDues,
      unpaid: unpaidDues,
      totalAmount: totalDueAmount,
      paidAmount,
      unpaidAmount,
      collectionRate: allDues.length > 0 ? ((paidDues / allDues.length) * 100).toFixed(2) : 0,
      duesByBlock,
      period: { year, month }
    }
  });
}

// Residents Report - Resident statistics
async function getResidentsReport() {
  const [users, apartments, usersByRole, usersByBlock] = await Promise.all([
    db.user.findMany({
      include: {
        apartment: {
          include: {
            block: true
          }
        }
      },
      orderBy: { fullName: 'asc' }
    }),
    db.apartment.findMany({
      include: {
        residents: true,
        block: true
      }
    }),
    db.user.groupBy({
      by: ['role'],
      _count: true
    }),
    db.user.findMany({
      where: {
        apartment: { isNot: null }
      },
      include: {
        apartment: {
          include: {
            block: true
          }
        }
      }
    })
  ]);

  const roleStats = usersByRole.reduce((acc, group) => {
    acc[group.role] = group._count;
    return acc;
  }, {} as Record<string, number>);

  const blockStats = usersByBlock.reduce((acc, user) => {
    if (user.apartment) {
      const blockName = user.apartment.block.name;
      if (!acc[blockName]) acc[blockName] = 0;
      acc[blockName]++;
    }
    return acc;
  }, {} as Record<string, number>);

  const occupiedApartments = apartments.filter(apt => apt.residents.length > 0).length;
  const emptyApartments = apartments.length - occupiedApartments;

  return NextResponse.json({
    residents: {
      totalUsers: users.length,
      occupiedApartments,
      emptyApartments,
      occupancyRate: apartments.length > 0 ? ((occupiedApartments / apartments.length) * 100).toFixed(2) : 0,
      roleStats,
      blockStats
    }
  });
}

// Monthly Report - Month-by-month breakdown
async function getMonthlyReport(year: number) {
  const monthlyData = [];
  
  for (let month = 1; month <= 12; month++) {
    const [duesCount, paymentsCount, dueAmount, paymentAmount] = await Promise.all([
      db.due.count({ where: { year, month } }),
      db.payment.count({
        where: {
          paymentDate: {
            gte: new Date(year, month - 1, 1),
            lt: new Date(year, month, 1)
          }
        }
      }),
      db.due.aggregate({
        where: { year, month },
        _sum: { amount: true }
      }),
      db.payment.aggregate({
        where: {
          paymentDate: {
            gte: new Date(year, month - 1, 1),
            lt: new Date(year, month, 1)
          }
        },
        _sum: { amount: true }
      })
    ]);

    monthlyData.push({
      month,
      monthName: new Date(year, month - 1).toLocaleDateString('tr-TR', { month: 'long' }),
      duesCount,
      paymentsCount,
      dueAmount: Number(dueAmount._sum.amount || 0),
      paymentAmount: Number(paymentAmount._sum.amount || 0),
      collectionRate: duesCount > 0 ? ((paymentsCount / duesCount) * 100).toFixed(2) : 0
    });
  }

  return NextResponse.json({
    monthly: {
      year,
      data: monthlyData
    }
  });
}

// All Reports - Combined data
async function getAllReports(startDate: Date, endDate: Date) {
  const [overview, payments, dues, residents] = await Promise.all([
    getOverviewReport(),
    getPaymentsReport(startDate, endDate),
    getDuesReport(),
    getResidentsReport()
  ]);

  const overviewData = await overview.json();
  const paymentsData = await payments.json();
  const duesData = await dues.json();
  const residentsData = await residents.json();

  return NextResponse.json({
    ...overviewData,
    ...paymentsData,
    ...duesData,
    ...residentsData,
    generated: new Date().toISOString()
  });
} 