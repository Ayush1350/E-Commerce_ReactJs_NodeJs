import express from "express";

import {
  categoryControlller,
  createCategoryController,
  deleteCategoryCOntroller,
  singleCategoryController,
  updateCategoryController,
} from "./../controllers/categoryController.js";


const router = express.Router();


router.post(
  "/create-category",
  createCategoryController
);


router.put(
  "/update-category/:id",
  updateCategoryController
);

//getALl category
router.get("/get-category", categoryControlller);

//single category
router.get("/single-category/:slug", singleCategoryController);


router.delete(
  "/delete-category/:id",
  deleteCategoryCOntroller
);

export default router;