import zod from "zod";

const createUserSchema = zod.object({
  email: zod.string().email({ message: "Invalid email" }),
  username: zod.string().min(3, { message: "Too short" }),
  name: zod.string().min(3, { message: "Too short" }),
  password: zod.string().min(8, { message: "Too short" }),
});

export { createUserSchema };