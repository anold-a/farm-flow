import 'dotenv/config';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient, Role } from '@prisma/client';
import * as bcrypt from 'bcryptjs';


const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
});
const prisma = new PrismaClient({adapter});

async function main() {
  const seedPassword = process.env.SEED_ADMIN_PASSWORD;

  if (!seedPassword) {
    throw new Error(
      'SEED_ADMIN_PASSWORD is not defined in environment variables',
    );
  }
  const password = await bcrypt.hash(
  seedPassword,
    12,
  );

  const admin = await prisma.user.upsert({
    where: {
      email: 'admin@smartseason.test',
    },

    update: {
      role: Role.ADMIN,
      password,
    },

    create: {
      fullName: 'SmartSeason Admin',
      email: 'admin@smartseason.test',
      password,
      role: Role.ADMIN,
    },
  });

  console.log('Admin account ready:');
  console.log({
    id: admin.id,
    fullName: admin.fullName,
    email: admin.email,
    role: admin.role,
  });
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
