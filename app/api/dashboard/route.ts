import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getCurrentUser } from "@/lib/session";

// GET /api/dashboard - Get dashboard statistics
export async function GET(request: NextRequest) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    // Get current month and year
    const now = new Date();
    const currentYear = now.getFullYear();
    const currentMonth = now.getMonth() + 1;

    // Parallel queries for better performance
    const [
      totalBlocks,
      totalApartments,
      totalUsers,
      totalResidents,
      totalAnnouncements,
      publishedAnnouncements,
      totalDues,
      paidDues,
      unpaidDues,
      totalPayments,
      thisMonthPayments,
      recentPayments,
      recentAnnouncements,
      monthlyData
    ] = await Promise.all([
      // Basic counts
      db.block.count(),
      db.apartment.count(),
      db.user.count(),
      db.user.count({ where: { role: { in: ['RESIDENT', 'LANDLORD'] } } }),
      
      // Announcements
      db.announcement.count(),
      db.announcement.count({ where: { isPublished: true } }),
      
      // Dues and payments
      db.due.count(),
      db.due.count({ where: { payment: { isNot: null } } }),
      db.due.count({ where: { payment: null } }),
      db.payment.count(),
      db.payment.count({
        where: {
          paymentDate: {
            gte: new Date(currentYear, currentMonth - 1, 1),
            lt: new Date(currentYear, currentMonth, 1)
          }
        }
      }),
      
      // Recent data for widgets
      db.payment.findMany({
        take: 5,
        orderBy: { paymentDate: 'desc' },
        include: {
          due: {
            include: {
              apartment: {
                include: { block: true }
              }
            }
          },
          payer: {
            select: { fullName: true }
          }
        }
      }),
      
      db.announcement.findMany({
        take: 5,
        where: { isPublished: true },
        orderBy: { createdAt: 'desc' },
        include: {
          author: {
            select: { fullName: true, role: true }
          }
        }
      }),
      
      // Monthly chart data for last 6 months
      db.payment.findMany({
        where: {
          paymentDate: {
            gte: new Date(currentYear, currentMonth - 7, 1) // Last 6 months
          }
        },
        include: {
          due: true
        },
        orderBy: { paymentDate: 'asc' }
      })
    ]);

    // Calculate financial amounts
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

    const thisMonthPaymentAmount = await db.payment.aggregate({
      where: {
        paymentDate: {
          gte: new Date(currentYear, currentMonth - 1, 1),
          lt: new Date(currentYear, currentMonth, 1)
        }
      },
      _sum: { amount: true }
    });

    // Calculate dues data for last 6 months
    const duesData = await db.due.findMany({
      where: {
        year: { gte: currentYear },
        month: { gte: Math.max(1, currentMonth - 5) }
      },
      include: {
        payment: true
      }
    });

    // Process monthly chart data
    const monthlyStats = [];
    for (let i = 5; i >= 0; i--) {
      const date = new Date(currentYear, currentMonth - 1 - i, 1);
      const year = date.getFullYear();
      const month = date.getMonth() + 1;
      
      const monthName = date.toLocaleDateString('tr-TR', { month: 'short' });
      
      // Filter dues and payments for this month
      const monthDues = duesData.filter(due => due.year === year && due.month === month);
      const monthPayments = monthlyData.filter(payment => {
        const paymentDate = new Date(payment.paymentDate);
        return paymentDate.getFullYear() === year && paymentDate.getMonth() + 1 === month;
      });
      
      const totalDueAmount = monthDues.reduce((sum, due) => sum + Number(due.amount), 0);
      const collectedAmount = monthPayments.reduce((sum, payment) => sum + Number(payment.amount), 0);
      
      monthlyStats.push({
        name: monthName,
        total: totalDueAmount,
        collected: collectedAmount,
        year,
        month
      });
    }

    // Process dues summary for last 5 months
    const duesSummary = [];
    for (let i = 4; i >= 0; i--) {
      const date = new Date(currentYear, currentMonth - 1 - i, 1);
      const year = date.getFullYear();
      const month = date.getMonth() + 1;
      
      const monthName = date.toLocaleDateString('tr-TR', { month: 'long' });
      
      const monthDues = duesData.filter(due => due.year === year && due.month === month);
      const totalAmount = monthDues.reduce((sum, due) => sum + Number(due.amount), 0);
      const collectedAmount = monthDues
        .filter(due => due.payment)
        .reduce((sum, due) => sum + Number(due.payment!.amount), 0);
      
      const percentage = totalAmount > 0 ? Math.round((collectedAmount / totalAmount) * 100) : 0;
      
      duesSummary.push({
        month: monthName,
        collected: collectedAmount,
        total: totalAmount,
        percentage
      });
    }

    // Format recent payments
    const formattedRecentPayments = recentPayments.map(payment => ({
      id: payment.id,
      amount: Number(payment.amount),
      paymentDate: payment.paymentDate.toISOString(),
      apartment: `${payment.due.apartment.block.name}-${payment.due.apartment.number}`,
      payer: payment.payer.fullName,
      method: payment.paymentMethod || 'Belirtilmemiş'
    }));

    // Format recent announcements
    const formattedRecentAnnouncements = recentAnnouncements.map(announcement => ({
      id: announcement.id,
      title: announcement.title,
      content: announcement.content,
      createdAt: announcement.createdAt.toISOString(),
      author: announcement.author.fullName,
      authorRole: announcement.author.role,
      isUrgent: false // Default value since isUrgent field doesn't exist in schema
    }));

    const dashboardData = {
      stats: {
        totalBlocks,
        totalApartments,
        totalUsers,
        totalResidents,
        totalAnnouncements,
        publishedAnnouncements,
        totalDues,
        paidDues,
        unpaidDues,
        totalPayments,
        thisMonthPayments,
        totalDueAmount: Number(totalDueAmount._sum.amount) || 0,
        totalPaymentAmount: Number(totalPaymentAmount._sum.amount) || 0,
        unpaidDueAmount: Number(unpaidDueAmount._sum.amount) || 0,
        thisMonthPaymentAmount: Number(thisMonthPaymentAmount._sum.amount) || 0,
        collectionRate: totalDues > 0 ? ((paidDues / totalDues) * 100).toFixed(1) : '0'
      },
      monthlyChart: monthlyStats,
      duesSummary,
      recentPayments: formattedRecentPayments,
      recentAnnouncements: formattedRecentAnnouncements,
      lastUpdated: new Date().toISOString()
    };

    return NextResponse.json(dashboardData);

  } catch (error) {
    console.error("Error generating dashboard data:", error);
    return NextResponse.json(
      { error: "Dashboard verileri alınırken hata oluştu" },
      { status: 500 }
    );
  }
} 