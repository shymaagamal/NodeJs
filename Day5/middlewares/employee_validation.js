import {body} from 'express-validator';

export const employeeValidation = [
  // fullname: required, trimmed, between 8 and 15 characters
  body('fullname')
    .trim()
    .notEmpty()
    .withMessage('Username is required')
    .isLength({min: 8, max: 15})
    .withMessage('Fullname must be between 8 and 15 characters'),

  body('dob')
    .notEmpty()
    .withMessage('Date of birth is required')
    .isISO8601()
    .withMessage('Please provide a valid date')
    .toDate(),

  body('title')
    .notEmpty()
    .withMessage('Title is required'),

  body('department')
    .notEmpty()
    .withMessage('Department is required'),

  body('email')
    .notEmpty()
    .withMessage('Email is required')
    .isEmail()
    .withMessage('Please provide a valid email address')
    .normalizeEmail(),

  body('phone')
    .notEmpty()
    .withMessage('Phone is required'),

  body('yearsOfExperience')
    .isNumeric()
    .withMessage('Years of experience must be a number')
];

export const employeePatchValidation = [
  body('fullname')
    .optional()
    .trim()
    .notEmpty()
    .withMessage('Username is required')
    .isLength({min: 8, max: 15})
    .withMessage('Fullname must be between 8 and 15 characters'),

  body('dob')
    .optional()
    .notEmpty()
    .withMessage('Date of birth is required')
    .isISO8601()
    .withMessage('Please provide a valid date')
    .toDate(),

  body('title')
    .optional()
    .notEmpty()
    .withMessage('Title is required'),

  body('department')
    .optional()
    .notEmpty()
    .withMessage('Department is required'),

  body('email')
    .optional()
    .notEmpty()
    .withMessage('Email is required')
    .isEmail()
    .withMessage('Please provide a valid email address')
    .normalizeEmail(),

  body('phone')
    .optional()
    .notEmpty()
    .withMessage('Phone is required'),

  body('yearsOfExperience')
    .optional()
    .isNumeric()
    .withMessage('Years of experience must be a number')
];

