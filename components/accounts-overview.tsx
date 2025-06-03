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
    <Card data-oid="0xnt8vz">
      <CardHeader
        className="flex flex-row items-center justify-between space-y-0 pb-2"
        data-oid="az9gftc"
      >
        <CardTitle className="text-sm font-medium" data-oid="-31aufp">
          Accounts Overview
        </CardTitle>
        <Wallet className="h-4 w-4 text-muted-foreground" data-oid="47:fyrk" />
      </CardHeader>
      <CardContent data-oid="ymt5eo_">
        <div className="text-2xl font-bold" data-oid="23a_97n">
          ${totalBalance.toLocaleString()}
        </div>
        <p className="text-xs text-muted-foreground" data-oid="alxj110">
          Total balance across all accounts
        </p>
        <div className="mt-4 space-y-2" data-oid="6l12x1h">
          {accounts.map((account) => (
            <div
              key={account.name}
              className="flex justify-between items-center"
              data-oid="-1dkmlc"
            >
              <span
                className="text-sm text-muted-foreground"
                data-oid="6fi3tln"
              >
                {account.name}
              </span>
              <span className="text-sm font-medium" data-oid=".6h5__v">
                ${account.balance.toLocaleString()}
              </span>
            </div>
          ))}
        </div>
        <div className="mt-4 grid grid-cols-2 gap-2" data-oid="xcsq2:y">
          <Button
            size="sm"
            onClick={() => setIsAddMoneyModalOpen(true)}
            data-oid=".78ny3m"
          >
            <Plus className="mr-2 h-4 w-4" data-oid="givgs5j" /> Add
          </Button>
          <Button
            size="sm"
            onClick={() => setIsSendMoneyModalOpen(true)}
            data-oid=".msbmlz"
          >
            <Send className="mr-2 h-4 w-4" data-oid="yb05j39" /> Send
          </Button>
          <Button
            size="sm"
            onClick={() => setIsRequestMoneyModalOpen(true)}
            data-oid="hvq-jxu"
          >
            <CreditCard className="mr-2 h-4 w-4" data-oid=":v41qx0" /> Request
          </Button>
          <Button size="sm" variant="outline" data-oid="ptmr-gh">
            <MoreHorizontal className="mr-2 h-4 w-4" data-oid="jr.o92p" /> More
          </Button>
        </div>
      </CardContent>
      <AddMoneyModal
        isOpen={isAddMoneyModalOpen}
        onClose={() => setIsAddMoneyModalOpen(false)}
        onAddMoney={handleAddMoney}
        data-oid="6mrkdus"
      />

      <SendMoneyModal
        isOpen={isSendMoneyModalOpen}
        onClose={() => setIsSendMoneyModalOpen(false)}
        onSendMoney={handleSendMoney}
        accounts={accounts}
        data-oid="py4f98w"
      />

      <RequestMoneyModal
        isOpen={isRequestMoneyModalOpen}
        onClose={() => setIsRequestMoneyModalOpen(false)}
        onRequestMoney={handleRequestMoney}
        data-oid="0ftc6g3"
      />
    </Card>
  );
}
