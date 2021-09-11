import { Router } from "express";

import Category from "./Category";
import Order from "./Order";
import Product from "./Product";
import Ingredient from "./Ingredient";

const router = Router();

router.use("/category", Category);
router.use("/orders", Order);
router.use("/products", Product);
router.use("/ingredients", Ingredient);

export default router;
