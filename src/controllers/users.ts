import { getUsers } from "../db/users";
// import express from "express";
import { Request, Response } from "express";

// prettier-ignore
export const getAllUsers = async (req: Request, res: Response) => {
    try {
        const users = await getUsers()
        return res.status(200).json(users)
    } catch (error) {
       console.log("ERROR: ",error) 
       return res.status(400).send({
        message: "Not Authenticated"
       })
    }
}
