"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Icons } from "@/components/icons";
import { useToast } from "@/hooks/use-toast";

export function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    subject: "",
    message: ""
  });
  const [currentUser, setCurrentUser] = useState<{ id: string; fullName: string } | null>(null);
  
  const { toast } = useToast();

  useEffect(() => {
    fetchCurrentUser();
  }, []);

  const fetchCurrentUser = async () => {
    try {
      const response = await fetch('/api/users/profile');
      if (response.ok) {
        const userData = await response.json();
        setCurrentUser({ id: userData.id, fullName: userData.fullName });
      }
    } catch (error) {
      console.error('Error fetching current user:', error);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.subject.trim() || !formData.message.trim()) {
      toast({
        title: "Hata",
        description: "Lütfen konu ve mesaj alanlarını doldurun.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        toast({
          title: "Başarılı",
          description: "Mesajınız başarıyla gönderildi. En kısa sürede size dönüş yapılacaktır.",
        });
        
        // Reset form
        setFormData({
          subject: "",
          message: ""
        });
      } else {
        const errorData = await response.json();
        throw new Error(errorData.error || "Mesaj gönderilemedi");
      }
    } catch (error) {
      console.error("Error sending message:", error);
      toast({
        title: "Hata",
        description: error instanceof Error ? error.message : "Mesaj gönderilirken bir hata oluştu.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Icons.message className="h-5 w-5" />
          Yönetime Mesaj Gönder
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Sorularınız, talepleriniz veya önerileriniz için aşağıdaki formu kullanabilirsiniz.
        </p>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid gap-4">
            <div className="space-y-2">
              <Label htmlFor="subject">Konu *</Label>
              <Input
                id="subject"
                name="subject"
                placeholder="Örn: Aidat ödemesi hakkında soru"
                value={formData.subject}
                onChange={handleInputChange}
                required
                disabled={isSubmitting}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="message">Mesajınız *</Label>
              <Textarea
                id="message"
                name="message"
                placeholder="Mesajınızı buraya yazın..."
                rows={6}
                value={formData.message}
                onChange={handleInputChange}
                required
                disabled={isSubmitting}
                className="resize-none"
              />
            </div>

            <div className="bg-muted/50 p-3 rounded-lg">
              <div className="text-sm text-muted-foreground">
                <p className="font-medium mb-1">📝 İpucu:</p>
                <ul className="space-y-1 text-xs">
                  <li>• Mesajınızı net ve anlaşılır bir şekilde yazın</li>
                  <li>• Varsa daire numaranızı belirtin</li>
                  <li>• Acil durumlar için telefon ile iletişime geçin</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="text-xs text-muted-foreground">
              Gönderen: <span className="font-medium">{currentUser?.fullName || 'Yükleniyor...'}</span>
            </div>
            <Button 
              type="submit" 
              disabled={isSubmitting || !formData.subject.trim() || !formData.message.trim()}
              className="min-w-[120px]"
            >
              {isSubmitting ? (
                <>
                  <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                  Gönderiliyor...
                </>
              ) : (
                <>
                  <Icons.send className="mr-2 h-4 w-4" />
                  Gönder
                </>
              )}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
} 