const mongoose = require('mongoose');
const SubjectAssesment = require('./subjectAssesment');
const Schema = mongoose.Schema;

const ImageSchema = new Schema({
    url: String,
    filename: String
});

ImageSchema.virtual('thumbnail').get(function () {
    return this.url.replace('/upload', '/upload/w_200');
});

const StudentSchema = new Schema({
    firstN: String,
    lastN: String,
    age: Number,
    level: Number,
    title: String,
    gender: String,
    dob: String,
    address: String,
    nationality: String,
    description: String,
    location: String,
    siblings: String,
    images:[ImageSchema],
    admin: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },  // this it to display which user created the new student
    subjectAssesments: [
        {
            type: Schema.Types.ObjectId,
            ref: 'SubjectAssesment'
        }
    ]
});
// thise deletes based on id from mongo
StudentSchema.post('findOneAndDelete', async function (doc) {
    if (doc) {
        await SubjectAssesment.deleteMany({
            _id: {
                $in: doc.subjectAssesments
            }
        })
    }
});

module.exports = mongoose.model('Student', StudentSchema);