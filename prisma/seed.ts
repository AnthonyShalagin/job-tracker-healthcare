import { PrismaClient } from "@prisma/client";
import { COMPANIES } from "../src/lib/companies";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding companies...");

  for (const config of COMPANIES) {
    await prisma.company.upsert({
      where: { name: config.name },
      create: {
        name: config.name,
        website: config.website,
        careersUrl: config.careersUrl,
        atsType: config.atsType,
        atsBoardToken: config.atsBoardToken,
        category: config.category,
        glassdoorRating: config.glassdoorRating,
        glassdoorUrl: config.glassdoorUrl,
      },
      update: {
        careersUrl: config.careersUrl,
        atsType: config.atsType,
        atsBoardToken: config.atsBoardToken,
        category: config.category,
      },
    });
    console.log(`  Upserted: ${config.name}`);
  }

  console.log(`Done. ${COMPANIES.length} companies seeded.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
