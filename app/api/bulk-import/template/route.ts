import { NextRequest, NextResponse } from "next/server";

// Template data for users
const usersTemplate = `Ad Soyad,E-posta,Telefon,Rol,Daire ID
Ahmet Yılmaz,ahmet@example.com,05551234567,RESIDENT,
Fatma Kaya,,05559876543,LANDLORD,
Mehmet Öz,mehmet@example.com,05555555555,MANAGER,`;

// Template data for apartments
const apartmentsTemplate = `Daire No,Kat,Blok Adı,Tip,Metrekare
1,1,A Blok,2+1,85
2,1,A Blok,3+1,120
3,2,A Blok,1+1,65
1,1,B Blok,2+1,90`;

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const type = searchParams.get('type');
  
  if (!type || !['users', 'apartments'].includes(type)) {
    return NextResponse.json(
      { error: "Geçersiz şablon türü" },
      { status: 400 }
    );
  }
  
  let content: string;
  let filename: string;
  
  if (type === 'users') {
    content = usersTemplate;
    filename = 'kullanicilar-sablon.csv';
  } else {
    content = apartmentsTemplate;
    filename = 'daireler-sablon.csv';
  }
  
  // Convert to proper CSV with BOM for Turkish characters
  const csvContent = '\uFEFF' + content;
  
  return new NextResponse(csvContent, {
    headers: {
      'Content-Type': 'text/csv; charset=utf-8',
      'Content-Disposition': `attachment; filename="${filename}"`,
    },
  });
} 