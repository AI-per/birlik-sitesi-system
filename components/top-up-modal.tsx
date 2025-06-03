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
          <div className="space-y-4" data-oid="-4k:9z0">
            <Label htmlFor="amount" data-oid="jvfxq5.">
              Top-up Amount
            </Label>
            <Input
              id="amount"
              type="number"
              placeholder="Enter amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              data-oid="z_zlvbe"
            />
          </div>
        );

      case 1:
        return (
          <div className="space-y-4" data-oid="lnbchs5">
            <div className="space-y-2" data-oid="srrhddg">
              <Label htmlFor="cardNumber" data-oid="hq:8nui">
                Card Number
              </Label>
              <Input
                id="cardNumber"
                placeholder="1234 5678 9012 3456"
                value={cardDetails.number}
                onChange={(e) =>
                  setCardDetails({ ...cardDetails, number: e.target.value })
                }
                data-oid="ak9cner"
              />
            </div>
            <div className="grid grid-cols-2 gap-4" data-oid="h5z_b51">
              <div className="space-y-2" data-oid="tqjb5wu">
                <Label htmlFor="expiry" data-oid="5.rvnwj">
                  Expiry Date
                </Label>
                <Input
                  id="expiry"
                  placeholder="MM/YY"
                  value={cardDetails.expiry}
                  onChange={(e) =>
                    setCardDetails({ ...cardDetails, expiry: e.target.value })
                  }
                  data-oid="hx7uo:t"
                />
              </div>
              <div className="space-y-2" data-oid="t17rbfk">
                <Label htmlFor="cvv" data-oid="k1fmnsa">
                  CVV
                </Label>
                <Input
                  id="cvv"
                  placeholder="123"
                  value={cardDetails.cvv}
                  onChange={(e) =>
                    setCardDetails({ ...cardDetails, cvv: e.target.value })
                  }
                  data-oid="5p__1xl"
                />
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-4" data-oid="tgzpdf:">
            <p className="text-sm text-muted-foreground" data-oid="wxspqkp">
              Enter the OTP sent to your registered mobile number
            </p>
            <Input
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              data-oid="p_m1:fg"
            />
          </div>
        );

      case 3:
        return (
          <div className="text-center space-y-4" data-oid="pn4nicq">
            <CheckCircle2
              className="mx-auto h-12 w-12 text-green-500"
              data-oid="-w-ljav"
            />

            <p className="text-lg font-medium" data-oid="ol3:db0">
              Top-up Successful
            </p>
            <p className="text-sm text-muted-foreground" data-oid="9_xnjd9">
              ${amount} has been added to your account.
            </p>
          </div>
        );
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose} data-oid="z02y3vh">
      <DialogContent className="sm:max-w-[425px]" data-oid=".rrosz4">
        <DialogHeader data-oid=":oa2c2h">
          <DialogTitle data-oid="nca:ex1">{steps[currentStep]}</DialogTitle>
        </DialogHeader>
        <div className="mt-4 space-y-4" data-oid="unrb:mp">
          {renderStepContent()}
          <div className="flex justify-between" data-oid="yncikpl">
            {currentStep > 0 && currentStep < steps.length - 1 && (
              <Button
                variant="outline"
                onClick={() => setCurrentStep(currentStep - 1)}
                data-oid="ng7yb-a"
              >
                Back
              </Button>
            )}
            <Button
              onClick={handleContinue}
              className="ml-auto"
              data-oid="xnql:14"
            >
              {currentStep === steps.length - 1 ? "Close" : "Continue"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
