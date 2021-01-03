const { studentSchema, subjectAssesmentSchema } = require('./schemas.js');
const ExpressError = require('./utils/ExpressErrors');
const Student = require('./models/student');
const SubjectAssesment = require('./models/subjectAssesment');

module.exports.isLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
        req.session.returnTo = req.originalUrl
        req.flash('error', 'You must be signed in first!');
        return res.redirect('/login');
    }
    next();
}

module.exports.validateStudent = (req, res, next) => {
    const { error } = studentSchema.validate(req.body);
    if(error){
        const message = error.details.map(el => el.message).join(',');
        throw new ExpressError(message, 400)
    } else {
        next()
    }
};

module.exports.isAdmin = async (req, res, next) => {
    const { id } = req.params;
    const student = await Student.findById(id);
    if (!student.admin.equals(req.user._id)) {
        req.flash('error', 'You do not have permission to do that!');
        return res.redirect(`/students/${ id }`);
    }
    next();
};


module.exports.validateSubjectAssesment = (req, res, next) => {
    const { error } = subjectAssesmentSchema.validate(req.body);
    if(error){
        const message = error.details.map(el => el.message).join(',');
        throw new ExpressError(message, 400)
    } else {
        next()
    }
};

module.exports.isSubjectAssesmentAdmin = async (req, res, next) => {
    const { id, subjectAssesmentId } = req.params;
    const subjectAssesment = await SubjectAssesment.findById(subjectAssesmentId);
    if (!subjectAssesment.admin.equals(req.user._id)) {
        req.flash('error', 'You do not have permission to do that!');
        return res.redirect(`/students/${id}`);
    }
    next();
}


