const express = require("express");
const {
  AddCategory,
  getNestedCategory,
} = require("./controller/NestingController");
const router = express.Router();

router.post("/AddCategory", AddCategory);
router.get("/NestedCategory", getNestedCategory);

module.exports = router;
