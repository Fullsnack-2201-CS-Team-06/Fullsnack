const router = require('express').Router();
module.exports = router;

router.use('/users', require('./users'));
router.use('/pantries', require('./pantries'));
router.use('/shoppinglist', require('./shoppingList'))
router.use('/recipes', require('./recipes'));

router.use((req, res, next) => {
  const error = new Error('Not Found');
  error.status = 404;
  next(error);
});
