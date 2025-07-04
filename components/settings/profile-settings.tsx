"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Icons } from "@/components/icons";
import { useToast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";

interface UserProfile {
  id: string;
  email: string | null;
  fullName: string;
  phone: string;
  role: string;
  isActive: boolean;
  apartment: {
    id: string;
    number: string;
    floor: number;
    block: {
      name: string;
    };
  } | null;
}

export function ProfileSettings() {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  
  const [profileForm, setProfileForm] = useState({
    fullName: "",
    email: "",
    phone: ""
  });

  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
  });

  const { toast } = useToast();

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const response = await fetch("/api/users/profile");
      if (response.ok) {
        const data = await response.json();
        setProfile(data);
        setProfileForm({
          fullName: data.fullName,
          email: data.email || "",
          phone: data.phone
        });
      } else {
        throw new Error("Profil yüklenemedi");
      }
    } catch (error) {
      console.error("Error fetching profile:", error);
      toast({
        title: "Hata",
        description: "Profil bilgileri yüklenirken hata oluştu.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleProfileUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    try {
      const response = await fetch("/api/users/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(profileForm),
      });

      const data = await response.json();

      if (response.ok) {
        setProfile(data.user);
        toast({
          title: "Başarılı",
          description: "Profil bilgileriniz güncellendi.",
        });
      } else {
        throw new Error(data.error || "Güncelleme başarısız");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      toast({
        title: "Hata",
        description: error instanceof Error ? error.message : "Profil güncellenirken hata oluştu.",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsChangingPassword(true);

    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      toast({
        title: "Hata",
        description: "Yeni şifreler eşleşmiyor.",
        variant: "destructive",
      });
      setIsChangingPassword(false);
      return;
    }

    try {
      const response = await fetch("/api/users/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...profileForm,
          ...passwordForm
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setPasswordForm({
          currentPassword: "",
          newPassword: "",
          confirmPassword: ""
        });
        toast({
          title: "Başarılı",
          description: "Şifreniz başarıyla değiştirildi.",
        });
      } else {
        throw new Error(data.error || "Şifre değiştirme başarısız");
      }
    } catch (error) {
      console.error("Error changing password:", error);
      toast({
        title: "Hata",
        description: error instanceof Error ? error.message : "Şifre değiştirilirken hata oluştu.",
        variant: "destructive",
      });
    } finally {
      setIsChangingPassword(false);
    }
  };

  const getRoleName = (role: string) => {
    switch (role) {
      case "RESIDENT": return "Konut Sakini";
      case "LANDLORD": return "Daire Sahibi";
      case "MANAGER": return "Yönetici";
      case "ADMIN": return "Admin";
      default: return role;
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <Icons.spinner className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="text-center p-8">
        <p className="text-muted-foreground">Profil bilgileri yüklenemedi.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* User Info Card */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Icons.user className="h-5 w-5" />
            Kullanıcı Bilgileri
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <Label className="text-sm font-medium text-muted-foreground">Rol</Label>
              <div className="mt-1">
                <Badge variant="outline">{getRoleName(profile.role)}</Badge>
              </div>
            </div>
            
            <div>
              <Label className="text-sm font-medium text-muted-foreground">Durum</Label>
              <div className="mt-1">
                <Badge variant={profile.isActive ? "default" : "destructive"}>
                  {profile.isActive ? "Aktif" : "Pasif"}
                </Badge>
              </div>
            </div>

            {profile.apartment && (
              <>
                <div>
                  <Label className="text-sm font-medium text-muted-foreground">Blok</Label>
                  <p className="font-medium">{profile.apartment.block.name}</p>
                </div>
                
                <div>
                  <Label className="text-sm font-medium text-muted-foreground">Daire</Label>
                  <p className="font-medium">
                    {profile.apartment.number} (Kat: {profile.apartment.floor})
                  </p>
                </div>
              </>
            )}
          </div>

          {!profile.apartment && (
            <div className="bg-muted/50 p-3 rounded-lg">
              <p className="text-sm text-muted-foreground">
                Henüz bir daireye atanmamışsınız. Site yöneticisi ile iletişime geçin.
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Profile Update Form */}
      <Card>
        <CardHeader>
          <CardTitle>Profil Bilgilerini Güncelle</CardTitle>
          {(profile.role === 'RESIDENT' || profile.role === 'LANDLORD') && (
            <div className="bg-orange-50 border border-orange-200 p-3 rounded-lg mt-2">
              <div className="flex items-start gap-2">
                <Icons.alertTriangle className="h-4 w-4 text-orange-600 mt-0.5 flex-shrink-0" />
                <p className="text-sm text-orange-800">
                  <strong>Bilgi:</strong> Kişisel bilgilerinizi güncellemek için lütfen site yönetimi ile iletişime geçin.
                </p>
              </div>
            </div>
          )}
        </CardHeader>
        <CardContent>
          <form onSubmit={handleProfileUpdate} className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="fullName">Ad Soyad *</Label>
                <Input
                  id="fullName"
                  value={profileForm.fullName}
                  onChange={(e) => setProfileForm(prev => ({ ...prev, fullName: e.target.value }))}
                  required
                  disabled={isSaving || profile.role === 'RESIDENT' || profile.role === 'LANDLORD'}
                  className={profile.role === 'RESIDENT' || profile.role === 'LANDLORD' ? "bg-muted" : ""}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Telefon *</Label>
                <Input
                  id="phone"
                  type="tel"
                  value={profileForm.phone}
                  onChange={(e) => setProfileForm(prev => ({ ...prev, phone: e.target.value }))}
                  required
                  disabled={isSaving || profile.role === 'RESIDENT' || profile.role === 'LANDLORD'}
                  className={profile.role === 'RESIDENT' || profile.role === 'LANDLORD' ? "bg-muted" : ""}
                />
              </div>

              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="email">E-posta</Label>
                <Input
                  id="email"
                  type="email"
                  value={profileForm.email}
                  onChange={(e) => setProfileForm(prev => ({ ...prev, email: e.target.value }))}
                  disabled={isSaving || profile.role === 'RESIDENT' || profile.role === 'LANDLORD'}
                  placeholder="E-posta adresiniz (isteğe bağlı)"
                  className={profile.role === 'RESIDENT' || profile.role === 'LANDLORD' ? "bg-muted" : ""}
                />
              </div>
            </div>

            {!(profile.role === 'RESIDENT' || profile.role === 'LANDLORD') && (
              <Button type="submit" disabled={isSaving}>
                {isSaving ? (
                  <>
                    <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                    Güncelleniyor...
                  </>
                ) : (
                  "Profili Güncelle"
                )}
              </Button>
            )}
          </form>
        </CardContent>
      </Card>

      {/* Password Change Form */}
      <Card>
        <CardHeader>
          <CardTitle>Şifre Değiştir</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handlePasswordChange} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="currentPassword">Mevcut Şifre *</Label>
              <Input
                id="currentPassword"
                type="password"
                value={passwordForm.currentPassword}
                onChange={(e) => setPasswordForm(prev => ({ ...prev, currentPassword: e.target.value }))}
                required
                disabled={isChangingPassword}
              />
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="newPassword">Yeni Şifre *</Label>
                <Input
                  id="newPassword"
                  type="password"
                  value={passwordForm.newPassword}
                  onChange={(e) => setPasswordForm(prev => ({ ...prev, newPassword: e.target.value }))}
                  required
                  minLength={6}
                  disabled={isChangingPassword}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Yeni Şifre Tekrar *</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  value={passwordForm.confirmPassword}
                  onChange={(e) => setPasswordForm(prev => ({ ...prev, confirmPassword: e.target.value }))}
                  required
                  minLength={6}
                  disabled={isChangingPassword}
                />
              </div>
            </div>

            <div className="bg-muted/50 p-3 rounded-lg">
              <p className="text-sm text-muted-foreground">
                <strong>Şifre gereksinimleri:</strong>
                <br />• En az 6 karakter uzunluğunda olmalıdır
                <br />• Güçlü bir şifre için büyük/küçük harf, sayı ve özel karakter kullanın
              </p>
            </div>

            <Button 
              type="submit" 
              disabled={isChangingPassword || !passwordForm.currentPassword || !passwordForm.newPassword}
              variant="destructive"
            >
              {isChangingPassword ? (
                <>
                  <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                  Değiştiriliyor...
                </>
              ) : (
                "Şifreyi Değiştir"
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
} 