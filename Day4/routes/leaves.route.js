import express from 'express';
import {validationResult} from 'express-validator';
import {getAllLeaves, UpdateLeave,createLeave} from '../controller/CRUD_leaves.js';

import {leaveValidation, validateFieldsToUpdate} from '../middlewares/leave_validation.js';

const router = express.Router();
router.use(express.json());
router.post('/', leaveValidation,async (req, res,next) => {
  try{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({errors: errors.array()});
    }
    const newLeave=await createLeave(req.body,next);
    if (!newLeave) {
      const error = new Error('leave is not created');
      error.status = 404;
      throw error;
    }
    res.status(200).json({message: 'leave  Updated', leave: newLeave});
  }catch(err)
  {
    next(err);
  }
});

router.get('/', async (req, res, next) => {
  const filter = req.query;
  try {
    const AllLeaves = await getAllLeaves(filter, next);
    if (!AllLeaves) {
      const error = new Error('There are no leaves');
      error.status = 404;
      throw error;
    }
    res.status(200).json({message: 'List All Leaves  ', leaves: AllLeaves});
  } catch (err) {
    next(err);
  }
});

router.patch('/:id', leaveValidation,async (req, res, next) => {
    try{
    const id = req.params.id;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({errors: errors.array()});
    }
     validateFieldsToUpdate(req.body, next);
    const UpdatedLeave=await UpdateLeave(id, req.body);
    if (!UpdatedLeave) {
      const error = new Error('leave is not Updataed');
      error.status = 404;
      throw error;
    }
    res.status(200).json({message: 'leave  Updated', leave: UpdatedLeave});
  }catch(err)
  {
    next(err);
  }
  
});

export default router;
