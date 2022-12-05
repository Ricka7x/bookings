import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  console.log('Start seeding ... :seedling:');

  await prisma.user.create({
    data: {
      email: 'ricky.ramirez89@gmail.com',
      password: bcrypt.hashSync(process.env.ADMIN_PASSWORD, 10),
      roles: ['ADMIN'],
      isEmailVerified: true,
    },
  });
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
