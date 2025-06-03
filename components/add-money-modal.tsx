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

export function AddMoneyModal({ isOpen, onClose, onAddMoney }) {
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
      onAddMoney(Number.parseFloat(amount));
      onClose();
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <div className="space-y-4" data-oid="jsq3k7v">
            <Label htmlFor="amount" data-oid="yprgbxn">
              Amount to Add
            </Label>
            <Input
              id="amount"
              type="number"
              placeholder="Enter amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              data-oid="rknck4w"
            />
          </div>
        );

      case 1:
        return (
          <div className="space-y-4" data-oid="2cq5acg">
            <div className="space-y-2" data-oid=".t3n347">
              <Label htmlFor="cardNumber" data-oid="7liquad">
                Card Number
              </Label>
              <Input
                id="cardNumber"
                placeholder="1234 5678 9012 3456"
                value={cardDetails.number}
                onChange={(e) =>
                  setCardDetails({ ...cardDetails, number: e.target.value })
                }
                data-oid=":mj:i01"
              />
            </div>
            <div className="grid grid-cols-2 gap-4" data-oid="vfthca2">
              <div className="space-y-2" data-oid="6xd1:ni">
                <Label htmlFor="expiry" data-oid="tahfm8f">
                  Expiry Date
                </Label>
                <Input
                  id="expiry"
                  placeholder="MM/YY"
                  value={cardDetails.expiry}
                  onChange={(e) =>
                    setCardDetails({ ...cardDetails, expiry: e.target.value })
                  }
                  data-oid="uti4d7a"
                />
              </div>
              <div className="space-y-2" data-oid=":4l9fmo">
                <Label htmlFor="cvv" data-oid="1ohlec6">
                  CVV
                </Label>
                <Input
                  id="cvv"
                  placeholder="123"
                  value={cardDetails.cvv}
                  onChange={(e) =>
                    setCardDetails({ ...cardDetails, cvv: e.target.value })
                  }
                  data-oid="zok68i9"
                />
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-4" data-oid="j3h5ddu">
            <p className="text-sm text-muted-foreground" data-oid="fs9:eme">
              Enter the OTP sent to your registered mobile number
            </p>
            <Input
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              data-oid="arl61s6"
            />
          </div>
        );

      case 3:
        return (
          <div className="text-center space-y-4" data-oid="jrr0bs_">
            <CheckCircle2
              className="mx-auto h-12 w-12 text-green-500"
              data-oid="6nc7y7s"
            />

            <p className="text-lg font-medium" data-oid="r.shoch">
              Money Added Successfully
            </p>
            <p className="text-sm text-muted-foreground" data-oid="15vm.5n">
              ${amount} has been added to your Checking account.
            </p>
          </div>
        );
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose} data-oid="iop3fti">
      <DialogContent className="sm:max-w-[425px]" data-oid="c7921xk">
        <DialogHeader data-oid="u27109.">
          <DialogTitle data-oid=".17qvw0">{steps[currentStep]}</DialogTitle>
        </DialogHeader>
        <div className="mt-4 space-y-4" data-oid="ls:j54a">
          {renderStepContent()}
          <div className="flex justify-between" data-oid="22vgysl">
            {currentStep > 0 && currentStep < steps.length - 1 && (
              <Button
                variant="outline"
                onClick={() => setCurrentStep(currentStep - 1)}
                data-oid="61x.m9r"
              >
                Back
              </Button>
            )}
            <Button
              onClick={handleContinue}
              className="ml-auto"
              data-oid="iryx9sk"
            >
              {currentStep === steps.length - 1 ? "Close" : "Continue"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
