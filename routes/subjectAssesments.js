const express = require('express');
const router = express.Router({ mergeParams : true});
const { validateSubjectAssesment, isLoggedIn, isSubjectAssesmentAdmin } = require('../middleware');
const subjectAssesments = require('../controllers/subjectAssesments')
const Student = require('../models/student');

const ExpressError = require('../utils/ExpressErrors');
const catchAsync = require('../utils/catchAsync');

router.post('/',isLoggedIn, validateSubjectAssesment ,catchAsync( subjectAssesments.createSubjectAssesment));

router.delete('/:subjectAssesmentId', isLoggedIn, isSubjectAssesmentAdmin, catchAsync(subjectAssesments.deleteSubjectAssesment));

module.exports = router;