const express = require("express");
const router = express.Router();
const employeeController = require("../controllers/employeeController");
const upload = require("../middleware/uploadMiddleware");

// === Routes ===
router.get("/", employeeController.getAllEmployees);
router.get("/:id", employeeController.getEmployeeById);
router.post("/", upload.single("Avatar"), employeeController.createEmployee);
router.put("/:id", upload.single("Avatar"), employeeController.updateEmployee);

router.delete("/:id", employeeController.deleteEmployee);

module.exports = router;
