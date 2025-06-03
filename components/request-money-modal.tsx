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
          <div className="space-y-4" data-oid="9-w12c0">
            <Label htmlFor="contact" data-oid="9a_:_a3">
              Select Contact
            </Label>
            <Select
              onValueChange={(value) =>
                setSelectedContact(contacts.find((c) => c.id === value))
              }
              data-oid="ihfr_3r"
            >
              <SelectTrigger id="contact" data-oid="lyk88tl">
                <SelectValue
                  placeholder="Select a contact"
                  data-oid="le63p4a"
                />
              </SelectTrigger>
              <SelectContent data-oid="xn6nt09">
                {contacts.map((contact) => (
                  <SelectItem
                    key={contact.id}
                    value={contact.id}
                    data-oid="7tthkww"
                  >
                    {contact.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {selectedContact && (
              <div className="space-y-2" data-oid="mwg6.g7">
                <p className="text-sm font-medium" data-oid="6j7f1qx">
                  Contact Details:
                </p>
                <p className="text-sm" data-oid="_jovx-x">
                  Name: {selectedContact.name}
                </p>
                <p className="text-sm" data-oid="82bic15">
                  ID: {selectedContact.id}
                </p>
                <p className="text-sm" data-oid="01xb3.c">
                  Phone: {selectedContact.phoneNumber}
                </p>
              </div>
            )}
          </div>
        );

      case 1:
        return (
          <div className="space-y-4" data-oid="em458hz">
            <Label htmlFor="amount" data-oid="xreh:2k">
              Amount to Request
            </Label>
            <Input
              id="amount"
              type="number"
              placeholder="Enter amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              data-oid="e2j7bfl"
            />
          </div>
        );

      case 2:
        return (
          <div className="space-y-4" data-oid="ohj4ylf">
            <p className="text-sm text-muted-foreground" data-oid="e5ff4y3">
              Enter the OTP sent to your registered mobile number
            </p>
            <Input
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              data-oid="t.sz-qh"
            />
          </div>
        );

      case 3:
        return (
          <div className="text-center space-y-4" data-oid="03lec.e">
            <CheckCircle2
              className="mx-auto h-12 w-12 text-green-500"
              data-oid="rgpkkvj"
            />

            <p className="text-lg font-medium" data-oid="ul1qow8">
              Money Request Sent
            </p>
            <p className="text-sm text-muted-foreground" data-oid="425g7hc">
              ${amount} has been requested from {selectedContact.name}.
            </p>
          </div>
        );
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose} data-oid="zgsi4ld">
      <DialogContent className="sm:max-w-[425px]" data-oid="socj8-s">
        <DialogHeader data-oid="kt-rnhx">
          <DialogTitle data-oid="sfiw_wr">{steps[currentStep]}</DialogTitle>
        </DialogHeader>
        <div className="mt-4 space-y-4" data-oid="di8.j85">
          {renderStepContent()}
          <div className="flex justify-between" data-oid="t7xo0u1">
            {currentStep > 0 && currentStep < steps.length - 1 && (
              <Button
                variant="outline"
                onClick={() => setCurrentStep(currentStep - 1)}
                data-oid="rjiudk7"
              >
                Back
              </Button>
            )}
            <Button
              onClick={handleContinue}
              className="ml-auto"
              data-oid="k8yq:w8"
            >
              {currentStep === steps.length - 1 ? "Close" : "Continue"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
