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
    <Card data-oid="8y7wab2">
      <CardHeader data-oid="q1mdnbd">
        <CardTitle data-oid="-xp0hqv">Quick Bill Pay</CardTitle>
      </CardHeader>
      <CardContent data-oid="z53b3-c">
        {bills.length > 0 ? (
          <div className="space-y-4" data-oid="5:ywr8i">
            {bills.map((bill) => (
              <div
                key={bill.id}
                className="flex items-center justify-between"
                data-oid="dinhyd4"
              >
                <div data-oid="kyntpf4">
                  <p className="font-medium" data-oid="er:ldti">
                    {bill.name}
                  </p>
                  <p
                    className="text-sm text-muted-foreground"
                    data-oid="cgra:p-"
                  >
                    Due: {bill.dueDate}
                  </p>
                </div>
                <div className="flex items-center space-x-2" data-oid="bgbk52q">
                  <span className="font-bold" data-oid="7rholum">
                    ${bill.amount}
                  </span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setSelectedBill(bill)}
                    data-oid="0o9ap-v"
                  >
                    Pay
                  </Button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-muted-foreground" data-oid="y-_2-en">
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
          data-oid=":uog96_"
        />
      )}
    </Card>
  );
}
