import express from 'express';
import {validationResult} from 'express-validator';
import { getLeave,UpdateLeave,createLeave} from '../controller/CRUD_leaves.js';
import {leaveValidation, validateFieldsToUpdate} from '../middlewares/leave_validation.js';
import {verifyToken} from '../utils/helper.js';

const router = express.Router();
router.use(express.json());
router.post('/:id',verifyToken ,leaveValidation,async (req, res,next) => {
  try{
    const empId = req.params.id;
    console.log(empId);
    if (req.employee.id !== empId) {
      return res.status(403).json({ message: "Access denied" });
    }
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({errors: errors.array()});
    }
    
    const newLeave=await createLeave(empId,req.body,next);
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



router.patch('/:id', verifyToken,leaveValidation,async (req, res, next) => {
    try{
    const id = req.params.id;
    const EmpIdForLeave=await getLeave(id);
    console.log(EmpIdForLeave);
    if (req.employee.id !== EmpIdForLeave) {
      return res.status(403).json({ message: "Access denied" });
    }
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
