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
    <Dialog open={isOpen} onOpenChange={onClose} data-oid="ztfmdfv">
      <DialogContent className="sm:max-w-[600px]" data-oid="6-ey1_c">
        <DialogHeader data-oid="c-.h1ag">
          <DialogTitle data-oid="tr_fvd-">Profile</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4" data-oid="tjfbzms">
          <div className="flex items-center gap-4" data-oid="emxh1d_">
            <Avatar className="h-20 w-20" data-oid="9kc7ee6">
              <AvatarImage
                src="https://github.com/shadcn.png"
                alt={userProfile.name}
                data-oid="5oy5yc."
              />

              <AvatarFallback data-oid="92krwn.">
                {userProfile.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div data-oid="24ptpkz">
              <h2 className="text-2xl font-bold" data-oid="02ems5x">
                {userProfile.name}
              </h2>
              <p className="text-sm text-muted-foreground" data-oid="-.yh-fj">
                {userProfile.email}
              </p>
            </div>
            <Button
              variant="outline"
              size="icon"
              className="ml-auto"
              onClick={() => (isEditing ? handleSave() : setIsEditing(true))}
              data-oid="0c20nti"
            >
              {isEditing ? (
                <Save className="h-4 w-4" data-oid="dhcqm05" />
              ) : (
                <Edit2 className="h-4 w-4" data-oid="5cm1pop" />
              )}
            </Button>
          </div>
          <div className="grid gap-4" data-oid="g7twn8x">
            <div className="grid grid-cols-2 gap-4" data-oid="36l59iq">
              <div data-oid="3bckhgm">
                <Label htmlFor="name" data-oid="njk0dc5">
                  Name
                </Label>
                <Input
                  id="name"
                  value={userProfile.name}
                  readOnly={!isEditing}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  data-oid="idth638"
                />
              </div>
              <div data-oid="raima20">
                <Label htmlFor="email" data-oid="zv8bl4-">
                  Email
                </Label>
                <Input
                  id="email"
                  value={userProfile.email}
                  readOnly={!isEditing}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  data-oid=".petrjc"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4" data-oid="-cmv2v5">
              <div data-oid="e.nmpyg">
                <Label htmlFor="company" data-oid="_xvhi7d">
                  Company
                </Label>
                <Input
                  id="company"
                  value={userProfile.company}
                  readOnly={!isEditing}
                  onChange={(e) => handleInputChange("company", e.target.value)}
                  data-oid="-614v5z"
                />
              </div>
              <div data-oid="wyfo.py">
                <Label htmlFor="phone" data-oid="vpcaq72">
                  Phone
                </Label>
                <Input
                  id="phone"
                  value={userProfile.phone}
                  readOnly={!isEditing}
                  onChange={(e) => handleInputChange("phone", e.target.value)}
                  data-oid="xm.5gke"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4" data-oid="jrk2ek6">
              <div data-oid="ahve4sa">
                <Label htmlFor="accountNumber" data-oid="6j8t9vd">
                  Account Number
                </Label>
                <Input
                  id="accountNumber"
                  value={userProfile.accountNumber}
                  readOnly
                  data-oid="lklo906"
                />
              </div>
              <div data-oid="pt5soc.">
                <Label htmlFor="bankName" data-oid="z6dr:ru">
                  Bank Name
                </Label>
                <Input
                  id="bankName"
                  value={userProfile.bankName}
                  readOnly
                  data-oid=".5prv7d"
                />
              </div>
            </div>
          </div>
          <Card data-oid="3vl9xe2">
            <CardHeader data-oid="vsrgtsi">
              <CardTitle data-oid="59ft35j">Cards</CardTitle>
            </CardHeader>
            <CardContent data-oid="5es9ho-">
              <div className="space-y-4" data-oid="55q7o:l">
                {userProfile.cards.map((card, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-4"
                    data-oid="7o-9qml"
                  >
                    <CreditCard className="h-6 w-6" data-oid="5aefv3d" />
                    <div data-oid="1.57wik">
                      <p className="font-medium" data-oid="x:pu6uh">
                        {card.type}
                      </p>
                      <p
                        className="text-sm text-muted-foreground"
                        data-oid="wsp0p2i"
                      >
                        {card.number}
                      </p>
                    </div>
                    <p className="ml-auto text-sm" data-oid="fn8oyh_">
                      Expires: {card.expiry}
                    </p>
                    {isEditing && (
                      <Button
                        variant="destructive"
                        size="icon"
                        onClick={() => handleRemoveCard(index)}
                        data-oid="i5jog4s"
                      >
                        <Trash2 className="h-4 w-4" data-oid="i1-yujc" />
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
