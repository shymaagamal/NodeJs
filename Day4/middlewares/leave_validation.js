import {body} from 'express-validator';


export const leaveValidation = [
  body('employeeId')
    .if((value, { req }) => req.method === 'POST')
    .notEmpty().withMessage('Employee ID is required')
    .isString().withMessage('Employee ID must be a string'),
  
  body('empBukupId')
    .if((value, { req }) => req.method === 'POST' || req.body.empBukupId !== undefined)
    .notEmpty().withMessage('Backup employee ID is required')
    .isString().withMessage('Backup employee ID must be a string')
    .custom((value, { req }) => {
      if (req.body.employeeId && value === req.body.employeeId) {
        throw new Error('Backup employee ID should not be the same as employee ID');
      }
      return true;
    }),
  
  body('leaveType')
    .if((value, { req }) => req.body.leaveType !== undefined)
    .trim()
    .notEmpty().withMessage('Leave type is required')
    .isIn(['annual', 'casual', 'sick'])
    .withMessage('Leave type must be either annual, casual, or sick'),
  
  body('duration')
    .if((value, { req }) => req.body.duration !== undefined)
    .notEmpty().withMessage('Duration is required')
    .isNumeric().withMessage('Duration must be a number')
    .custom((value) => {
      if (value < 1) {
        throw new Error('Duration must be a positive number');
      }
      return true;
    }),
  
  body('status')
    .optional()
    .isIn(['inprogress', 'cancelled', 'ended'])
    .withMessage('Status must be inprogress, cancelled, or ended')
];

export const validateFieldsToUpdate = (data, next) => {
  try {
    Object.entries(data).forEach(([key]) => {
      if (!['edit', 'leaveType', 'duration'].includes(key)) {
        const error = new Error(`You don't have to change ${key}`);
        error.status = 404;
        throw error;
      }
    });
  } catch (err) {
    next(err);
  }
};
