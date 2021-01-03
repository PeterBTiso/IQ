const Student = require('../models/student');
const SubjectAssesment = require('../models/subjectAssesment');

module.exports.createSubjectAssesment = async (req , res) => {
    const student = await Student.findById(req.params.id);
    const subjectAssesment = new SubjectAssesment(req.body.subjectAssesment);
    student.subjectAssesments.push(subjectAssesment);
    subjectAssesment.admin = req.user._id;
    await subjectAssesment.save();
    await student.save();
    req.flash('success', 'Successfully added a New Assesment!');
    res.redirect(`/students/${ student._id }`);
};

module.exports.deleteSubjectAssesment = async (req, res) => {
    const { id, subjectAssesmentId } = req.params;
    await Student.findByIdAndUpdate(id, { $pull: { subjectAssesments: subjectAssesmentId } });
    await SubjectAssesment.findByIdAndDelete(subjectAssesmentId);
    req.flash('success', 'Successfully deleted a Assesment!');
    res.redirect(`/students/${ id }`);
};

