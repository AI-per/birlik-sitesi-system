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
  "Select Contact",
  "Enter Amount",
  "OTP Verification",
  "Confirmation",
];

const contacts = [
  { id: "1", name: "John Doe", phoneNumber: "+1 234 567 8901" },
  { id: "2", name: "Jane Smith", phoneNumber: "+1 987 654 3210" },
  { id: "3", name: "Alice Johnson", phoneNumber: "+1 555 123 4567" },
];

export function RequestMoneyModal({ isOpen, onClose, onRequestMoney }) {
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedContact, setSelectedContact] = useState(null);
  const [amount, setAmount] = useState("");
  const [otp, setOtp] = useState("");

  const handleContinue = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onRequestMoney(Number.parseFloat(amount), selectedContact);
      onClose();
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <div className="space-y-4" data-oid="izfj0as">
            <Label htmlFor="contact" data-oid="l8jill7">
              Select Contact
            </Label>
            <Select
              onValueChange={(value) =>
                setSelectedContact(contacts.find((c) => c.id === value))
              }
              data-oid="-u2gzta"
            >
              <SelectTrigger id="contact" data-oid="o8lrvcq">
                <SelectValue
                  placeholder="Select a contact"
                  data-oid="a2blgr_"
                />
              </SelectTrigger>
              <SelectContent data-oid="3_xado7">
                {contacts.map((contact) => (
                  <SelectItem
                    key={contact.id}
                    value={contact.id}
                    data-oid="t8lx9uf"
                  >
                    {contact.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {selectedContact && (
              <div className="space-y-2" data-oid="mfnht9w">
                <p className="text-sm font-medium" data-oid="b-hvu0n">
                  Contact Details:
                </p>
                <p className="text-sm" data-oid="6wi1i3y">
                  Name: {selectedContact.name}
                </p>
                <p className="text-sm" data-oid="07-yt8x">
                  ID: {selectedContact.id}
                </p>
                <p className="text-sm" data-oid="bu1hrcj">
                  Phone: {selectedContact.phoneNumber}
                </p>
              </div>
            )}
          </div>
        );

      case 1:
        return (
          <div className="space-y-4" data-oid="7nksvkz">
            <Label htmlFor="amount" data-oid="t1o3htj">
              Amount to Request
            </Label>
            <Input
              id="amount"
              type="number"
              placeholder="Enter amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              data-oid="v_5z65g"
            />
          </div>
        );

      case 2:
        return (
          <div className="space-y-4" data-oid="m7smyp_">
            <p className="text-sm text-muted-foreground" data-oid="rx6t58g">
              Enter the OTP sent to your registered mobile number
            </p>
            <Input
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              data-oid="omuxwj."
            />
          </div>
        );

      case 3:
        return (
          <div className="text-center space-y-4" data-oid="-pp94.c">
            <CheckCircle2
              className="mx-auto h-12 w-12 text-green-500"
              data-oid="7buh7c7"
            />

            <p className="text-lg font-medium" data-oid="alsgbtk">
              Money Request Sent
            </p>
            <p className="text-sm text-muted-foreground" data-oid="k_jyb7c">
              ${amount} has been requested from {selectedContact.name}.
            </p>
          </div>
        );
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose} data-oid="b7u80kl">
      <DialogContent className="sm:max-w-[425px]" data-oid="iia27oe">
        <DialogHeader data-oid="7ugy7dg">
          <DialogTitle data-oid="0:3z5iw">{steps[currentStep]}</DialogTitle>
        </DialogHeader>
        <div className="mt-4 space-y-4" data-oid="q4ljwb7">
          {renderStepContent()}
          <div className="flex justify-between" data-oid="2pmr.76">
            {currentStep > 0 && currentStep < steps.length - 1 && (
              <Button
                variant="outline"
                onClick={() => setCurrentStep(currentStep - 1)}
                data-oid="gvr55ky"
              >
                Back
              </Button>
            )}
            <Button
              onClick={handleContinue}
              className="ml-auto"
              data-oid="8ejp9ar"
            >
              {currentStep === steps.length - 1 ? "Close" : "Continue"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
