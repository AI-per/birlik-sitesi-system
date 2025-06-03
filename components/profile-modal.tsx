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
    <Dialog open={isOpen} onOpenChange={onClose} data-oid="o9:gy5o">
      <DialogContent className="sm:max-w-[600px]" data-oid="dvoc3yy">
        <DialogHeader data-oid="nablzi4">
          <DialogTitle data-oid="9kqj:ho">Profile</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4" data-oid="0pqi0g0">
          <div className="flex items-center gap-4" data-oid="e:3pj.2">
            <Avatar className="h-20 w-20" data-oid="6yi86kj">
              <AvatarImage
                src="https://github.com/shadcn.png"
                alt={userProfile.name}
                data-oid="8j-h0xr"
              />

              <AvatarFallback data-oid=":-hydam">
                {userProfile.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div data-oid="j1b9plk">
              <h2 className="text-2xl font-bold" data-oid="tkkmtn3">
                {userProfile.name}
              </h2>
              <p className="text-sm text-muted-foreground" data-oid="6mq0q.v">
                {userProfile.email}
              </p>
            </div>
            <Button
              variant="outline"
              size="icon"
              className="ml-auto"
              onClick={() => (isEditing ? handleSave() : setIsEditing(true))}
              data-oid="lvc53y1"
            >
              {isEditing ? (
                <Save className="h-4 w-4" data-oid=":w9a8n8" />
              ) : (
                <Edit2 className="h-4 w-4" data-oid="02-4ua5" />
              )}
            </Button>
          </div>
          <div className="grid gap-4" data-oid="xs.ey65">
            <div className="grid grid-cols-2 gap-4" data-oid="do0ijhj">
              <div data-oid="5ux57t1">
                <Label htmlFor="name" data-oid=".-h95y:">
                  Name
                </Label>
                <Input
                  id="name"
                  value={userProfile.name}
                  readOnly={!isEditing}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  data-oid="yhvjuwa"
                />
              </div>
              <div data-oid="ku_9qc3">
                <Label htmlFor="email" data-oid="sw6zly2">
                  Email
                </Label>
                <Input
                  id="email"
                  value={userProfile.email}
                  readOnly={!isEditing}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  data-oid="6iebfd1"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4" data-oid="p0r47xa">
              <div data-oid="_c.zyx0">
                <Label htmlFor="company" data-oid=".q:ecgr">
                  Company
                </Label>
                <Input
                  id="company"
                  value={userProfile.company}
                  readOnly={!isEditing}
                  onChange={(e) => handleInputChange("company", e.target.value)}
                  data-oid="yft0ry8"
                />
              </div>
              <div data-oid="4cov.oa">
                <Label htmlFor="phone" data-oid="bbgn_so">
                  Phone
                </Label>
                <Input
                  id="phone"
                  value={userProfile.phone}
                  readOnly={!isEditing}
                  onChange={(e) => handleInputChange("phone", e.target.value)}
                  data-oid="6ppyz40"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4" data-oid="az1tg1j">
              <div data-oid="c00m:-g">
                <Label htmlFor="accountNumber" data-oid="l4fc:by">
                  Account Number
                </Label>
                <Input
                  id="accountNumber"
                  value={userProfile.accountNumber}
                  readOnly
                  data-oid="-lefbip"
                />
              </div>
              <div data-oid="yiv1myz">
                <Label htmlFor="bankName" data-oid="z53gzoz">
                  Bank Name
                </Label>
                <Input
                  id="bankName"
                  value={userProfile.bankName}
                  readOnly
                  data-oid="0re62to"
                />
              </div>
            </div>
          </div>
          <Card data-oid=":xrf:c1">
            <CardHeader data-oid=":83_52k">
              <CardTitle data-oid="-2v_fn_">Cards</CardTitle>
            </CardHeader>
            <CardContent data-oid="du7_ohb">
              <div className="space-y-4" data-oid="wv0ef38">
                {userProfile.cards.map((card, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-4"
                    data-oid="hvr8cqm"
                  >
                    <CreditCard className="h-6 w-6" data-oid="_aug1ct" />
                    <div data-oid="k8cvnxf">
                      <p className="font-medium" data-oid="_..f:xv">
                        {card.type}
                      </p>
                      <p
                        className="text-sm text-muted-foreground"
                        data-oid=".phws0c"
                      >
                        {card.number}
                      </p>
                    </div>
                    <p className="ml-auto text-sm" data-oid="gezlubv">
                      Expires: {card.expiry}
                    </p>
                    {isEditing && (
                      <Button
                        variant="destructive"
                        size="icon"
                        onClick={() => handleRemoveCard(index)}
                        data-oid="z9:qnvy"
                      >
                        <Trash2 className="h-4 w-4" data-oid="fbtqq84" />
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
