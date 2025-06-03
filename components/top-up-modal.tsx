"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CheckCircle2 } from "lucide-react";

const steps = ["Amount", "Card Details", "OTP Verification", "Confirmation"];

export function TopUpModal({ isOpen, onClose, onTopUp }) {
  const [currentStep, setCurrentStep] = useState(0);
  const [amount, setAmount] = useState("");
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
      onTopUp(Number.parseFloat(amount));
      onClose();
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <div className="space-y-4" data-oid="8-t6o74">
            <Label htmlFor="amount" data-oid="k0-lteh">
              Top-up Amount
            </Label>
            <Input
              id="amount"
              type="number"
              placeholder="Enter amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              data-oid=".r:ade3"
            />
          </div>
        );

      case 1:
        return (
          <div className="space-y-4" data-oid="0izulqz">
            <div className="space-y-2" data-oid="gn9cbi2">
              <Label htmlFor="cardNumber" data-oid="b595p:k">
                Card Number
              </Label>
              <Input
                id="cardNumber"
                placeholder="1234 5678 9012 3456"
                value={cardDetails.number}
                onChange={(e) =>
                  setCardDetails({ ...cardDetails, number: e.target.value })
                }
                data-oid="te-rvvw"
              />
            </div>
            <div className="grid grid-cols-2 gap-4" data-oid="g7goq8n">
              <div className="space-y-2" data-oid="lpzsxlg">
                <Label htmlFor="expiry" data-oid="p0m92c8">
                  Expiry Date
                </Label>
                <Input
                  id="expiry"
                  placeholder="MM/YY"
                  value={cardDetails.expiry}
                  onChange={(e) =>
                    setCardDetails({ ...cardDetails, expiry: e.target.value })
                  }
                  data-oid="taeqnty"
                />
              </div>
              <div className="space-y-2" data-oid="nk7_.:c">
                <Label htmlFor="cvv" data-oid="ouyf3g.">
                  CVV
                </Label>
                <Input
                  id="cvv"
                  placeholder="123"
                  value={cardDetails.cvv}
                  onChange={(e) =>
                    setCardDetails({ ...cardDetails, cvv: e.target.value })
                  }
                  data-oid="z-8o9zs"
                />
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-4" data-oid="fx5hg.0">
            <p className="text-sm text-muted-foreground" data-oid="4_f4fvq">
              Enter the OTP sent to your registered mobile number
            </p>
            <Input
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              data-oid="cai0-it"
            />
          </div>
        );

      case 3:
        return (
          <div className="text-center space-y-4" data-oid="r4uirw0">
            <CheckCircle2
              className="mx-auto h-12 w-12 text-green-500"
              data-oid="0w:8b2s"
            />

            <p className="text-lg font-medium" data-oid="um7jpv_">
              Top-up Successful
            </p>
            <p className="text-sm text-muted-foreground" data-oid="f9ppt36">
              ${amount} has been added to your account.
            </p>
          </div>
        );
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose} data-oid="gmw09sz">
      <DialogContent className="sm:max-w-[425px]" data-oid=".b2z.ir">
        <DialogHeader data-oid="ig4c02y">
          <DialogTitle data-oid="m-zu2.d">{steps[currentStep]}</DialogTitle>
        </DialogHeader>
        <div className="mt-4 space-y-4" data-oid="i02gqln">
          {renderStepContent()}
          <div className="flex justify-between" data-oid="24x_jt-">
            {currentStep > 0 && currentStep < steps.length - 1 && (
              <Button
                variant="outline"
                onClick={() => setCurrentStep(currentStep - 1)}
                data-oid="zfmic6p"
              >
                Back
              </Button>
            )}
            <Button
              onClick={handleContinue}
              className="ml-auto"
              data-oid="fn01c8z"
            >
              {currentStep === steps.length - 1 ? "Close" : "Continue"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
