import { DuesList } from "@/components/dues/dues-list";

// Mock user data
const MOCK_CURRENT_USER = {
  id: "1be6f3b1-97e7-4910-8b6b-cd03f633b11a",
  role: "MANAGER"
};

export default function DuesPage() {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Aidatlar</h2>
      </div>
      <div className="space-y-4">
        <div className="rounded-lg border p-4">
          <div className="flex items-center gap-2 mb-4">
            <div className="h-2 w-2 rounded-full bg-green-500"></div>
            <h3 className="text-lg font-semibold">Aidat Yönetimi</h3>
          </div>
          <p className="text-sm text-muted-foreground mb-4">
            Site aidatlarını görüntüleyin, düzenleyin ve yönetin. Ödeme durumlarını takip edin ve toplu aidat oluşturun.
          </p>
          <DuesList 
            currentUserId={MOCK_CURRENT_USER.id}
            currentUserRole={MOCK_CURRENT_USER.role}
          />
        </div>
      </div>
    </div>
  );
} 