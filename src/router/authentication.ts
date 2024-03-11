import express from "express";

import { login, regtister } from "../controllers/authentication";

export default (router: express.Router) => {
  router.post("/auth/register", regtister);
  router.post("/auth/login", login);
};
