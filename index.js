const { Router } = require("express");
const express = require("express");
const path = require("path");
const { db } = require("./src/config/db");
const { login, signup, protect } = require("./src/utils/auth");
const app = express();
const cors = require("cors");
const { json, urlencoded } = require("body-parser");
const {
  created,
  error,
  unauthorized,
  ok,
  conflict,
} = require("./src/utils/express-helper");
app.use(json());
app.use(urlencoded({ extended: true }));
app.use(cors());

const router = Router();
router.use(created, error, unauthorized, ok, conflict);
app.use(created, error, unauthorized, ok, conflict);

app.use("", protect);
const port = process.env.PORT || 5000;

const buildPath = path.join(__dirname, "./client/build");
app.use(express.static(buildPath));

app.get("/ping", async (req, res) => {
  const { dump } = req.query;

  if (dump == "true") {
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

  res.status(200).send("pong");
});
app.post("/api/login", login);
app.post("/api/signup", signup);

app.post("/api/buy", async (req, res) => {
  console.log("req.body", req.body);
  let { id: courseId, title, thumbnailURL, price, videoLink } = req.body;
  const { id, email } = req.user;
  const isOrderExist = await db.order.findFirst({
    where: {
      courseId: Number(courseId),
      userId: id,
    },
  });
  console.log("isOrderExist", isOrderExist);
  if (isOrderExist && Object.keys(isOrderExist).length) {
    return res.status(200).send({ msg: "Success", success: true });
  }

  const order = await db.order.create({
    data: {
      courseId: Number(courseId),
      userId: id,
    },
  });

  res.status(200).send({ msg: "Success", success: true });
});

app.get("/api/boughtcourses", async (req, res) => {
  //filter by current user
  console.log("req.user", req.user);
  const { id, email } = req.user;
  let orders = await db.order.findMany({
    where: {
      userId: id,
    },
    select: {
      courseId: true,
    },
  });

  const courseIds = orders.map((o) => o.courseId);
  const courses = await db.course.findMany({
    where: {
      id: {
        in: courseIds,
      },
    },
  });
  return res.status(200).send({ msg: "Success", data: courses, success: true });
});
app.get("/api/coursevideos", async (req, res) => {
  const { id: courseId } = req.query;
  const { id, email } = req.user;
  let order = await db.order.findMany({
    where: {
      userId: id,
      courseId: Number(courseId),
    },
  });
  console.log("order", order);
  if (!order.length) {
    return res.unauthorized();
  }

  const videos = await db.video.findMany({
    where: {
      courseId: Number(courseId),
    },
  });
  console.log("videos", videos);
  return res
    .status(200)
    .send({ success: true, data: videos, message: "Success" });
});

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

app.listen(port, () => {
  console.log(`Server is listning at http://localhost:${port}`);
});
