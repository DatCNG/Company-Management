const express = require("express");
const router = express.Router();
const departmentController = require("../controllers/departmentController");

// === Các route chính ===
router.get("/", departmentController.getAllDepartments);
router.get("/:id", departmentController.getDepartmentById);
router.post("/", departmentController.createDepartment);
router.put("/:id", departmentController.updateDepartment);
router.delete("/:id", departmentController.deleteDepartment);
router.put("/:MaPB/truongphong", departmentController.updateTruongPhong);

module.exports = router;
