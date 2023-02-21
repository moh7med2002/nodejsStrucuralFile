const express = require('express');
const router = express.Router();
const privateSchoolAuth = require('../middelware/PrivateSchoolAuth');
const studentAuth = require('../middelware/StudentAuth');
const walletControllers = require('../controllers/wallet');


router.post('/student/add' , studentAuth , walletControllers.addMoneyForWallet);

router.post('/privateSchool/accept/:walletId' , privateSchoolAuth ,  walletControllers.acceptMoney);

router.post('/privateSchool/reject/:walletId' , privateSchoolAuth , walletControllers.rejectMoney);

router.get('/privateSchool/wallets/all' , privateSchoolAuth , walletControllers.getWallets);

router.get('/privateSchool/wallets/:walletId' , privateSchoolAuth , walletControllers.getWalletById);

module.exports = router;