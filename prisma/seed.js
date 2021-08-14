const { db } = require("../src/config/db");

async function main() {
  const courses = [
    {
      id: "1",
      title: "DataStructures",
      thumbnailURL:
        "https://s3-ap-southeast-1.amazonaws.com/he-public-data/index6f535cc.jpeg",
      price: "999",
      videoLink: [
        "https://youtu.be/RBSGKlAvoiM",
        "https://youtu.be/zg9ih6SVACc",
      ],
    },
    {
      id: "2",
      title: "Algorithms",
      thumbnailURL:
        "https://s3-ap-southeast-1.amazonaws.com/he-public-data/algofeadb8b.jpeg",
      price: "999",
      videoLink: [
        "https://youtu.be/0JUN9aDxVmI",
        "https://youtu.be/3_o0-zPRQqw",
      ],
    },
    {
      id: "3",
      title: "Digital Marketing",
      thumbnailURL:
        "https://s3-ap-southeast-1.amazonaws.com/he-public-data/dm1986125.png",
      price: "499",
      videoLink: ["https://youtu.be/nU-IIXBWlS4"],
    },
    {
      id: "4",
      title: "SEO",
      thumbnailURL:
        "https://s3-ap-southeast-1.amazonaws.com/he-public-data/seo41a0f56.png",
      price: "499",
      videoLink: ["https://youtu.be/OYRkIGaP80M"],
    },
    {
      id: "5",
      title: "Social Media Marketing",
      thumbnailURL:
        "https://s3-ap-southeast-1.amazonaws.com/he-public-data/smm639744e.png",
      price: "499",
      videoLink: ["https://youtu.be/q5ASe_sxRYI"],
    },
    {
      id: "6",
      title: "Sales",
      thumbnailURL:
        "https://s3-ap-southeast-1.amazonaws.com/he-public-data/sales87feef5.jpeg",
      price: "9999",
      videoLink: [
        "https://youtu.be/5mJkKGqj-rU",
        "https://youtu.be/PwwgGOBw1oE",
        "https://youtu.be/MCpi7xZz8bg",
        "https://youtu.be/k060uGd5TH4",
        "https://youtu.be/1AXeGQ3yYPA",
        "https://youtu.be/BaDGqm4rEzY",
      ],
    },
    {
      id: "7",
      title: "Copywriting",
      thumbnailURL:
        "https://s3-ap-southeast-1.amazonaws.com/he-public-data/copyaaf50e4.png",
      price: "299",
      videoLink: ["https://youtu.be/9qZcT9I8W4g"],
    },
    {
      id: "8",
      title: "MERN Stack",
      thumbnailURL:
        "https://s3-ap-southeast-1.amazonaws.com/he-public-data/merne99004a.jpeg",
      price: "4999",
      videoLink: ["https://youtu.be/ktjafK4SgWM"],
    },
    {
      id: "9",
      title: "MEAN Stack",
      thumbnailURL:
        "https://s3-ap-southeast-1.amazonaws.com/he-public-data/Mean0687f08.jpeg",
      price: "4999",
      videoLink: ["https://youtu.be/k0iGvadr_Cc"],
    },
  ];
  for (let c of courses) {
    await db.course.create({
      data: {
        id: Number(c.id),
        price: Number(c.price),
        thumbnailURL: c.thumbnailURL,
        title: c.title,
        videos: {
          createMany: {
            data: c.videoLink.map((v) => {
              return { url: v };
            }),
          },
        },
      },
    });
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
