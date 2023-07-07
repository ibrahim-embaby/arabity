const { getAllWorkshopsCtrl } = require("../controllers/searchController");

const router = require("express").Router();

// /api/search/workshop
router.get("/workshop", getAllWorkshopsCtrl);

module.exports = router;
