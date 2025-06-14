"use client";

import { UserList } from "@/components/users/user-list";

export default function UsersPage() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Kullanıcılar</h2>
      </div>
      <UserList />
    </div>
  );
} 