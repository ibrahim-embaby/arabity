const {  getAllMehcanicsCtrl } = require("../controllers/searchController");

const router = require("express").Router();

// /api/search/workshop
router.get("/mehcanics", getAllMehcanicsCtrl);

module.exports = router;
