import { isAuthenticated } from "../middleware";
import { getAllUsers } from "../controllers/users";
import express, { Router } from "express";

export default (router: Router) => {
  router.get("/users", isAuthenticated, getAllUsers);
};
