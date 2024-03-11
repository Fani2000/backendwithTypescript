import { createUser, getUserByEmail } from "../db/users";
import express, { Request, Response } from "express";
import { authentication, random } from "../helpers";

export const login = async (req: Request, res: Response) => {
  try {
    const { email, username, password } = req.body;

    if (!email || !username || !password) return res.sendStatus(400);

    const existingUser = await getUserByEmail(email).select(
      "+authentication.salt +authentication.password"
    );
    if (!existingUser) return res.sendStatus(400);

    const expectedHash = authentication(
      existingUser.authentication.salt,
      password
    );

    console.log("USER HASH: ", existingUser.authentication);
    console.log("EXPECTED HASH: ", expectedHash);

    if (existingUser.authentication.password !== expectedHash)
      return res.sendStatus(403);

    const salt = random();
    existingUser.authentication.sessionToken = authentication(
      salt,
      existingUser._id.toString()
    );

    res.cookie("AUTH_TOKEN", existingUser.authentication.sessionToken, {
      domain: "localhost",
      path: "/",
    });

    return res.status(200).json(existingUser).end();
  } catch (error) {
    console.log("ERROR:", error);
    return res.status(400).send({ mesage: "Not Authenticated" });
  }
};

export const regtister = async (req: Request, res: Response) => {
  try {
    const { email, username, password } = req.body;

    if (!email || !username || !password) return res.sendStatus(400);

    const existingUser = await getUserByEmail(email);

    if (existingUser) return res.sendStatus(400);

    // User doesn't exist and the properties are filled

    const salt = random();
    const user = await createUser({
      email,
      username,
      authentication: {
        password: authentication(salt, password),
        salt,
      },
    });

    return res.status(200).json(user).end();
  } catch (error) {
    console.log("ERROR:", error);
    return res.status(400).send({ mesage: "Not Authenticated" });
  }
};
