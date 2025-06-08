"use client";

import { useState, type ReactNode } from "react";
import { X } from "lucide-react";

interface ModalProps {
  trigger: ReactNode;
  title: string;
  description: string;
}

export function Modal({ trigger, title, description }: ModalProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div onClick={() => setIsOpen(true)} data-oid="-0pqw3r">
        {trigger}
      </div>
      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50"
          data-oid="9i6rbhn"
        >
          <div
            className="bg-white dark:bg-gray-800 rounded-xl shadow-lg max-w-md w-full"
            data-oid="ttoe2iy"
          >
            <div
              className="flex justify-between items-center p-6 border-b border-gray-200 dark:border-gray-700"
              data-oid="sj3nz:."
            >
              <h3
                className="text-lg font-semibold text-gray-900 dark:text-white"
                data-oid="ru_nry."
              >
                {title}
              </h3>
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-400 hover:text-gray-500"
                data-oid="1slg_.."
              >
                <X className="h-6 w-6" data-oid="x_p6c_:" />
              </button>
            </div>
            <div className="p-6" data-oid="b_a_:h1">
              <p
                className="text-sm text-gray-500 dark:text-gray-400 mb-4"
                data-oid="vcky517"
              >
                {description}
              </p>
              <div className="mb-4" data-oid="7b2cjeo">
                <label
                  htmlFor="amount"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                  data-oid="1rrj1ci"
                >
                  Amount
                </label>
                <input
                  type="number"
                  id="amount"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                  placeholder="Enter amount"
                  data-oid="i82xr:r"
                />
              </div>
              <div className="flex justify-end space-x-4" data-oid="ojka14w">
                <button
                  onClick={() => setIsOpen(false)}
                  className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  data-oid="t:k3c.u"
                >
                  Cancel
                </button>
                <button
                  className="px-4 py-2 bg-blue-600 rounded-md text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  data-oid=".6_nq9:"
                >
                  Confirm
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
