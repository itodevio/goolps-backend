import { Router } from "express";
import * as controller from "./controller";

const router = Router();

router.get("/", controller.get);
router.post("/", controller.store);
router.put("/:ingredientId/update", controller.update);
router.delete("/:ingredientId/remove", controller.remove);

export default router;
