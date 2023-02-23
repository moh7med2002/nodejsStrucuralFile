const express = require("express");
const router = express.Router();
const adminAuth = require("../middelware/AdminAuth");
const studentAuth = require("../middelware/StudentAuth");
const walletControllers = require("../controllers/wallet");

router.post("/student/add", studentAuth, walletControllers.addMoneyForWallet);

router.post(
  "/admin/accept/:walletId",
  adminAuth,
  walletControllers.acceptMoney
);

router.post(
  "/admin/reject/:walletId",
  adminAuth,
  walletControllers.rejectMoney
);

router.get("/admin/wallets/all", adminAuth, walletControllers.getWallets);

router.get(
  "/admin/wallets/:walletId",
  adminAuth,
  walletControllers.getWalletById
);

module.exports = router;
