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
          <div className="space-y-4" data-oid="5hx803o">
            <Label htmlFor="amount" data-oid="s5vtr8:">
              Amount to Add
            </Label>
            <Input
              id="amount"
              type="number"
              placeholder="Enter amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              data-oid="un_iap2"
            />
          </div>
        );

      case 1:
        return (
          <div className="space-y-4" data-oid="k8z.hl4">
            <div className="space-y-2" data-oid="1.3r.lw">
              <Label htmlFor="cardNumber" data-oid=".-el1un">
                Card Number
              </Label>
              <Input
                id="cardNumber"
                placeholder="1234 5678 9012 3456"
                value={cardDetails.number}
                onChange={(e) =>
                  setCardDetails({ ...cardDetails, number: e.target.value })
                }
                data-oid="byw:x5q"
              />
            </div>
            <div className="grid grid-cols-2 gap-4" data-oid="f.qsml-">
              <div className="space-y-2" data-oid="ie-kxak">
                <Label htmlFor="expiry" data-oid="yyarc-i">
                  Expiry Date
                </Label>
                <Input
                  id="expiry"
                  placeholder="MM/YY"
                  value={cardDetails.expiry}
                  onChange={(e) =>
                    setCardDetails({ ...cardDetails, expiry: e.target.value })
                  }
                  data-oid="gw6o0o5"
                />
              </div>
              <div className="space-y-2" data-oid="hit2id4">
                <Label htmlFor="cvv" data-oid="_ya2lk0">
                  CVV
                </Label>
                <Input
                  id="cvv"
                  placeholder="123"
                  value={cardDetails.cvv}
                  onChange={(e) =>
                    setCardDetails({ ...cardDetails, cvv: e.target.value })
                  }
                  data-oid="i-x0-7i"
                />
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-4" data-oid="bzd8su8">
            <p className="text-sm text-muted-foreground" data-oid="-2dl-mi">
              Enter the OTP sent to your registered mobile number
            </p>
            <Input
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              data-oid="wrui.i2"
            />
          </div>
        );

      case 3:
        return (
          <div className="text-center space-y-4" data-oid="jez:oc3">
            <CheckCircle2
              className="mx-auto h-12 w-12 text-green-500"
              data-oid="aduv36f"
            />

            <p className="text-lg font-medium" data-oid="c4dk-2b">
              Money Added Successfully
            </p>
            <p className="text-sm text-muted-foreground" data-oid="xf_3r7y">
              ${amount} has been added to your Checking account.
            </p>
          </div>
        );
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose} data-oid="_m-69hq">
      <DialogContent className="sm:max-w-[425px]" data-oid="b7_k9o0">
        <DialogHeader data-oid="ne4-0mk">
          <DialogTitle data-oid="an.iflf">{steps[currentStep]}</DialogTitle>
        </DialogHeader>
        <div className="mt-4 space-y-4" data-oid="lfjeksr">
          {renderStepContent()}
          <div className="flex justify-between" data-oid="bg_83g0">
            {currentStep > 0 && currentStep < steps.length - 1 && (
              <Button
                variant="outline"
                onClick={() => setCurrentStep(currentStep - 1)}
                data-oid="av:pj-e"
              >
                Back
              </Button>
            )}
            <Button
              onClick={handleContinue}
              className="ml-auto"
              data-oid="fngeb.v"
            >
              {currentStep === steps.length - 1 ? "Close" : "Continue"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
