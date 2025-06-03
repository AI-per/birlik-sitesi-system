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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CheckCircle2 } from "lucide-react";

const steps = [
  "Amount and Account",
  "Card Details",
  "OTP Verification",
  "Confirmation",
];

export function SendMoneyModal({ isOpen, onClose, onSendMoney, accounts }) {
  const [currentStep, setCurrentStep] = useState(0);
  const [amount, setAmount] = useState("");
  const [selectedAccount, setSelectedAccount] = useState("");
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
      onSendMoney(Number.parseFloat(amount), selectedAccount);
      onClose();
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <div className="space-y-4" data-oid="xgu67ex">
            <div className="space-y-2" data-oid="nlfw:kl">
              <Label htmlFor="amount" data-oid="r5vo0gh">
                Amount to Send
              </Label>
              <Input
                id="amount"
                type="number"
                placeholder="Enter amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                data-oid="r3m1a8c"
              />
            </div>
            <div className="space-y-2" data-oid="21b7na.">
              <Label htmlFor="account" data-oid="i4icgn1">
                From Account
              </Label>
              <Select
                onValueChange={setSelectedAccount}
                value={selectedAccount}
                data-oid="6gxotc9"
              >
                <SelectTrigger id="account" data-oid="xgepn..">
                  <SelectValue
                    placeholder="Select account"
                    data-oid="ql4sy_y"
                  />
                </SelectTrigger>
                <SelectContent data-oid="s4_jpyd">
                  {accounts.map((account) => (
                    <SelectItem
                      key={account.name}
                      value={account.name}
                      data-oid="rnc1ov2"
                    >
                      {account.name} (${account.balance.toFixed(2)})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        );

      case 1:
        return (
          <div className="space-y-4" data-oid="e3do8v6">
            <div className="space-y-2" data-oid="7p-hylm">
              <Label htmlFor="cardNumber" data-oid="bj6_z79">
                Card Number
              </Label>
              <Input
                id="cardNumber"
                placeholder="1234 5678 9012 3456"
                value={cardDetails.number}
                onChange={(e) =>
                  setCardDetails({ ...cardDetails, number: e.target.value })
                }
                data-oid="2p-1aa1"
              />
            </div>
            <div className="grid grid-cols-2 gap-4" data-oid="z0ki8hh">
              <div className="space-y-2" data-oid="sr-26hu">
                <Label htmlFor="expiry" data-oid="ji_xsln">
                  Expiry Date
                </Label>
                <Input
                  id="expiry"
                  placeholder="MM/YY"
                  value={cardDetails.expiry}
                  onChange={(e) =>
                    setCardDetails({ ...cardDetails, expiry: e.target.value })
                  }
                  data-oid="t72nt-e"
                />
              </div>
              <div className="space-y-2" data-oid="sg8cbte">
                <Label htmlFor="cvv" data-oid="5ktj625">
                  CVV
                </Label>
                <Input
                  id="cvv"
                  placeholder="123"
                  value={cardDetails.cvv}
                  onChange={(e) =>
                    setCardDetails({ ...cardDetails, cvv: e.target.value })
                  }
                  data-oid="ti1k4_l"
                />
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-4" data-oid="t81jc8u">
            <p className="text-sm text-muted-foreground" data-oid="f4n6tw1">
              Enter the OTP sent to your registered mobile number
            </p>
            <Input
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              data-oid=".:ad_f_"
            />
          </div>
        );

      case 3:
        return (
          <div className="text-center space-y-4" data-oid="h2y-f:3">
            <CheckCircle2
              className="mx-auto h-12 w-12 text-green-500"
              data-oid="02l3p2g"
            />

            <p className="text-lg font-medium" data-oid="izrm07k">
              Money Sent Successfully
            </p>
            <p className="text-sm text-muted-foreground" data-oid="rf:8w_j">
              ${amount} has been sent from your {selectedAccount} account.
            </p>
          </div>
        );
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose} data-oid="xlt-ruc">
      <DialogContent className="sm:max-w-[425px]" data-oid="uloz99x">
        <DialogHeader data-oid="gbeq06n">
          <DialogTitle data-oid="ymof3iu">{steps[currentStep]}</DialogTitle>
        </DialogHeader>
        <div className="mt-4 space-y-4" data-oid="uw85f_-">
          {renderStepContent()}
          <div className="flex justify-between" data-oid="mksw:3:">
            {currentStep > 0 && currentStep < steps.length - 1 && (
              <Button
                variant="outline"
                onClick={() => setCurrentStep(currentStep - 1)}
                data-oid="f2idkcu"
              >
                Back
              </Button>
            )}
            <Button
              onClick={handleContinue}
              className="ml-auto"
              data-oid="guudwq2"
            >
              {currentStep === steps.length - 1 ? "Close" : "Continue"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
