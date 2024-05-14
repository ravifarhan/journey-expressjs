import db from "../db";
import { registerValidataion } from "../lib/validation/register";
import { IRegister } from "../type/app";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const getUsers = async () => {
  return await db.users.findMany({
    select: {
      id: true,
      fullname: true,
      email: true,
      phone: true,
      password: true,
    },

  });
};

export const findUser = async (id: number) => {
  return await db.users.findFirst({
    where: {
      id,
    },
  });
};

export const register = async (payload: IRegister) => {
  const { error, value } = registerValidataion.validate(payload);
  if (error) {
    throw new Error(error.details[0].message);
  }
  const isExist = await db.users.findFirst({
    where: {
      email: value.email,
    },
  });
  if (isExist) {
    throw new Error("User or Email already exists");
  }

  const hashPassword = await bcrypt.hash(value.password, 10);
  value.password = hashPassword;

  const user = await db.users.create({
    data: {
      ...value,
    },
  });


  return { user };
};

export const login = async (
  email: string,
  password: string
): Promise<string> => {
  const user = await db.users.findFirst({
    where: {
      email,
    },
  });
  if (!user) {
    throw new Error("Email or Password not valid");
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    throw new Error("Email or password not valid");
  }

  const token = jwt.sign({ id: user.id }, process.env.SECRET_KEY!, {
    expiresIn: "1d",
  });

  // console.log(token);

  return token;
};
