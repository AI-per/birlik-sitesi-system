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
          <div className="space-y-4" data-oid="9tkpkil">
            <RadioGroup
              value={paymentOption}
              onValueChange={setPaymentOption}
              data-oid="a8g6na1"
            >
              <div className="flex items-center space-x-2" data-oid="lmjmoli">
                <RadioGroupItem value="full" id="full" data-oid="4oixws2" />
                <Label htmlFor="full" data-oid="qm7qp7l">
                  Pay in full (${bill.amount})
                </Label>
              </div>
              <div className="flex items-center space-x-2" data-oid="azr3dqg">
                <RadioGroupItem
                  value="installments"
                  id="installments"
                  data-oid="a:pz7_n"
                />

                <Label htmlFor="installments" data-oid="g3j_uw7">
                  Pay in 4 (${(bill.amount / 4).toFixed(2)} x 4)
                </Label>
              </div>
            </RadioGroup>
          </div>
        );

      case 1:
        return (
          <div className="space-y-4" data-oid="re:9gyi">
            <div className="space-y-2" data-oid="ndz-xe6">
              <Label htmlFor="cardNumber" data-oid="o059mc:">
                Card Number
              </Label>
              <Input
                id="cardNumber"
                placeholder="1234 5678 9012 3456"
                value={cardDetails.number}
                onChange={(e) =>
                  setCardDetails({ ...cardDetails, number: e.target.value })
                }
                data-oid="mz:rcg6"
              />
            </div>
            <div className="grid grid-cols-2 gap-4" data-oid="z29e2gb">
              <div className="space-y-2" data-oid="xuju6zz">
                <Label htmlFor="expiry" data-oid="lr6al__">
                  Expiry Date
                </Label>
                <Input
                  id="expiry"
                  placeholder="MM/YY"
                  value={cardDetails.expiry}
                  onChange={(e) =>
                    setCardDetails({ ...cardDetails, expiry: e.target.value })
                  }
                  data-oid="ydyedfu"
                />
              </div>
              <div className="space-y-2" data-oid="f9_bgyi">
                <Label htmlFor="cvv" data-oid="ex6p4sj">
                  CVV
                </Label>
                <Input
                  id="cvv"
                  placeholder="123"
                  value={cardDetails.cvv}
                  onChange={(e) =>
                    setCardDetails({ ...cardDetails, cvv: e.target.value })
                  }
                  data-oid="3niz_6g"
                />
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-4" data-oid="73grw9:">
            <p className="text-sm text-muted-foreground" data-oid="xdv:xpg">
              Enter the OTP sent to your registered mobile number
            </p>
            <Input
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              data-oid="d4z9cwi"
            />
          </div>
        );

      case 3:
        return (
          <div className="text-center space-y-4" data-oid=".jb.jgn">
            <CheckCircle2
              className="mx-auto h-12 w-12 text-green-500"
              data-oid="-j.0pvw"
            />

            <p className="text-lg font-medium" data-oid=".ogg:xs">
              Payment Successful
            </p>
            <p className="text-sm text-muted-foreground" data-oid="_507d3:">
              Your payment of ${bill.amount} for {bill.name} has been processed
              successfully.
            </p>
          </div>
        );
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose} data-oid="wyquksw">
      <DialogContent className="sm:max-w-[425px]" data-oid="pcd63qf">
        <DialogHeader data-oid="ybmmrma">
          <DialogTitle data-oid="sl4sy16">{steps[currentStep]}</DialogTitle>
        </DialogHeader>
        <div className="mt-4 space-y-4" data-oid="600co_6">
          {renderStepContent()}
          <div className="flex justify-between" data-oid="jep9xvi">
            {currentStep > 0 && currentStep < steps.length - 1 && (
              <Button
                variant="outline"
                onClick={() => setCurrentStep(currentStep - 1)}
                data-oid="_zqprpv"
              >
                Back
              </Button>
            )}
            <Button
              onClick={handleContinue}
              className="ml-auto"
              data-oid="9bg_s7i"
            >
              {currentStep === steps.length - 1 ? "Close" : "Continue"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
