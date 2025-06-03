"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PaymentModal } from "./payment-modal";

const initialBills = [
  { id: 1, name: "Electricity Bill", amount: 85, dueDate: "2023-07-15" },
  { id: 2, name: "Internet Service", amount: 60, dueDate: "2023-07-18" },
  { id: 3, name: "Credit Card Payment", amount: 500, dueDate: "2023-07-25" },
  { id: 4, name: "Water Bill", amount: 45, dueDate: "2023-07-30" },
];

export function QuickBillPay() {
  const [bills, setBills] = useState(initialBills);
  const [selectedBill, setSelectedBill] = useState(null);

  const handlePaymentSuccess = (paidBillId) => {
    setBills(bills.filter((bill) => bill.id !== paidBillId));
    setSelectedBill(null);
  };

  return (
    <Card data-oid="zckm0y:">
      <CardHeader data-oid=".:ss02n">
        <CardTitle data-oid="gi7ifrq">Quick Bill Pay</CardTitle>
      </CardHeader>
      <CardContent data-oid="7q2wie5">
        {bills.length > 0 ? (
          <div className="space-y-4" data-oid="gqky5r4">
            {bills.map((bill) => (
              <div
                key={bill.id}
                className="flex items-center justify-between"
                data-oid="pei-d:u"
              >
                <div data-oid="tgbo55.">
                  <p className="font-medium" data-oid="19k7-oz">
                    {bill.name}
                  </p>
                  <p
                    className="text-sm text-muted-foreground"
                    data-oid="cgtf7vn"
                  >
                    Due: {bill.dueDate}
                  </p>
                </div>
                <div className="flex items-center space-x-2" data-oid="7:h193m">
                  <span className="font-bold" data-oid="gsffbd3">
                    ${bill.amount}
                  </span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setSelectedBill(bill)}
                    data-oid="ikc95d-"
                  >
                    Pay
                  </Button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-muted-foreground" data-oid="tr_ukmf">
            No pending bills
          </p>
        )}
      </CardContent>
      {selectedBill && (
        <PaymentModal
          bill={selectedBill}
          isOpen={!!selectedBill}
          onClose={() => setSelectedBill(null)}
          onPaymentSuccess={() => handlePaymentSuccess(selectedBill.id)}
          data-oid="::bnved"
        />
      )}
    </Card>
  );
}
