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
    console.log(`User with email ${email} already exists. Aborting seed.`);
    return;
  }
  
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

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  }); 