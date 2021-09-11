import { Router } from "express";
import * as controller from "./controller";

const router = Router();

router.get("/", controller.get);
router.post("/", controller.store);
router.put("/:categoryId/update", controller.update);
router.delete("/:categoryId/remove", controller.remove);

export default router;
