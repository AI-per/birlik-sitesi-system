"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Wallet, Plus, Send, CreditCard, MoreHorizontal } from "lucide-react";
import { AddMoneyModal } from "./add-money-modal";
import { SendMoneyModal } from "./send-money-modal";
import { RequestMoneyModal } from "./request-money-modal";

const initialAccounts = [
  { name: "Checking", balance: 7500 },
  { name: "Savings", balance: 560000 },
  { name: "Investment", balance: 5879000 },
];

export function AccountsOverview() {
  const [accounts, setAccounts] = useState(initialAccounts);
  const [isAddMoneyModalOpen, setIsAddMoneyModalOpen] = useState(false);
  const [isSendMoneyModalOpen, setIsSendMoneyModalOpen] = useState(false);
  const [isRequestMoneyModalOpen, setIsRequestMoneyModalOpen] = useState(false);

  const totalBalance = accounts.reduce(
    (sum, account) => sum + account.balance,
    0,
  );

  const handleAddMoney = (amount) => {
    setAccounts(
      accounts.map((account) =>
        account.name === "Checking"
          ? { ...account, balance: account.balance + amount }
          : account,
      ),
    );
  };

  const handleSendMoney = (amount, fromAccount) => {
    setAccounts(
      accounts.map((account) =>
        account.name === fromAccount
          ? { ...account, balance: account.balance - amount }
          : account,
      ),
    );
  };

  const handleRequestMoney = (amount, contact) => {
    console.log(`Requested $${amount} from ${contact.name}`);
  };

  return (
    <Card data-oid="m846.yq">
      <CardHeader
        className="flex flex-row items-center justify-between space-y-0 pb-2"
        data-oid="ly_bnbi"
      >
        <CardTitle className="text-sm font-medium" data-oid="ut7w.2o">
          Accounts Overview
        </CardTitle>
        <Wallet className="h-4 w-4 text-muted-foreground" data-oid="xzifxzt" />
      </CardHeader>
      <CardContent data-oid="028922n">
        <div className="text-2xl font-bold" data-oid="s0.hae8">
          ${totalBalance.toLocaleString()}
        </div>
        <p className="text-xs text-muted-foreground" data-oid="5uyyl_5">
          Total balance across all accounts
        </p>
        <div className="mt-4 space-y-2" data-oid="8u_itab">
          {accounts.map((account) => (
            <div
              key={account.name}
              className="flex justify-between items-center"
              data-oid="huf24q3"
            >
              <span
                className="text-sm text-muted-foreground"
                data-oid="zko3d0b"
              >
                {account.name}
              </span>
              <span className="text-sm font-medium" data-oid="whxu51v">
                ${account.balance.toLocaleString()}
              </span>
            </div>
          ))}
        </div>
        <div className="mt-4 grid grid-cols-2 gap-2" data-oid="8xjjs6-">
          <Button
            size="sm"
            onClick={() => setIsAddMoneyModalOpen(true)}
            data-oid="0nvi0x-"
          >
            <Plus className="mr-2 h-4 w-4" data-oid="ovb5qt5" /> Add
          </Button>
          <Button
            size="sm"
            onClick={() => setIsSendMoneyModalOpen(true)}
            data-oid="slev46c"
          >
            <Send className="mr-2 h-4 w-4" data-oid="9xt__1n" /> Send
          </Button>
          <Button
            size="sm"
            onClick={() => setIsRequestMoneyModalOpen(true)}
            data-oid="2g1tm52"
          >
            <CreditCard className="mr-2 h-4 w-4" data-oid="m42oz4o" /> Request
          </Button>
          <Button size="sm" variant="outline" data-oid="yv2u:5w">
            <MoreHorizontal className="mr-2 h-4 w-4" data-oid=":ex_uw9" /> More
          </Button>
        </div>
      </CardContent>
      <AddMoneyModal
        isOpen={isAddMoneyModalOpen}
        onClose={() => setIsAddMoneyModalOpen(false)}
        onAddMoney={handleAddMoney}
        data-oid="y42yd77"
      />

      <SendMoneyModal
        isOpen={isSendMoneyModalOpen}
        onClose={() => setIsSendMoneyModalOpen(false)}
        onSendMoney={handleSendMoney}
        accounts={accounts}
        data-oid="w5l27ec"
      />

      <RequestMoneyModal
        isOpen={isRequestMoneyModalOpen}
        onClose={() => setIsRequestMoneyModalOpen(false)}
        onRequestMoney={handleRequestMoney}
        data-oid="2qjfuao"
      />
    </Card>
  );
}
