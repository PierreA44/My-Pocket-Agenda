const express = require("express");

const router = express.Router();

// Import itemControllers module for handling item-related operations
const itemControllers = require("../controllers/itemControllers");

// Route to get a list of items
router.get("/", itemControllers.browse);

// Route to get a specific item by ID
router.get("/:id", itemControllers.read);

// Route to add a new item
router.post("/", itemControllers.add);

/* ************************************************************************* */

module.exports = router;
