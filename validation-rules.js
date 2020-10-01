import expressValidator from 'express-validator';
const { body, validationResult } = expressValidator;

const customerValRules = [
  body('first_name').isLength({ min:1, max: 50} ),
  body('last_name').isLength({ min:1, max: 50 }),
  body('street').isLength({ min:1, max: 50 }),
  body('city').isLength({ min:1, max: 50 }),
  body('zipcode').isPostalCode('US'),
  body('home_phone').isInt({ min: 1000000000, max: 9999999999 }),
  body('work_phone').optional({ checkFalsy: true }).isInt({ min: 1000000000, max: 9999999999 }),
  body('email').isEmail()
];

const orderValRules = [
  body('customer_id').isInt({ min: 1, max: 2147483647 }),
  body('order_status').isInt({ min: 1, max: 4} ),
  body('order_date').isInt({ min: 0, max: 9999999999999 }),
  body('required_date').isInt({ min: 0, max: 9999999999999 }),
  body('shipped_date').optional({ checkFalsy: true }).isInt({ min: 0, max: 9999999999999 }),
]

export { validationResult, customerValRules, orderValRules };