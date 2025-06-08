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
          <div className="space-y-4" data-oid="e-innvd">
            <Label htmlFor="contact" data-oid="15qj8-j">
              Select Contact
            </Label>
            <Select
              onValueChange={(value) =>
                setSelectedContact(contacts.find((c) => c.id === value))
              }
              data-oid="0jk0lxj"
            >
              <SelectTrigger id="contact" data-oid="wdexhfn">
                <SelectValue
                  placeholder="Select a contact"
                  data-oid="_yoou01"
                />
              </SelectTrigger>
              <SelectContent data-oid="n.tdnj3">
                {contacts.map((contact) => (
                  <SelectItem
                    key={contact.id}
                    value={contact.id}
                    data-oid="h7gckqk"
                  >
                    {contact.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {selectedContact && (
              <div className="space-y-2" data-oid="yx7c2aw">
                <p className="text-sm font-medium" data-oid="xi5w-wl">
                  Contact Details:
                </p>
                <p className="text-sm" data-oid="lg:::s0">
                  Name: {selectedContact.name}
                </p>
                <p className="text-sm" data-oid="2qher10">
                  ID: {selectedContact.id}
                </p>
                <p className="text-sm" data-oid="ponx9t5">
                  Phone: {selectedContact.phoneNumber}
                </p>
              </div>
            )}
          </div>
        );

      case 1:
        return (
          <div className="space-y-4" data-oid="ih8_xuk">
            <Label htmlFor="amount" data-oid="4flita6">
              Amount to Request
            </Label>
            <Input
              id="amount"
              type="number"
              placeholder="Enter amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              data-oid="m035p6:"
            />
          </div>
        );

      case 2:
        return (
          <div className="space-y-4" data-oid="f_g1mgh">
            <p className="text-sm text-muted-foreground" data-oid="d3eb2rs">
              Enter the OTP sent to your registered mobile number
            </p>
            <Input
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              data-oid="pyq-39l"
            />
          </div>
        );

      case 3:
        return (
          <div className="text-center space-y-4" data-oid="p_sb-7.">
            <CheckCircle2
              className="mx-auto h-12 w-12 text-green-500"
              data-oid="moobj9i"
            />

            <p className="text-lg font-medium" data-oid="f9su5dt">
              Money Request Sent
            </p>
            <p className="text-sm text-muted-foreground" data-oid="4khfj.2">
              ${amount} has been requested from {selectedContact.name}.
            </p>
          </div>
        );
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose} data-oid="z2wtb3a">
      <DialogContent className="sm:max-w-[425px]" data-oid="qoq4tyw">
        <DialogHeader data-oid="jrvc9d_">
          <DialogTitle data-oid="0oh_x7y">{steps[currentStep]}</DialogTitle>
        </DialogHeader>
        <div className="mt-4 space-y-4" data-oid="rypx:1i">
          {renderStepContent()}
          <div className="flex justify-between" data-oid="3l9krn.">
            {currentStep > 0 && currentStep < steps.length - 1 && (
              <Button
                variant="outline"
                onClick={() => setCurrentStep(currentStep - 1)}
                data-oid="s2oj.4v"
              >
                Back
              </Button>
            )}
            <Button
              onClick={handleContinue}
              className="ml-auto"
              data-oid="oo5ixnh"
            >
              {currentStep === steps.length - 1 ? "Close" : "Continue"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
