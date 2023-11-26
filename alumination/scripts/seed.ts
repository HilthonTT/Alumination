const { PrismaClient } = require("@prisma/client");

const db = new PrismaClient();

async function main() {
  try {
    await db.category.createMany({
      data: [
        {
          name: "Rock",
        },
        {
          name: "Jazz",
        },
        {
          name: "Classical",
        },
        {
          name: "Hip Hop",
        },
        {
          name: "Pop",
        },
        {
          name: "Country",
        },
        {
          name: "Blues",
        },
        {
          name: "Electronic",
        },
        {
          name: "R&B",
        },
        {
          name: "Reggae",
        },
        {
          name: "House",
        },
      ],
    });
  } catch (error) {
    console.log("Error seeding default categories", error);
  } finally {
    await db.$disconnect();
  }
}

main();
