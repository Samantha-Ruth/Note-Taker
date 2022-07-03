const path = require('path');
const router = require('express').Router();
// require("/Users/samshomefolder/bootcamp/CU-VIRT-BO-FSF-PT-04-2022-U-B/11-Express/02-Challenge/Note-Taker/public/index.html")

// *** Code catch all here *** 
router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../../public/index.html'));
  })

router.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '../../public/notes.html'));
  });

router.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../../public/index.html'));
  });
  
  module.exports = router;