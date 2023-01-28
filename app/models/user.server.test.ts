import bcrypt from "bcryptjs";
import { createUser } from "~/models/user.server";
import prisma from "~/__mocks__/db.server";

vi.mock("~/db.server");

test("createUser should return the generated user", async () => {
  const id = "newId";
  const email = "user@prisma.io";
  const password = "supersecure";
  const hashedPassword = bcrypt.hash(password, 10);
  const timestamp: Date = new Date(Date.now());
  prisma.user.create.mockResolvedValue({
    id,
    email,
    createdAt: timestamp,
    updatedAt: timestamp
  });

  const user = await createUser(email, password);

  expect(user.email).toEqual(email);
});