"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Icons } from "@/components/icons";
import { toast } from "sonner";

interface ImportResult {
  success: number;
  failed: number;
  errors: string[];
}

export default function BulkImportPage() {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [importResults, setImportResults] = useState<ImportResult | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>, type: 'users' | 'apartments') => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file type
    const allowedTypes = [
      'text/csv',
      'application/vnd.ms-excel',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    ];

    if (!allowedTypes.includes(file.type)) {
      toast.error("Sadece CSV ve Excel dosyaları desteklenmektedir");
      return;
    }

    setSelectedFile(file);
    toast.success(`${file.name} dosyası seçildi`);
  };

  const handleUpload = async (type: 'users' | 'apartments') => {
    if (!selectedFile) {
      toast.error("Lütfen bir dosya seçin");
      return;
    }

    setIsUploading(true);
    setUploadProgress(0);
    setImportResults(null);

    try {
      const formData = new FormData();
      formData.append('file', selectedFile);
      formData.append('type', type);

      // Simulate progress
      const progressInterval = setInterval(() => {
        setUploadProgress(prev => {
          if (prev >= 90) {
            clearInterval(progressInterval);
            return 90;
          }
          return prev + 10;
        });
      }, 200);

      const response = await fetch('/api/bulk-import', {
        method: 'POST',
        body: formData,
      });

      clearInterval(progressInterval);
      setUploadProgress(100);

      const result = await response.json();

      if (response.ok) {
        setImportResults(result);
        if (result.failed === 0) {
          toast.success(`${result.success} ${type === 'users' ? 'kullanıcı' : 'daire'} başarıyla eklendi`);
        } else {
          toast.warning(`${result.success} başarılı, ${result.failed} başarısız`);
        }
      } else {
        toast.error(result.error || "İçe aktarım sırasında hata oluştu");
      }
    } catch (error) {
      console.error('Upload error:', error);
      toast.error("Dosya yüklenirken hata oluştu");
    } finally {
      setIsUploading(false);
      setUploadProgress(0);
      setSelectedFile(null);
      // Reset file input
      const fileInputs = document.querySelectorAll('input[type="file"]');
      fileInputs.forEach(input => (input as HTMLInputElement).value = '');
    }
  };

  const downloadTemplate = (type: 'users' | 'apartments') => {
    const link = document.createElement('a');
    link.href = `/api/bulk-import/template?type=${type}`;
    link.download = `${type}-sablon.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Toplu İçe Aktarım</h2>
          <p className="text-muted-foreground">
            CSV veya Excel dosyalarından toplu kullanıcı ve daire ekleyin
          </p>
        </div>
      </div>

      <Tabs defaultValue="users" className="space-y-4">
        <TabsList>
          <TabsTrigger value="users">Kullanıcılar</TabsTrigger>
          <TabsTrigger value="apartments">Daireler</TabsTrigger>
        </TabsList>

        <TabsContent value="users" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Kullanıcı Toplu İçe Aktarımı</CardTitle>
              <CardDescription>
                CSV veya Excel dosyasından çoklu kullanıcı ekleyin
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-4 border rounded-lg bg-muted/50">
                <div className="flex items-center gap-3">
                  <Icons.download className="h-5 w-5 text-blue-500" />
                  <div>
                    <p className="font-medium">Şablon Dosyayı İndir</p>
                    <p className="text-sm text-muted-foreground">
                      Doğru format için önce şablon dosyayı indirin
                    </p>
                  </div>
                </div>
                <Button 
                  variant="outline" 
                  onClick={() => downloadTemplate('users')}
                >
                  <Icons.download className="h-4 w-4 mr-2" />
                  Şablon İndir
                </Button>
              </div>

              <div className="space-y-2">
                <Label htmlFor="users-file">Dosya Seç (CSV, XLS, XLSX)</Label>
                <Input
                  id="users-file"
                  type="file"
                  accept=".csv,.xls,.xlsx"
                  onChange={(e) => handleFileSelect(e, 'users')}
                  disabled={isUploading}
                />
              </div>

              {isUploading && (
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">İçe aktarılıyor...</span>
                    <span className="text-sm">{uploadProgress}%</span>
                  </div>
                  <Progress value={uploadProgress} />
                </div>
              )}

              <Button 
                onClick={() => handleUpload('users')}
                disabled={!selectedFile || isUploading}
                className="w-full"
              >
                {isUploading ? (
                  <>
                    <Icons.spinner className="h-4 w-4 mr-2 animate-spin" />
                    İçe Aktarılıyor...
                  </>
                ) : (
                  <>
                    <Icons.upload className="h-4 w-4 mr-2" />
                    Kullanıcıları İçe Aktar
                  </>
                )}
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="apartments" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Daire Toplu İçe Aktarımı</CardTitle>
              <CardDescription>
                CSV veya Excel dosyasından çoklu daire ekleyin
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-4 border rounded-lg bg-muted/50">
                <div className="flex items-center gap-3">
                  <Icons.download className="h-5 w-5 text-blue-500" />
                  <div>
                    <p className="font-medium">Şablon Dosyayı İndir</p>
                    <p className="text-sm text-muted-foreground">
                      Doğru format için önce şablon dosyayı indirin
                    </p>
                  </div>
                </div>
                <Button 
                  variant="outline" 
                  onClick={() => downloadTemplate('apartments')}
                >
                  <Icons.download className="h-4 w-4 mr-2" />
                  Şablon İndir
                </Button>
              </div>

              <div className="space-y-2">
                <Label htmlFor="apartments-file">Dosya Seç (CSV, XLS, XLSX)</Label>
                <Input
                  id="apartments-file"
                  type="file"
                  accept=".csv,.xls,.xlsx"
                  onChange={(e) => handleFileSelect(e, 'apartments')}
                  disabled={isUploading}
                />
              </div>

              {isUploading && (
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">İçe aktarılıyor...</span>
                    <span className="text-sm">{uploadProgress}%</span>
                  </div>
                  <Progress value={uploadProgress} />
                </div>
              )}

              <Button 
                onClick={() => handleUpload('apartments')}
                disabled={!selectedFile || isUploading}
                className="w-full"
              >
                {isUploading ? (
                  <>
                    <Icons.spinner className="h-4 w-4 mr-2 animate-spin" />
                    İçe Aktarılıyor...
                  </>
                ) : (
                  <>
                    <Icons.upload className="h-4 w-4 mr-2" />
                    Daireleri İçe Aktar
                  </>
                )}
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {importResults && (
        <Card>
          <CardHeader>
            <CardTitle>İçe Aktarım Sonuçları</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-4">
              <Badge variant="default" className="bg-green-100 text-green-800">
                {importResults.success} Başarılı
              </Badge>
              {importResults.failed > 0 && (
                <Badge variant="destructive">
                  {importResults.failed} Başarısız
                </Badge>
              )}
            </div>

            {importResults.errors.length > 0 && (
              <Alert>
                <Icons.alertTriangle className="h-4 w-4" />
                <AlertDescription>
                  <strong>Hatalar:</strong>
                  <ul className="mt-2 list-disc list-inside space-y-1">
                    {importResults.errors.map((error, index) => (
                      <li key={index} className="text-sm">{error}</li>
                    ))}
                  </ul>
                </AlertDescription>
              </Alert>
            )}
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Kullanım Talimatları</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <h4 className="font-medium mb-2">Kullanıcı İçe Aktarımı</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Şablon dosyayı indirin</li>
                <li>• Gerekli alanları doldurun: Ad Soyad, Telefon</li>
                <li>• E-posta opsiyoneldir</li>
                <li>• Rol: RESIDENT, LANDLORD, MANAGER, ADMIN</li>
                <li>• Daire ID (opsiyonel)</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-2">Daire İçe Aktarımı</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Şablon dosyayı indirin</li>
                <li>• Gerekli alanlar: Daire No, Kat, Blok Adı</li>
                <li>• Tip ve Metrekare opsiyoneldir</li>
                <li>• Blok mevcut değilse otomatik oluşturulur</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 