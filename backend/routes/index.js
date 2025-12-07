const express = require("express");
const router = express.Router();

router.use(require("./userRoute"));
router.use(require('./todoRoute'))

module.exports = router;