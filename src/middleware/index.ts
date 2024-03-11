import express, { NextFunction, Request, Response } from "express";
import { get, merge } from "lodash";
import { getUserBySessionToken } from "../db/users";

// prettier-ignore
export const isAuthenticated = async (req: Request, res: Response, next: NextFunction) => {
    try {
       const sessionToken = req.cookies['AUTH_TOKEN']

       if(!sessionToken) res.sendStatus(403)

       const existingUser = await getUserBySessionToken(sessionToken)

       if(!existingUser) res.sendStatus(403)

       merge(req, {identity: existingUser})

       return next();

    } catch (error) {
       console.log("ERROR: ",error) 
       return res.status(400).send({mesage: "Not Authenticated"})
    }
}
