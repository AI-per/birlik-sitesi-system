import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { formatDate } from "@/lib/utils";

// Helper function to parse CSV data
function parseCSV(text: string): string[][] {
  const lines = text.trim().split('\n');
  return lines.map(line => {
    const values = [];
    let current = '';
    let inQuotes = false;
    
    for (let i = 0; i < line.length; i++) {
      const char = line[i];
      
      if (char === '"') {
        inQuotes = !inQuotes;
      } else if (char === ',' && !inQuotes) {
        values.push(current.trim());
        current = '';
      } else {
        current += char;
      }
    }
    
    values.push(current.trim());
    return values;
  });
}

// Validate and process user data
async function processUserImport(data: string[][]): Promise<{ success: number; failed: number; errors: string[] }> {
  let success = 0;
  let failed = 0;
  const errors: string[] = [];
  
  // Skip header row
  const rows = data.slice(1);
  
  for (let i = 0; i < rows.length; i++) {
    const row = rows[i];
    const rowIndex = i + 2; // +2 because we start from row 2 (header is row 1)
    
    try {
      // Expected columns: fullName, email, phone, role, apartmentId
      const [fullName, email, phone, role, apartmentId] = row.map(cell => cell?.trim());
      
      // Validate required fields
      if (!fullName) {
        errors.push(`Satır ${rowIndex}: Ad Soyad gereklidir`);
        failed++;
        continue;
      }
      
      if (!phone) {
        errors.push(`Satır ${rowIndex}: Telefon numarası gereklidir`);
        failed++;
        continue;
      }
      
      // Validate role
      const validRoles = ['RESIDENT', 'LANDLORD', 'MANAGER', 'ADMIN'];
      const userRole = role?.toUpperCase() || 'RESIDENT';
      if (!validRoles.includes(userRole)) {
        errors.push(`Satır ${rowIndex}: Geçersiz rol: ${role}. Geçerli roller: ${validRoles.join(', ')}`);
        failed++;
        continue;
      }
      
      // Check if email already exists (if provided)
      if (email) {
        const existingUser = await db.user.findUnique({
          where: { email },
        });
        
        if (existingUser) {
          errors.push(`Satır ${rowIndex}: Bu e-posta adresi zaten kullanımda: ${email}`);
          failed++;
          continue;
        }
      }
      
      // Check if apartment exists (if provided)
      let apartmentExists = false;
      if (apartmentId) {
        const apartment = await db.apartment.findUnique({
          where: { id: apartmentId },
        });
        apartmentExists = !!apartment;
        
        if (!apartmentExists) {
          errors.push(`Satır ${rowIndex}: Belirtilen daire bulunamadı: ${apartmentId}`);
        }
      }
      
      // Create user with default password (they should change it on first login)
      await db.user.create({
        data: {
          fullName,
          email: email || null,
          phone,
          password: "123456", // Default password for bulk imported users
          role: userRole as any,
          apartmentId: (apartmentId && apartmentExists) ? apartmentId : null,
        },
      });
      
      success++;
    } catch (error) {
      console.error(`Error processing user row ${rowIndex}:`, error);
      errors.push(`Satır ${rowIndex}: İşlenirken hata oluştu`);
      failed++;
    }
  }
  
  return { success, failed, errors };
}

// Validate and process apartment data
async function processApartmentImport(data: string[][]): Promise<{ success: number; failed: number; errors: string[] }> {
  let success = 0;
  let failed = 0;
  const errors: string[] = [];
  
  // Skip header row
  const rows = data.slice(1);
  
  for (let i = 0; i < rows.length; i++) {
    const row = rows[i];
    const rowIndex = i + 2; // +2 because we start from row 2 (header is row 1)
    
    try {
      // Expected columns: number, floor, blockName, type, squareMeters
      const [number, floor, blockName, type, squareMeters] = row.map(cell => cell?.trim());
      
      // Validate required fields
      if (!number) {
        errors.push(`Satır ${rowIndex}: Daire numarası gereklidir`);
        failed++;
        continue;
      }
      
      if (!floor) {
        errors.push(`Satır ${rowIndex}: Kat bilgisi gereklidir`);
        failed++;
        continue;
      }
      
      if (!blockName) {
        errors.push(`Satır ${rowIndex}: Blok adı gereklidir`);
        failed++;
        continue;
      }
      
      // Validate floor number
      const floorNum = parseInt(floor);
      if (isNaN(floorNum) || floorNum < 0) {
        errors.push(`Satır ${rowIndex}: Kat numarası geçerli bir sayı olmalıdır`);
        failed++;
        continue;
      }
      
      // Find or create block
      let block = await db.block.findFirst({
        where: { name: blockName },
      });
      
      if (!block) {
        block = await db.block.create({
          data: { name: blockName },
        });
      }
      
      // Check if apartment already exists
      const existingApartment = await db.apartment.findFirst({
        where: {
          blockId: block.id,
          number: number,
        },
      });
      
      if (existingApartment) {
        errors.push(`Satır ${rowIndex}: Bu blokta aynı numaralı daire zaten mevcut: ${blockName} - ${number}`);
        failed++;
        continue;
      }
      
      // Parse square meters if provided
      let squareMetersNum = null;
      if (squareMeters) {
        squareMetersNum = parseInt(squareMeters);
        if (isNaN(squareMetersNum) || squareMetersNum <= 0) {
          errors.push(`Satır ${rowIndex}: Metrekare geçerli bir sayı olmalıdır`);
          failed++;
          continue;
        }
      }
      
      // Create apartment
      await db.apartment.create({
        data: {
          number,
          floor: floorNum,
          blockId: block.id,
          type: type || null,
          squareMeters: squareMetersNum,
        },
      });
      
      success++;
    } catch (error) {
      console.error(`Error processing apartment row ${rowIndex}:`, error);
      errors.push(`Satır ${rowIndex}: İşlenirken hata oluştu`);
      failed++;
    }
  }
  
  return { success, failed, errors };
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;
    const type = formData.get('type') as string;
    
    if (!file) {
      return NextResponse.json(
        { error: "Dosya seçilmedi" },
        { status: 400 }
      );
    }
    
    if (!type || !['users', 'apartments'].includes(type)) {
      return NextResponse.json(
        { error: "Geçersiz import türü" },
        { status: 400 }
      );
    }
    
    // Read file content
    const content = await file.text();
    
    // Parse CSV data
    const data = parseCSV(content);
    
    if (data.length < 2) {
      return NextResponse.json(
        { error: "Dosyada veri bulunamadı veya başlık satırı eksik" },
        { status: 400 }
      );
    }
    
    // Process import based on type
    let result;
    if (type === 'users') {
      result = await processUserImport(data);
    } else {
      result = await processApartmentImport(data);
    }
    
    return NextResponse.json(result);
  } catch (error) {
    console.error("Bulk import error:", error);
    return NextResponse.json(
      { error: "İçe aktarım sırasında hata oluştu" },
      { status: 500 }
    );
  }
} 