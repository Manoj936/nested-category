const Nesting = require("../model/Nesting");

const AddCategory = async (req, res) => {
  const { CategoryName, ParentId } = req.body;

  try {
    let body = {};
    body.CategoryName = CategoryName;
    if (ParentId) {
      body.ParentId = ParentId;
    }

    const sendNesting = new Nesting(body);
    const saveNesting = await sendNesting.save();
    res.status(200).json({
      status: true,
      message: "Category insterted Successfully",
      data: saveNesting,
    });
  } catch (e) {
    res.status(400).json({ status: false, message: "Unexpected Error" });
  }
};

const getNestedCategory = async (req, res) => {
  try {
    const nestings = await Nesting.find({});

    const filtredData = nestedCategory(nestings);
    if (filtredData) {
      res.status(200).json({
        status: true,
        message: "Category Fetched successfully",
        data: filtredData,
      });
    } else {
      res
        .status(200)
        .json({ status: true, message: "No Category found", data: [] });
    }
  } catch (e) {
    res.status(400).json({ status: false, message: "Unexpected Error" });
  }
};

const nestedCategory = (categories, parentdId = null) => {
  let categoryList = [];

  let category;

  if (parentdId == null) {
    category = categories.filter((ele) => ele.ParentId === null);
  } else {
    category = categories.filter(
      (ele) => String(ele.ParentId) === String(parentdId)
    );
  }
  for (let cat of category) {
    categoryList.push({
      _id: cat._id,
      name: cat.CategoryName,
      child: nestedCategory(categories, cat._id),
    });
  }

  return categoryList;
};

module.exports = { AddCategory, getNestedCategory };
