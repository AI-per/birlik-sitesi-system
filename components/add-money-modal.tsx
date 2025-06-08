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
          <div className="space-y-4" data-oid="istfb5j">
            <Label htmlFor="amount" data-oid="yank5d6">
              Amount to Add
            </Label>
            <Input
              id="amount"
              type="number"
              placeholder="Enter amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              data-oid="qaaiyhn"
            />
          </div>
        );

      case 1:
        return (
          <div className="space-y-4" data-oid="gl8ma7a">
            <div className="space-y-2" data-oid="oa9pbfz">
              <Label htmlFor="cardNumber" data-oid=":j4i.e0">
                Card Number
              </Label>
              <Input
                id="cardNumber"
                placeholder="1234 5678 9012 3456"
                value={cardDetails.number}
                onChange={(e) =>
                  setCardDetails({ ...cardDetails, number: e.target.value })
                }
                data-oid="5.9za.-"
              />
            </div>
            <div className="grid grid-cols-2 gap-4" data-oid="pu2vbye">
              <div className="space-y-2" data-oid="543oa7i">
                <Label htmlFor="expiry" data-oid="c7-::13">
                  Expiry Date
                </Label>
                <Input
                  id="expiry"
                  placeholder="MM/YY"
                  value={cardDetails.expiry}
                  onChange={(e) =>
                    setCardDetails({ ...cardDetails, expiry: e.target.value })
                  }
                  data-oid="vub_8sw"
                />
              </div>
              <div className="space-y-2" data-oid="1kuvzef">
                <Label htmlFor="cvv" data-oid="h2dji01">
                  CVV
                </Label>
                <Input
                  id="cvv"
                  placeholder="123"
                  value={cardDetails.cvv}
                  onChange={(e) =>
                    setCardDetails({ ...cardDetails, cvv: e.target.value })
                  }
                  data-oid=".lgr15m"
                />
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-4" data-oid="ffg9cdl">
            <p className="text-sm text-muted-foreground" data-oid="sxqj8cu">
              Enter the OTP sent to your registered mobile number
            </p>
            <Input
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              data-oid="4gdxzhw"
            />
          </div>
        );

      case 3:
        return (
          <div className="text-center space-y-4" data-oid="pc82xrq">
            <CheckCircle2
              className="mx-auto h-12 w-12 text-green-500"
              data-oid="f_jr4p2"
            />

            <p className="text-lg font-medium" data-oid="kuvia82">
              Money Added Successfully
            </p>
            <p className="text-sm text-muted-foreground" data-oid="129kecr">
              ${amount} has been added to your Checking account.
            </p>
          </div>
        );
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose} data-oid="obg0sh0">
      <DialogContent className="sm:max-w-[425px]" data-oid="spqg_78">
        <DialogHeader data-oid="er3.:ly">
          <DialogTitle data-oid="dam.k:s">{steps[currentStep]}</DialogTitle>
        </DialogHeader>
        <div className="mt-4 space-y-4" data-oid="a4mxa3p">
          {renderStepContent()}
          <div className="flex justify-between" data-oid="px_nh4g">
            {currentStep > 0 && currentStep < steps.length - 1 && (
              <Button
                variant="outline"
                onClick={() => setCurrentStep(currentStep - 1)}
                data-oid="in4g8ig"
              >
                Back
              </Button>
            )}
            <Button
              onClick={handleContinue}
              className="ml-auto"
              data-oid="epdyy_4"
            >
              {currentStep === steps.length - 1 ? "Close" : "Continue"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
