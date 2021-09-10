import { Router } from "express";
import * as controller from "./controller";

const router = Router();

router.get("/", controller.get);
router.post("/", controller.store);
router.get("/:orderId", controller.getById);
router.put("/:orderId/update", controller.update);
router.delete("/:orderId/remove", controller.remove);

export default router;
