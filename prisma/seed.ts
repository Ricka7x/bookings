import { PrismaClient } from '@prisma/client';
// import * as bcrypt from 'bcrypt';
// import { randEmail, randUserName } from '@ngneat/falso';

const prisma = new PrismaClient();

async function main() {
  console.log('Start seeding ... :seedling:');

  // await prisma.user.create({
  //   data: {
  //     email: 'ricky.ramirez89@gmail.com',
  //     password: bcrypt.hashSync(process.env.ADMIN_PASSWORD, 10),
  //     roles: ['ADMIN'],
  //     isEmailVerified: true,
  //   },
  // });

  // for (let i = 0; i < 30; i++) {
  //  const user = await prisma.user.upsert({
  //     where: { email: randEmail() },
  //     update: {},
  //     create: {
  //       email: randEmail(),
  //       password: bcrypt.hashSync('password1234', 10),
  //     },
  //   });
  // }
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
