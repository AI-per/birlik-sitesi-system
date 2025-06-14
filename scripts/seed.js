const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');

const prisma = new PrismaClient();

async function main() {
  const email = 'alper@sayginel.com';
  const username = 'alper';
  const password = 'alper123';
  
  console.log(`Checking for existing user with email: ${email}...`);
  const existingUser = await prisma.user.findUnique({
    where: { email },
  });

  if (existingUser) {
    console.log(`User with email ${email} already exists. Skipping user creation.`);
  } else {
    console.log('Hashing password...');
    const hashedPassword = await bcrypt.hash(password, 12);
    
    console.log('Creating user...');
    const user = await prisma.user.create({
      data: {
        email: email,
        password: hashedPassword,
        fullName: username,
        role: 'ADMIN', // Enum yerine doğrudan string olarak
      },
    });
    
    console.log(`Successfully created user: ${user.fullName} with email: ${user.email}`);
  }

  // Test blokları oluştur
  const blocks = [
    { name: 'A Blok' },
    { name: 'B Blok' },
    { name: 'C Blok' },
  ];

  for (const blockData of blocks) {
    const existingBlock = await prisma.block.findUnique({
      where: { name: blockData.name },
    });

    if (existingBlock) {
      console.log(`Block ${blockData.name} already exists. Skipping.`);
      continue;
    }

    const block = await prisma.block.create({
      data: blockData,
    });
    console.log('Successfully created block:', block.name);

    // Her blok için birkaç daire oluştur
    const apartments = [
      { number: '1', floor: 1, type: '2+1' },
      { number: '2', floor: 1, type: '3+1' },
      { number: '3', floor: 2, type: '2+1' },
      { number: '4', floor: 2, type: '3+1' },
      { number: '5', floor: 3, type: '2+1' },
    ];

    for (const aptData of apartments) {
      await prisma.apartment.create({
        data: {
          ...aptData,
          blockId: block.id,
        },
      });
    }
    console.log('Successfully created apartments for block:', block.name);
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  }); 