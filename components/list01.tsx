import { Wallet, Plus, Send, CreditCard, MoreHorizontal } from "lucide-react";
import { Modal } from "./modal";

const accounts = [
  { name: "Checking", balance: 5240.23 },
  { name: "Savings", balance: 12750.89 },
  { name: "Investment", balance: 7890.45 },
];

export function List01() {
  const totalBalance = accounts.reduce(
    (sum, account) => sum + account.balance,
    0,
  );

  return (
    <div
      className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6"
      data-oid="r_pxyc0"
    >
      <div
        className="flex items-center justify-between mb-4"
        data-oid="zz.pn4d"
      >
        <h2
          className="text-lg font-semibold text-gray-900 dark:text-white flex items-center"
          data-oid="_5b8yzp"
        >
          <Wallet className="h-5 w-5 mr-2" data-oid="s:14b_0" />
          Accounts
        </h2>
        <span
          className="text-2xl font-bold text-gray-900 dark:text-white"
          data-oid="g475342"
        >
          ${totalBalance.toFixed(2)}
        </span>
      </div>
      <div className="space-y-4 mb-6" data-oid="yzmhn2e">
        {accounts.map((account) => (
          <div
            key={account.name}
            className="flex justify-between items-center"
            data-oid="zr2uaxz"
          >
            <span
              className="text-sm text-gray-500 dark:text-gray-400"
              data-oid="i:wg6o4"
            >
              {account.name}
            </span>
            <span
              className="font-medium text-gray-900 dark:text-white"
              data-oid="_.-mst4"
            >
              ${account.balance.toFixed(2)}
            </span>
          </div>
        ))}
      </div>
      <div className="grid grid-cols-2 gap-4" data-oid="fjo03.5">
        <Modal
          trigger={
            <button
              className="flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              data-oid="oli4j_e"
            >
              <Plus className="h-4 w-4 mr-2" data-oid="znx5.nz" />
              Add
            </button>
          }
          title="Add Funds"
          description="Add funds to your account"
          data-oid="wbya-_5"
        />

        <Modal
          trigger={
            <button
              className="flex items-center justify-center px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
              data-oid="3u50l6w"
            >
              <Send className="h-4 w-4 mr-2" data-oid="x9ein2r" />
              Send
            </button>
          }
          title="Send Money"
          description="Send money to another account"
          data-oid=".tbnv_i"
        />

        <Modal
          trigger={
            <button
              className="flex items-center justify-center px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors"
              data-oid="gtr-_5."
            >
              <CreditCard className="h-4 w-4 mr-2" data-oid=":5s.irl" />
              Top-up
            </button>
          }
          title="Top Up"
          description="Top up your account"
          data-oid="oijsb5e"
        />

        <button
          className="flex items-center justify-center px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-md hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
          data-oid="jc_g1lg"
        >
          <MoreHorizontal className="h-4 w-4 mr-2" data-oid=".6nr8hq" />
          More
        </button>
      </div>
    </div>
  );
}
