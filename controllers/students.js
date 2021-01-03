const Student = require('../models/student');
const SubjectAssesment = require('../models/subjectAssesment');
const { cloudinary } = require('../cloudinary');

module.exports.index = async (req, res) => {
    const students = await Student.find({});
    res.render('students/index', { students })
};

// this is to display the new students assesments view page
module.exports.assesments = async (req, res) => {
    const students = await Student.find({}).populate('subjectAssesments');
    res.render('students/studentAssesments', { students })
};

module.exports.renderNewForm = (req, res) => {
    res.render('students/new')
};

module.exports.createStudent = async (req, res, next) => {
    const student = new Student(req.body.student);
    student.images = req.files.map( f => ({url:f.path,filename:f.filename}) );
    student.admin = req.user._id
    await student.save();
    req.flash('success', 'Successfully made a new Student!');
    res.redirect(`/students/${student._id}`);
};

module.exports.showStudent = async (req, res) => {
    const student = await Student.findById(req.params.id).populate({
            path: 'subjectAssesments',
            populate: {
                path: 'admin',
            }
        }).populate('admin');
        if (!student) {
            req.flash('error', 'Cannot find that student!');
            return res.redirect('/students');
        }
        res.render('students/show', { student });
};

module.exports.renderEditForm = async (req, res) => {
    const { id } = req.params;
    const student = await Student.findById(id)
    if (!student) {
        req.flash('error', 'Cannot find that Student!');
        return res.redirect('/students');
    }
    res.render('students/edit', { student });
};

module.exports.updateStudent = async (req, res) => {
    const { id } = req.params;
    const student = await Student.findByIdAndUpdate(id, { ...req.body.student });
    const imgs = req.files.map( f => ({url:f.path,filename:f.filename}));
    student.images.push(...imgs);
    await student.save();
    if (req.body.deleteImages) {
        for (let filename of req.body.deleteImages) {
            await cloudinary.uploader.destroy(filename);
        }
        await student.updateOne({ $pull: { images: { filename: { $in: req.body.deleteImages } } } })
    }
    req.flash('success', 'Successfully updated Student!');
    res.redirect(`/students/${ student._id }`);
};

module.exports.deleteStudent = async (req, res) => {
    const { id } = req.params;
    await Student.findByIdAndDelete(id);
    req.flash('success', 'Successfully deleted a Student!');
    res.redirect('/students')
};