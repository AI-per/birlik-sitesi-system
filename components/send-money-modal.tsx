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
          <div className="space-y-4" data-oid="hwigfxe">
            <div className="space-y-2" data-oid="hedr0rj">
              <Label htmlFor="amount" data-oid="6mvdyi8">
                Amount to Send
              </Label>
              <Input
                id="amount"
                type="number"
                placeholder="Enter amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                data-oid="olxc06z"
              />
            </div>
            <div className="space-y-2" data-oid="nsec5mo">
              <Label htmlFor="account" data-oid="b-2qare">
                From Account
              </Label>
              <Select
                onValueChange={setSelectedAccount}
                value={selectedAccount}
                data-oid="e87xcs0"
              >
                <SelectTrigger id="account" data-oid="_:0kkzx">
                  <SelectValue
                    placeholder="Select account"
                    data-oid="fbmwdm-"
                  />
                </SelectTrigger>
                <SelectContent data-oid="caf3kt4">
                  {accounts.map((account) => (
                    <SelectItem
                      key={account.name}
                      value={account.name}
                      data-oid=":wtrk3d"
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
          <div className="space-y-4" data-oid="uagt0um">
            <div className="space-y-2" data-oid="rw5y12d">
              <Label htmlFor="cardNumber" data-oid="3mt4vh2">
                Card Number
              </Label>
              <Input
                id="cardNumber"
                placeholder="1234 5678 9012 3456"
                value={cardDetails.number}
                onChange={(e) =>
                  setCardDetails({ ...cardDetails, number: e.target.value })
                }
                data-oid="0d5qfoy"
              />
            </div>
            <div className="grid grid-cols-2 gap-4" data-oid="utaabjn">
              <div className="space-y-2" data-oid="j.m1m68">
                <Label htmlFor="expiry" data-oid="bc3cnks">
                  Expiry Date
                </Label>
                <Input
                  id="expiry"
                  placeholder="MM/YY"
                  value={cardDetails.expiry}
                  onChange={(e) =>
                    setCardDetails({ ...cardDetails, expiry: e.target.value })
                  }
                  data-oid="xzdlyn8"
                />
              </div>
              <div className="space-y-2" data-oid="fgv7g-9">
                <Label htmlFor="cvv" data-oid="5d2dy:v">
                  CVV
                </Label>
                <Input
                  id="cvv"
                  placeholder="123"
                  value={cardDetails.cvv}
                  onChange={(e) =>
                    setCardDetails({ ...cardDetails, cvv: e.target.value })
                  }
                  data-oid="wkvam58"
                />
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-4" data-oid="rvpn91n">
            <p className="text-sm text-muted-foreground" data-oid="qac6d._">
              Enter the OTP sent to your registered mobile number
            </p>
            <Input
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              data-oid="g.-029s"
            />
          </div>
        );

      case 3:
        return (
          <div className="text-center space-y-4" data-oid="rk6rzr3">
            <CheckCircle2
              className="mx-auto h-12 w-12 text-green-500"
              data-oid="ezgjcq5"
            />

            <p className="text-lg font-medium" data-oid="-:vl_xo">
              Money Sent Successfully
            </p>
            <p className="text-sm text-muted-foreground" data-oid="28broz:">
              ${amount} has been sent from your {selectedAccount} account.
            </p>
          </div>
        );
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose} data-oid="13i_68-">
      <DialogContent className="sm:max-w-[425px]" data-oid="5dgx3nz">
        <DialogHeader data-oid="o8qkwez">
          <DialogTitle data-oid="nccd9zi">{steps[currentStep]}</DialogTitle>
        </DialogHeader>
        <div className="mt-4 space-y-4" data-oid="ggjd.-6">
          {renderStepContent()}
          <div className="flex justify-between" data-oid="ns-cd_e">
            {currentStep > 0 && currentStep < steps.length - 1 && (
              <Button
                variant="outline"
                onClick={() => setCurrentStep(currentStep - 1)}
                data-oid=".7eevrk"
              >
                Back
              </Button>
            )}
            <Button
              onClick={handleContinue}
              className="ml-auto"
              data-oid="awv_1.v"
            >
              {currentStep === steps.length - 1 ? "Close" : "Continue"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
