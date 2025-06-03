"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { CheckCircle2 } from "lucide-react";

const steps = [
  "Payment Option",
  "Card Details",
  "OTP Verification",
  "Confirmation",
];

export function PaymentModal({ bill, isOpen, onClose, onPaymentSuccess }) {
  const [currentStep, setCurrentStep] = useState(0);
  const [paymentOption, setPaymentOption] = useState("full");
  const [cardDetails, setCardDetails] = useState({
    number: "",
    expiry: "",
    cvv: "",
  });
  const [otp, setOtp] = useState("");

  const handleContinue = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onPaymentSuccess();
      onClose();
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <div className="space-y-4" data-oid="tg6:7iy">
            <RadioGroup
              value={paymentOption}
              onValueChange={setPaymentOption}
              data-oid="u71ezoa"
            >
              <div className="flex items-center space-x-2" data-oid="0p921p6">
                <RadioGroupItem value="full" id="full" data-oid="nhb:p1c" />
                <Label htmlFor="full" data-oid="9pmzaux">
                  Pay in full (${bill.amount})
                </Label>
              </div>
              <div className="flex items-center space-x-2" data-oid="8qyeqww">
                <RadioGroupItem
                  value="installments"
                  id="installments"
                  data-oid="4u4xrbj"
                />

                <Label htmlFor="installments" data-oid="ckt8iht">
                  Pay in 4 (${(bill.amount / 4).toFixed(2)} x 4)
                </Label>
              </div>
            </RadioGroup>
          </div>
        );

      case 1:
        return (
          <div className="space-y-4" data-oid="4ix8zpg">
            <div className="space-y-2" data-oid="6riikyl">
              <Label htmlFor="cardNumber" data-oid="lf19a7c">
                Card Number
              </Label>
              <Input
                id="cardNumber"
                placeholder="1234 5678 9012 3456"
                value={cardDetails.number}
                onChange={(e) =>
                  setCardDetails({ ...cardDetails, number: e.target.value })
                }
                data-oid="kp3e.6b"
              />
            </div>
            <div className="grid grid-cols-2 gap-4" data-oid="ua.2o-k">
              <div className="space-y-2" data-oid="wxsb8k9">
                <Label htmlFor="expiry" data-oid="cz43nar">
                  Expiry Date
                </Label>
                <Input
                  id="expiry"
                  placeholder="MM/YY"
                  value={cardDetails.expiry}
                  onChange={(e) =>
                    setCardDetails({ ...cardDetails, expiry: e.target.value })
                  }
                  data-oid="h2falyu"
                />
              </div>
              <div className="space-y-2" data-oid="6rrquo7">
                <Label htmlFor="cvv" data-oid="w4aex-l">
                  CVV
                </Label>
                <Input
                  id="cvv"
                  placeholder="123"
                  value={cardDetails.cvv}
                  onChange={(e) =>
                    setCardDetails({ ...cardDetails, cvv: e.target.value })
                  }
                  data-oid="v16qn6z"
                />
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-4" data-oid="b6kuylq">
            <p className="text-sm text-muted-foreground" data-oid="en1pgbn">
              Enter the OTP sent to your registered mobile number
            </p>
            <Input
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              data-oid="959gbk9"
            />
          </div>
        );

      case 3:
        return (
          <div className="text-center space-y-4" data-oid="qefxbx9">
            <CheckCircle2
              className="mx-auto h-12 w-12 text-green-500"
              data-oid=".3_4rgf"
            />

            <p className="text-lg font-medium" data-oid="mce8le4">
              Payment Successful
            </p>
            <p className="text-sm text-muted-foreground" data-oid="uc.v_-7">
              Your payment of ${bill.amount} for {bill.name} has been processed
              successfully.
            </p>
          </div>
        );
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose} data-oid="gxqc13e">
      <DialogContent className="sm:max-w-[425px]" data-oid="__:1aoq">
        <DialogHeader data-oid="5:0ybfi">
          <DialogTitle data-oid="j6zbk_-">{steps[currentStep]}</DialogTitle>
        </DialogHeader>
        <div className="mt-4 space-y-4" data-oid="ho.x4d5">
          {renderStepContent()}
          <div className="flex justify-between" data-oid="-_cm1e8">
            {currentStep > 0 && currentStep < steps.length - 1 && (
              <Button
                variant="outline"
                onClick={() => setCurrentStep(currentStep - 1)}
                data-oid="go-iqqj"
              >
                Back
              </Button>
            )}
            <Button
              onClick={handleContinue}
              className="ml-auto"
              data-oid="g3nsoj8"
            >
              {currentStep === steps.length - 1 ? "Close" : "Continue"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
