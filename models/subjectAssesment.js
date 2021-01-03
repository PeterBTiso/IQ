const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const subjectAssesmentSchema = new Schema({
    subject: String,
    topic: String,
    date: String,
    studentScore: Number,
    totalScore: Number,
    // studentPercentage: Number,
    comment: String,
    admin: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    } // change to show which admin created the new subjectassesment
});

module.exports = mongoose.model('SubjectAssesment', subjectAssesmentSchema);