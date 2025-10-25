const express = require("express");
const {
  getAllDuAn,
  getDuAnById,
  createDuAn,
  updateDuAn,
  deleteDuAn,
  updateTruongDA,
} = require("../controllers/duanController");

const router = express.Router();

router.get("/", getAllDuAn);
router.get("/:id", getDuAnById);
router.post("/", createDuAn);
router.put("/:id", updateDuAn);
router.delete("/:id", deleteDuAn);
router.put("/:MaDA/truongda", updateTruongDA);

module.exports = router;
