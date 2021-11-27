import { Router } from "express";
import { isAuthenticated } from "../../../middlewares/isAuthenticated";
import { isAuthorized } from "../../../middlewares/isAuthorized";
import * as controller from "./controller";

const router = Router();

router.get(
  "/",
  isAuthenticated,
  isAuthorized({ hasRole: ["ADMIN"] }),
  controller.get
);

router.post(
  "/",
  isAuthenticated,
  isAuthorized({ hasRole: ["ADMIN"] }),
  controller.register
);

router.post("/login", controller.login);

export default router;
