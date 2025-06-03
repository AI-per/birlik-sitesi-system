import {
  Calendar,
  PiggyBank,
  TrendingUp,
  CreditCard,
  ArrowRight,
} from "lucide-react";

const events = [
  {
    id: 1,
    title: "Emergency Fund",
    subtitle: "3 months of expenses saved",
    icon: PiggyBank,
    status: "In Progress",
    progress: 65,
    target: 15000,
    date: "Dec 2024",
  },
  {
    id: 2,
    title: "Stock Portfolio",
    subtitle: "Tech sector investment plan",
    icon: TrendingUp,
    status: "Pending",
    progress: 30,
    target: 50000,
    date: "Jun 2024",
  },
  {
    id: 3,
    title: "Debt Repayment",
    subtitle: "Student loan payoff plan",
    icon: CreditCard,
    status: "In Progress",
    progress: 45,
    target: 25000,
    date: "Mar 2025",
  },
];

const statusColors = {
  Pending: "bg-yellow-100 text-yellow-800",
  "In Progress": "bg-blue-100 text-blue-800",
  Completed: "bg-green-100 text-green-800",
};

export function List03() {
  return (
    <div
      className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6"
      data-oid="9.ubcg_"
    >
      <div
        className="flex items-center justify-between mb-4"
        data-oid="w3pi0qu"
      >
        <h2
          className="text-lg font-semibold text-gray-900 dark:text-white flex items-center"
          data-oid="u:r7_:r"
        >
          <Calendar className="h-5 w-5 mr-2" data-oid="03vkwxr" />
          Upcoming Events
        </h2>
      </div>
      <div className="space-x-4 overflow-x-auto flex pb-4" data-oid="x0qa9po">
        {events.map((event) => (
          <div
            key={event.id}
            className="bg-gray-50 dark:bg-gray-700 rounded-xl p-4 w-72 flex-shrink-0"
            data-oid="u13cafa"
          >
            <div
              className="flex items-center justify-between mb-4"
              data-oid="461a8f3"
            >
              <div
                className="p-2 bg-gray-200 dark:bg-gray-600 rounded-full"
                data-oid="z3.9qv9"
              >
                <event.icon
                  className="h-5 w-5 text-gray-700 dark:text-gray-300"
                  data-oid="l7tq9:."
                />
              </div>
              <span
                className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[event.status]}`}
                data-oid="ibzya_3"
              >
                {event.status}
              </span>
            </div>
            <h3
              className="text-sm font-medium text-gray-900 dark:text-white mb-1"
              data-oid="5n.qw7n"
            >
              {event.title}
            </h3>
            <p
              className="text-xs text-gray-500 dark:text-gray-400 mb-3"
              data-oid=".691.ti"
            >
              {event.subtitle}
            </p>
            <div
              className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-1.5 mb-3"
              data-oid="t7f_yf6"
            >
              <div
                className="bg-blue-600 h-1.5 rounded-full"
                style={{ width: `${event.progress}%` }}
                data-oid="efezov-"
              ></div>
            </div>
            <div
              className="flex items-center justify-between mb-3"
              data-oid="cgex123"
            >
              <span
                className="text-sm font-medium text-gray-900 dark:text-white"
                data-oid="ynmr5ov"
              >
                ${event.target.toLocaleString()}
                <span
                  className="text-xs text-gray-500 dark:text-gray-400 ml-1"
                  data-oid="rsn5-u4"
                >
                  target
                </span>
              </span>
              <span
                className="flex items-center text-xs text-gray-500 dark:text-gray-400"
                data-oid="0.5dv:5"
              >
                <Calendar className="h-3 w-3 mr-1" data-oid="32g2q-:" />
                {event.date}
              </span>
            </div>
            <button
              className="w-full px-4 py-2 bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-md hover:bg-gray-300 dark:hover:bg-gray-500 transition-colors flex items-center justify-center"
              data-oid="phzc3om"
            >
              View Details
              <ArrowRight className="h-4 w-4 ml-2" data-oid="ja_hz7q" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
