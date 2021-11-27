import { Router } from "express";

import ProductCategory from "./ProductCategory";
import Order from "./Order";
import Product from "./Product";
import Ingredient from "./Ingredient";
import Auth from "./Auth";

import { isAuthorized } from "../../middlewares/isAuthorized";
import { isAuthenticated } from "../../middlewares/isAuthenticated";

const router = Router();

router.use(
  "/category",
  isAuthenticated,
  isAuthorized({ hasRole: ["REGISTERED", "ADMIN"] }),
  ProductCategory
);
router.use(
  "/orders",
  isAuthenticated,
  isAuthorized({ hasRole: ["REGISTERED", "ADMIN"] }),
  Order
);
router.use(
  "/products",
  isAuthenticated,
  isAuthorized({ hasRole: ["REGISTERED", "ADMIN"] }),
  Product
);
router.use(
  "/ingredients",
  isAuthenticated,
  isAuthorized({ hasRole: ["REGISTERED", "ADMIN"] }),
  Ingredient
);
router.use("/auth", Auth);

export default router;
