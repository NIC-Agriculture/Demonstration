const router = require('express').Router();
module.exports = router;

router.get('/getFinYear', function (req, res) {
  const year = new Date().getFullYear().toString();
  const month = new Date().getMonth();
  if (month < 4 && month > 9 ) {
     var Season = 'Rabi';
  } else {
     var Season = 'Kharif';
  }
  const finYear = month >= 3 ? year + "-" + (parseInt(year.slice(2, 4)) + 1).toString() : (parseInt(year) - 1).toString() + "-" + year.slice(2, 4);
  const Years = [];
  Years.push(finYear);
  for (let i = 1; i < 2; i++) {
    Years.push((parseInt(finYear.slice(0, 4)) - i) + '-' + (parseInt(finYear.slice(5, 7)) - i));
  }
  const Data = {
    Years : Years,
    Season : Season}

  res.send(Data);
});

