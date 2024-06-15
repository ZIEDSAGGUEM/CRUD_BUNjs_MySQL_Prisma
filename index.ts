import { Elysia } from "elysia";
import { PrismaClient } from "@prisma/client";

interface Post {
  id?: number;
  title: string;
  path: string;
  content: string;
}

const prisma = new PrismaClient({ log: ["info", "warn", "error"] });

const app = new Elysia().decorate("db", prisma);

app.get("/posts", async ({ db }) => {
  return db.post.findMany();
});

app.get("/posts/:id", async ({ db, params }) => {
  return db.post.findUnique({
    where: {
      id: Number(params.id),
    },
  });
});

app.get("/posts/path/:path", async ({ db, params }) => {
  return db.post.findUnique({
    where: {
      path: String(params.path),
    },
  });
});

app.post("/posts", async ({ db, body }) => {
  return db.post.create({
    data: body as Post,
  });
});

app.put("/posts/:id", async ({ db, params, body }) => {
  return db.post.update({
    where: {
      id: Number(params.id),
    },
    data: body as Post,
  });
});

app.delete("/posts/:id", async ({ db, params }) => {
  return db.post.delete({
    where: {
      id: Number(params.id),
    },
  });
});

app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});
