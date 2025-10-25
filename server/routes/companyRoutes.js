// server/routes/companyRoutes.js
const express = require("express");
const router = express.Router();
const companyController = require("../controllers/companyController");
const upload = require("../middleware/uploadMiddleware");

// === API ===
router.get("/", companyController.getAllCompanies);
router.get("/:id", companyController.getCompanyById);
router.post("/", upload.single("Anh"), companyController.createCompany);
router.put("/:id", upload.single("Anh"), companyController.updateCompany);
router.delete("/:id", companyController.deleteCompany);

module.exports = router;
