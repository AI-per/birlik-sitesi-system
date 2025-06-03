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
          <div className="space-y-4" data-oid="m9jt8i0">
            <RadioGroup
              value={paymentOption}
              onValueChange={setPaymentOption}
              data-oid="x93r924"
            >
              <div className="flex items-center space-x-2" data-oid="np_e3eu">
                <RadioGroupItem value="full" id="full" data-oid="8-ujhcz" />
                <Label htmlFor="full" data-oid="iqh8qfu">
                  Pay in full (${bill.amount})
                </Label>
              </div>
              <div className="flex items-center space-x-2" data-oid="oxl-lrw">
                <RadioGroupItem
                  value="installments"
                  id="installments"
                  data-oid="hfvg-_6"
                />

                <Label htmlFor="installments" data-oid="a6jn3qk">
                  Pay in 4 (${(bill.amount / 4).toFixed(2)} x 4)
                </Label>
              </div>
            </RadioGroup>
          </div>
        );

      case 1:
        return (
          <div className="space-y-4" data-oid="cmrg543">
            <div className="space-y-2" data-oid="x83ohe9">
              <Label htmlFor="cardNumber" data-oid="85uvuct">
                Card Number
              </Label>
              <Input
                id="cardNumber"
                placeholder="1234 5678 9012 3456"
                value={cardDetails.number}
                onChange={(e) =>
                  setCardDetails({ ...cardDetails, number: e.target.value })
                }
                data-oid="k53ozcg"
              />
            </div>
            <div className="grid grid-cols-2 gap-4" data-oid="0vej9ac">
              <div className="space-y-2" data-oid="lsaq:hv">
                <Label htmlFor="expiry" data-oid="p-x3sqb">
                  Expiry Date
                </Label>
                <Input
                  id="expiry"
                  placeholder="MM/YY"
                  value={cardDetails.expiry}
                  onChange={(e) =>
                    setCardDetails({ ...cardDetails, expiry: e.target.value })
                  }
                  data-oid="izpuusj"
                />
              </div>
              <div className="space-y-2" data-oid="y1ud6ya">
                <Label htmlFor="cvv" data-oid="d_w5g5y">
                  CVV
                </Label>
                <Input
                  id="cvv"
                  placeholder="123"
                  value={cardDetails.cvv}
                  onChange={(e) =>
                    setCardDetails({ ...cardDetails, cvv: e.target.value })
                  }
                  data-oid="ddc3grf"
                />
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-4" data-oid="c7-ukpx">
            <p className="text-sm text-muted-foreground" data-oid="7mhggwn">
              Enter the OTP sent to your registered mobile number
            </p>
            <Input
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              data-oid="55znfjr"
            />
          </div>
        );

      case 3:
        return (
          <div className="text-center space-y-4" data-oid="ofzegq7">
            <CheckCircle2
              className="mx-auto h-12 w-12 text-green-500"
              data-oid="ms44et_"
            />

            <p className="text-lg font-medium" data-oid="kcjfkii">
              Payment Successful
            </p>
            <p className="text-sm text-muted-foreground" data-oid="-xat-vp">
              Your payment of ${bill.amount} for {bill.name} has been processed
              successfully.
            </p>
          </div>
        );
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose} data-oid="nx7vvgk">
      <DialogContent className="sm:max-w-[425px]" data-oid="51brmj_">
        <DialogHeader data-oid="z.w9bf_">
          <DialogTitle data-oid="r99qvgk">{steps[currentStep]}</DialogTitle>
        </DialogHeader>
        <div className="mt-4 space-y-4" data-oid="lybxibc">
          {renderStepContent()}
          <div className="flex justify-between" data-oid="pcm-rze">
            {currentStep > 0 && currentStep < steps.length - 1 && (
              <Button
                variant="outline"
                onClick={() => setCurrentStep(currentStep - 1)}
                data-oid="9udmthx"
              >
                Back
              </Button>
            )}
            <Button
              onClick={handleContinue}
              className="ml-auto"
              data-oid="7s76mhn"
            >
              {currentStep === steps.length - 1 ? "Close" : "Continue"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
