import { AnnouncementList } from "@/components/announcements/announcement-list";

// Şimdilik mock user data kullanıyoruz
// Gerçek uygulamada bu bilgiler authentication context'inden gelecek
const MOCK_CURRENT_USER = {
  id: "1be6f3b1-97e7-4910-8b6b-cd03f633b11a", // Ali Kaya'nın ID'si
  role: "MANAGER"
};

export default function AnnouncementsPage() {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Duyurular</h2>
      </div>
      <div className="space-y-4">
        <div className="rounded-lg border p-4">
          <div className="flex items-center gap-2 mb-4">
            <div className="h-2 w-2 rounded-full bg-blue-500"></div>
            <h3 className="text-lg font-semibold">Duyuru Yönetimi</h3>
          </div>
          <p className="text-sm text-muted-foreground mb-4">
            Site duyurularını görüntüleyin, düzenleyin ve yönetin. Sadece yöneticiler ve site yöneticileri yeni duyuru oluşturabilir.
          </p>
          <AnnouncementList 
            currentUserId={MOCK_CURRENT_USER.id}
            currentUserRole={MOCK_CURRENT_USER.role}
          />
        </div>
      </div>
    </div>
  );
} 