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
          <div className="space-y-4" data-oid="-c5_5wq">
            <Label htmlFor="amount" data-oid="y5squ.r">
              Top-up Amount
            </Label>
            <Input
              id="amount"
              type="number"
              placeholder="Enter amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              data-oid="knu3_yy"
            />
          </div>
        );

      case 1:
        return (
          <div className="space-y-4" data-oid="0eihzcg">
            <div className="space-y-2" data-oid="1m7_t_a">
              <Label htmlFor="cardNumber" data-oid="hsw55nc">
                Card Number
              </Label>
              <Input
                id="cardNumber"
                placeholder="1234 5678 9012 3456"
                value={cardDetails.number}
                onChange={(e) =>
                  setCardDetails({ ...cardDetails, number: e.target.value })
                }
                data-oid="u2jvxwo"
              />
            </div>
            <div className="grid grid-cols-2 gap-4" data-oid="-pwk8li">
              <div className="space-y-2" data-oid="lkxfa7n">
                <Label htmlFor="expiry" data-oid="cfmvlaa">
                  Expiry Date
                </Label>
                <Input
                  id="expiry"
                  placeholder="MM/YY"
                  value={cardDetails.expiry}
                  onChange={(e) =>
                    setCardDetails({ ...cardDetails, expiry: e.target.value })
                  }
                  data-oid="20f.e3u"
                />
              </div>
              <div className="space-y-2" data-oid="a.9c-7l">
                <Label htmlFor="cvv" data-oid="fn:k0bw">
                  CVV
                </Label>
                <Input
                  id="cvv"
                  placeholder="123"
                  value={cardDetails.cvv}
                  onChange={(e) =>
                    setCardDetails({ ...cardDetails, cvv: e.target.value })
                  }
                  data-oid="x05_u0l"
                />
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-4" data-oid="3mqnl0j">
            <p className="text-sm text-muted-foreground" data-oid="n53u6if">
              Enter the OTP sent to your registered mobile number
            </p>
            <Input
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              data-oid="58f5.8u"
            />
          </div>
        );

      case 3:
        return (
          <div className="text-center space-y-4" data-oid="f2744ps">
            <CheckCircle2
              className="mx-auto h-12 w-12 text-green-500"
              data-oid="81l7ri4"
            />

            <p className="text-lg font-medium" data-oid="vn3t5df">
              Top-up Successful
            </p>
            <p className="text-sm text-muted-foreground" data-oid="kboumt8">
              ${amount} has been added to your account.
            </p>
          </div>
        );
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose} data-oid=".8lo54h">
      <DialogContent className="sm:max-w-[425px]" data-oid="la1lj:f">
        <DialogHeader data-oid="9mt.jfj">
          <DialogTitle data-oid="w8w65ch">{steps[currentStep]}</DialogTitle>
        </DialogHeader>
        <div className="mt-4 space-y-4" data-oid="1lywkni">
          {renderStepContent()}
          <div className="flex justify-between" data-oid="f7mxbzu">
            {currentStep > 0 && currentStep < steps.length - 1 && (
              <Button
                variant="outline"
                onClick={() => setCurrentStep(currentStep - 1)}
                data-oid="f2u6dps"
              >
                Back
              </Button>
            )}
            <Button
              onClick={handleContinue}
              className="ml-auto"
              data-oid="t-:p2b6"
            >
              {currentStep === steps.length - 1 ? "Close" : "Continue"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
