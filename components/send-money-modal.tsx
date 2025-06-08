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
          <div className="space-y-4" data-oid="ky99nsz">
            <div className="space-y-2" data-oid="-6po-5s">
              <Label htmlFor="amount" data-oid="4-_ke.a">
                Amount to Send
              </Label>
              <Input
                id="amount"
                type="number"
                placeholder="Enter amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                data-oid="cyv8.dr"
              />
            </div>
            <div className="space-y-2" data-oid="d.082wk">
              <Label htmlFor="account" data-oid="lcrlljc">
                From Account
              </Label>
              <Select
                onValueChange={setSelectedAccount}
                value={selectedAccount}
                data-oid="ttpd7fn"
              >
                <SelectTrigger id="account" data-oid="f6h4pok">
                  <SelectValue
                    placeholder="Select account"
                    data-oid="45vn64u"
                  />
                </SelectTrigger>
                <SelectContent data-oid="ht7xrgl">
                  {accounts.map((account) => (
                    <SelectItem
                      key={account.name}
                      value={account.name}
                      data-oid="9epxtsb"
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
          <div className="space-y-4" data-oid="k3mxu3y">
            <div className="space-y-2" data-oid="okt4jhd">
              <Label htmlFor="cardNumber" data-oid="dm:4cmc">
                Card Number
              </Label>
              <Input
                id="cardNumber"
                placeholder="1234 5678 9012 3456"
                value={cardDetails.number}
                onChange={(e) =>
                  setCardDetails({ ...cardDetails, number: e.target.value })
                }
                data-oid="36q.p_8"
              />
            </div>
            <div className="grid grid-cols-2 gap-4" data-oid="aagr590">
              <div className="space-y-2" data-oid="h5:pgdk">
                <Label htmlFor="expiry" data-oid="2xzofr:">
                  Expiry Date
                </Label>
                <Input
                  id="expiry"
                  placeholder="MM/YY"
                  value={cardDetails.expiry}
                  onChange={(e) =>
                    setCardDetails({ ...cardDetails, expiry: e.target.value })
                  }
                  data-oid="4dr8l:_"
                />
              </div>
              <div className="space-y-2" data-oid="5kyflk1">
                <Label htmlFor="cvv" data-oid="z-7imap">
                  CVV
                </Label>
                <Input
                  id="cvv"
                  placeholder="123"
                  value={cardDetails.cvv}
                  onChange={(e) =>
                    setCardDetails({ ...cardDetails, cvv: e.target.value })
                  }
                  data-oid="sidkn8h"
                />
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-4" data-oid="5pc9m9q">
            <p className="text-sm text-muted-foreground" data-oid=".iusm_x">
              Enter the OTP sent to your registered mobile number
            </p>
            <Input
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              data-oid=":5fy683"
            />
          </div>
        );

      case 3:
        return (
          <div className="text-center space-y-4" data-oid="9gi82c2">
            <CheckCircle2
              className="mx-auto h-12 w-12 text-green-500"
              data-oid="q79fzki"
            />

            <p className="text-lg font-medium" data-oid="4-922u8">
              Money Sent Successfully
            </p>
            <p className="text-sm text-muted-foreground" data-oid="9o3xjnf">
              ${amount} has been sent from your {selectedAccount} account.
            </p>
          </div>
        );
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose} data-oid="sm.2uvn">
      <DialogContent className="sm:max-w-[425px]" data-oid=":138tvo">
        <DialogHeader data-oid="b.6fk2_">
          <DialogTitle data-oid="uo54jdf">{steps[currentStep]}</DialogTitle>
        </DialogHeader>
        <div className="mt-4 space-y-4" data-oid="6d8du5_">
          {renderStepContent()}
          <div className="flex justify-between" data-oid="iv2ct41">
            {currentStep > 0 && currentStep < steps.length - 1 && (
              <Button
                variant="outline"
                onClick={() => setCurrentStep(currentStep - 1)}
                data-oid="xn23kz5"
              >
                Back
              </Button>
            )}
            <Button
              onClick={handleContinue}
              className="ml-auto"
              data-oid="a.218tg"
            >
              {currentStep === steps.length - 1 ? "Close" : "Continue"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
