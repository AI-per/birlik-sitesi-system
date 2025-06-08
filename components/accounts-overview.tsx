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
    <Card data-oid="3fvq_8w">
      <CardHeader
        className="flex flex-row items-center justify-between space-y-0 pb-2"
        data-oid="hxfxhti"
      >
        <CardTitle className="text-sm font-medium" data-oid="r6rms9c">
          Accounts Overview
        </CardTitle>
        <Wallet className="h-4 w-4 text-muted-foreground" data-oid="1l2-vyn" />
      </CardHeader>
      <CardContent data-oid="7gdtkun">
        <div className="text-2xl font-bold" data-oid="kx9ew:1">
          ${totalBalance.toLocaleString()}
        </div>
        <p className="text-xs text-muted-foreground" data-oid="n-vsquv">
          Total balance across all accounts
        </p>
        <div className="mt-4 space-y-2" data-oid="5xb238e">
          {accounts.map((account) => (
            <div
              key={account.name}
              className="flex justify-between items-center"
              data-oid="v1sjv75"
            >
              <span
                className="text-sm text-muted-foreground"
                data-oid="jp9q8lf"
              >
                {account.name}
              </span>
              <span className="text-sm font-medium" data-oid="9zngsd:">
                ${account.balance.toLocaleString()}
              </span>
            </div>
          ))}
        </div>
        <div className="mt-4 grid grid-cols-2 gap-2" data-oid="m8sq2ne">
          <Button
            size="sm"
            onClick={() => setIsAddMoneyModalOpen(true)}
            data-oid="ug4ww7c"
          >
            <Plus className="mr-2 h-4 w-4" data-oid="93ff8xe" /> Add
          </Button>
          <Button
            size="sm"
            onClick={() => setIsSendMoneyModalOpen(true)}
            data-oid="iv2cv.o"
          >
            <Send className="mr-2 h-4 w-4" data-oid="29.glm7" /> Send
          </Button>
          <Button
            size="sm"
            onClick={() => setIsRequestMoneyModalOpen(true)}
            data-oid="mrpzsrf"
          >
            <CreditCard className="mr-2 h-4 w-4" data-oid="iel001z" /> Request
          </Button>
          <Button size="sm" variant="outline" data-oid="0fzedmm">
            <MoreHorizontal className="mr-2 h-4 w-4" data-oid="5tpbpvr" /> More
          </Button>
        </div>
      </CardContent>
      <AddMoneyModal
        isOpen={isAddMoneyModalOpen}
        onClose={() => setIsAddMoneyModalOpen(false)}
        onAddMoney={handleAddMoney}
        data-oid="b0k2zp6"
      />

      <SendMoneyModal
        isOpen={isSendMoneyModalOpen}
        onClose={() => setIsSendMoneyModalOpen(false)}
        onSendMoney={handleSendMoney}
        accounts={accounts}
        data-oid="pqcctvy"
      />

      <RequestMoneyModal
        isOpen={isRequestMoneyModalOpen}
        onClose={() => setIsRequestMoneyModalOpen(false)}
        onRequestMoney={handleRequestMoney}
        data-oid="8uvr78z"
      />
    </Card>
  );
}
