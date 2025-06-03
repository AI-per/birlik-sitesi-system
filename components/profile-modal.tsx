"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CreditCard, Edit2, Save, Trash2 } from "lucide-react";

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface CardInfo {
  type: string;
  number: string;
  expiry: string;
}

interface UserProfile {
  name: string;
  email: string;
  company: string;
  phone: string;
  accountNumber: string;
  bankName: string;
  cards: CardInfo[];
}

export function ProfileModal({ isOpen, onClose }: ProfileModalProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [userProfile, setUserProfile] = useState<UserProfile>({
    name: "Dollar Gill",
    email: "dollar@example.com",
    company: "Acme Inc.",
    phone: "+1 (555) 123-4567",
    accountNumber: "1234567890",
    bankName: "Global Bank",
    cards: [
      { type: "Visa", number: "************1387", expiry: "12/24" },
      { type: "Amex", number: "***********2468", expiry: "06/25" },
      { type: "Mastercard", number: "************9876", expiry: "03/26" },
    ],
  });

  const handleInputChange = (field: keyof UserProfile, value: string) => {
    setUserProfile((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    setIsEditing(false);
    // Here you would typically send the updated profile to your backend
    console.log("Saving profile:", userProfile);
  };

  const handleRemoveCard = (index: number) => {
    setUserProfile((prev) => ({
      ...prev,
      cards: prev.cards.filter((_, i) => i !== index),
    }));
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose} data-oid="56jj8j3">
      <DialogContent className="sm:max-w-[600px]" data-oid="slwzy63">
        <DialogHeader data-oid="rtb9_nw">
          <DialogTitle data-oid="emagjw_">Profile</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4" data-oid="k.whytp">
          <div className="flex items-center gap-4" data-oid="020y4fe">
            <Avatar className="h-20 w-20" data-oid="gfdlqgu">
              <AvatarImage
                src="https://github.com/shadcn.png"
                alt={userProfile.name}
                data-oid="t.skrt8"
              />

              <AvatarFallback data-oid="68izib9">
                {userProfile.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div data-oid="_qap:pe">
              <h2 className="text-2xl font-bold" data-oid="jc-ijc4">
                {userProfile.name}
              </h2>
              <p className="text-sm text-muted-foreground" data-oid="5_tow67">
                {userProfile.email}
              </p>
            </div>
            <Button
              variant="outline"
              size="icon"
              className="ml-auto"
              onClick={() => (isEditing ? handleSave() : setIsEditing(true))}
              data-oid="dxa:nf0"
            >
              {isEditing ? (
                <Save className="h-4 w-4" data-oid="fpt4:h:" />
              ) : (
                <Edit2 className="h-4 w-4" data-oid="ote-6zo" />
              )}
            </Button>
          </div>
          <div className="grid gap-4" data-oid="e8m6woi">
            <div className="grid grid-cols-2 gap-4" data-oid="553k6.5">
              <div data-oid="-vzbl:1">
                <Label htmlFor="name" data-oid="1oq2j6k">
                  Name
                </Label>
                <Input
                  id="name"
                  value={userProfile.name}
                  readOnly={!isEditing}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  data-oid="r7j40q3"
                />
              </div>
              <div data-oid="-ua8.94">
                <Label htmlFor="email" data-oid="2if_cl1">
                  Email
                </Label>
                <Input
                  id="email"
                  value={userProfile.email}
                  readOnly={!isEditing}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  data-oid="i42g3u7"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4" data-oid="renz46b">
              <div data-oid="zm672rx">
                <Label htmlFor="company" data-oid="fm4z8de">
                  Company
                </Label>
                <Input
                  id="company"
                  value={userProfile.company}
                  readOnly={!isEditing}
                  onChange={(e) => handleInputChange("company", e.target.value)}
                  data-oid="b:apy::"
                />
              </div>
              <div data-oid="v8kf3.3">
                <Label htmlFor="phone" data-oid="-xxu6ao">
                  Phone
                </Label>
                <Input
                  id="phone"
                  value={userProfile.phone}
                  readOnly={!isEditing}
                  onChange={(e) => handleInputChange("phone", e.target.value)}
                  data-oid="go09-kd"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4" data-oid="3j4_qb.">
              <div data-oid="14oph24">
                <Label htmlFor="accountNumber" data-oid="k:g7hd9">
                  Account Number
                </Label>
                <Input
                  id="accountNumber"
                  value={userProfile.accountNumber}
                  readOnly
                  data-oid="g6pb-w5"
                />
              </div>
              <div data-oid="ly7vrpq">
                <Label htmlFor="bankName" data-oid="y3yu4.4">
                  Bank Name
                </Label>
                <Input
                  id="bankName"
                  value={userProfile.bankName}
                  readOnly
                  data-oid="nbm67n0"
                />
              </div>
            </div>
          </div>
          <Card data-oid="ovumbx4">
            <CardHeader data-oid="o977im-">
              <CardTitle data-oid="n147025">Cards</CardTitle>
            </CardHeader>
            <CardContent data-oid="e.ddy3g">
              <div className="space-y-4" data-oid="3vhczcy">
                {userProfile.cards.map((card, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-4"
                    data-oid="qwf.-5x"
                  >
                    <CreditCard className="h-6 w-6" data-oid="63dhzg1" />
                    <div data-oid="lr7-lbi">
                      <p className="font-medium" data-oid="1wtczg4">
                        {card.type}
                      </p>
                      <p
                        className="text-sm text-muted-foreground"
                        data-oid="5jh9sh7"
                      >
                        {card.number}
                      </p>
                    </div>
                    <p className="ml-auto text-sm" data-oid=".0:m8wa">
                      Expires: {card.expiry}
                    </p>
                    {isEditing && (
                      <Button
                        variant="destructive"
                        size="icon"
                        onClick={() => handleRemoveCard(index)}
                        data-oid="31412tj"
                      >
                        <Trash2 className="h-4 w-4" data-oid="y4ofwz6" />
                      </Button>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  );
}
