const express = require('express');
const router = express.Router();
const students = require('../controllers/students');
const { isLoggedIn, isAdmin, validateStudent } = require('../middleware');
const catchAsync = require('../utils/catchAsync');
const multer = require('multer');
const { storage } = require('../cloudinary');
const upload = multer({ storage });

const Student = require('../models/student');
// const SubjectAssesment = require('../models/subjectAssesment');

router.route('/')
    .get( catchAsync(students.index) )
    .post( isLoggedIn, upload.array('image'), validateStudent,  catchAsync( students.createStudent ) );

router.get('/new', isLoggedIn, students.renderNewForm); // this code has to run before the next block of code

router.get('/assesments', isLoggedIn, students.assesments); // to display student marks on studentAssesments view

router.route('/:id')
    .get( isLoggedIn, catchAsync(students.showStudent))
    .put( isLoggedIn, isAdmin, upload.array('image'), validateStudent, catchAsync( students.updateStudent ))
    .delete( isLoggedIn, catchAsync( students.deleteStudent ));

router.get('/:id/edit', isLoggedIn, isAdmin, catchAsync( students.renderEditForm ));

module.exports = router;