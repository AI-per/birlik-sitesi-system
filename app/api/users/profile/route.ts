import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getCurrentUser } from "@/lib/session";
import bcrypt from "bcryptjs";

// GET /api/users/profile - Get current user profile
export async function GET() {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const profile = await db.user.findUnique({
      where: { id: user.id },
      select: {
        id: true,
        email: true,
        fullName: true,
        phone: true,
        role: true,
        isActive: true,
        createdAt: true,
        updatedAt: true,
        residingApartment: {
          include: {
            block: true
          }
        },
        ownedApartment: {
          include: {
            block: true
          }
        }
      }
    });

    if (!profile) {
      return NextResponse.json(
        { error: "Profil bulunamadı" },
        { status: 404 }
      );
    }

    // Transform to match expected frontend format (use residing apartment, fallback to owned)
    const apartment = profile.residingApartment || profile.ownedApartment;
    const responseProfile = {
      ...profile,
      apartment: apartment,
      // Remove the separate fields from response
      residingApartment: undefined,
      ownedApartment: undefined
    };

    return NextResponse.json(responseProfile);
  } catch (error) {
    console.error("Error fetching user profile:", error);
    return NextResponse.json(
      { error: "Profil yüklenirken hata oluştu" },
      { status: 500 }
    );
  }
}

// PUT /api/users/profile - Update user profile
export async function PUT(request: NextRequest) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const body = await request.json();
    const { fullName, phone, email, currentPassword, newPassword, confirmPassword } = body;

    // Validate required fields for profile update
    if (!fullName || !phone) {
      return NextResponse.json(
        { error: "Ad soyad ve telefon gereklidir" },
        { status: 400 }
      );
    }

    // Get current user from database
    const currentUser = await db.user.findUnique({
      where: { id: user.id }
    });

    if (!currentUser) {
      return NextResponse.json(
        { error: "Kullanıcı bulunamadı" },
        { status: 404 }
      );
    }

    // Prepare update data
    const updateData: any = {
      fullName: fullName.trim(),
      phone: phone.trim()
    };

    // Handle email change (only if provided and different)
    if (email && email !== currentUser.email) {
      // Check if email is already taken
      const existingUser = await db.user.findUnique({
        where: { email: email.toLowerCase() }
      });

      if (existingUser) {
        return NextResponse.json(
          { error: "Bu e-posta adresi zaten kullanılıyor" },
          { status: 400 }
        );
      }

      updateData.email = email.toLowerCase();
    }

    // Handle password change
    if (newPassword) {
      if (!currentPassword) {
        return NextResponse.json(
          { error: "Mevcut şifre gereklidir" },
          { status: 400 }
        );
      }

      if (newPassword !== confirmPassword) {
        return NextResponse.json(
          { error: "Yeni şifreler eşleşmiyor" },
          { status: 400 }
        );
      }

      if (newPassword.length < 6) {
        return NextResponse.json(
          { error: "Şifre en az 6 karakter olmalıdır" },
          { status: 400 }
        );
      }

      // Verify current password
      const isCurrentPasswordValid = await bcrypt.compare(currentPassword, currentUser.password);
      if (!isCurrentPasswordValid) {
        return NextResponse.json(
          { error: "Mevcut şifre yanlış" },
          { status: 400 }
        );
      }

      // Hash new password
      const hashedNewPassword = await bcrypt.hash(newPassword, 12);
      updateData.password = hashedNewPassword;
    }

    // Update user profile
    const updatedUser = await db.user.update({
      where: { id: user.id },
      data: updateData,
      select: {
        id: true,
        email: true,
        fullName: true,
        phone: true,
        role: true,
        isActive: true,
        updatedAt: true,
        residingApartment: {
          include: {
            block: true
          }
        },
        ownedApartment: {
          include: {
            block: true
          }
        }
      }
    });

    // Transform to match expected frontend format (use residing apartment, fallback to owned)
    const apartment = updatedUser.residingApartment || updatedUser.ownedApartment;
    const responseProfile = {
      ...updatedUser,
      apartment: apartment,
      // Remove the separate fields from response
      residingApartment: undefined,
      ownedApartment: undefined
    };

    return NextResponse.json({
      message: "Profil başarıyla güncellendi",
      user: responseProfile
    });
  } catch (error) {
    console.error("Error updating user profile:", error);
    return NextResponse.json(
      { error: "Profil güncellenirken hata oluştu" },
      { status: 500 }
    );
  }
} 