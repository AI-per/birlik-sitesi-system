import { NextRequest, NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import { join } from "path";
import { existsSync } from "fs";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const files = formData.getAll("files") as File[];
    
    if (!files || files.length === 0) {
      return NextResponse.json(
        { error: "Dosya bulunamadı" },
        { status: 400 }
      );
    }

    const uploadedFiles = [];
    const uploadDir = join(process.cwd(), "public", "uploads", "announcements");

    // Upload klasörünü oluştur
    if (!existsSync(uploadDir)) {
      await mkdir(uploadDir, { recursive: true });
    }

    for (const file of files) {
      // Dosya boyutu kontrolü (10MB limit)
      if (file.size > 10 * 1024 * 1024) {
        return NextResponse.json(
          { error: `Dosya ${file.name} çok büyük. Maksimum 10MB olmalıdır.` },
          { status: 400 }
        );
      }

      // Dosya türü kontrolü
      const allowedTypes = [
        'image/jpeg', 'image/png', 'image/gif', 'image/webp',
        'video/mp4', 'video/webm', 'video/ogg',
        'application/pdf',
        'application/msword',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        'text/plain'
      ];

      if (!allowedTypes.includes(file.type)) {
        return NextResponse.json(
          { error: `Dosya türü ${file.type} desteklenmiyor.` },
          { status: 400 }
        );
      }

      // Benzersiz dosya adı oluştur
      const timestamp = Date.now();
      const randomString = Math.random().toString(36).substring(2, 15);
      const fileExtension = file.name.split('.').pop();
      const fileName = `${timestamp}_${randomString}.${fileExtension}`;
      const filePath = join(uploadDir, fileName);

      // Dosyayı kaydet
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);
      await writeFile(filePath, buffer);

      uploadedFiles.push({
        originalName: file.name,
        fileName: fileName,
        filePath: `/uploads/announcements/${fileName}`,
        fileSize: file.size,
        fileType: file.type,
      });
    }

    return NextResponse.json({
      message: "Dosyalar başarıyla yüklendi",
      files: uploadedFiles,
    });
  } catch (error) {
    console.error("File upload error:", error);
    return NextResponse.json(
      { error: "Dosya yüklenirken hata oluştu" },
      { status: 500 }
    );
  }
} 