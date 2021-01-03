const BaseJoi = require('joi');
const sanitizeHtml = require('sanitize-html');


const extension = (joi) => ({
    type: 'string',
    base: joi.string(),
    messages: {
        'string.escapeHTML': '{{#label}} must not include HTML!'
    },
    rules: {
        escapeHTML: {
            validate(value, helpers) {
                const clean = sanitizeHtml(value, {
                    allowedTags: [],
                    allowedAttributes: {},
                });
                if (clean !== value) return helpers.error('string.escapeHTML', { value })
                return clean;
            }
        }
    }
});
const Joi = BaseJoi.extend(extension);

module.exports.studentSchema = Joi.object({
    student:Joi.object({
        firstN: Joi.string().required().escapeHTML(),
        lastN: Joi.string().required().escapeHTML(),
        age: Joi.number().required().min(0),
        level:Joi.number().required().min(0).max(12),
        title: Joi.string().required().escapeHTML(),
        dob: Joi.string().required().escapeHTML(),
        description: Joi.string().required().escapeHTML(),
        gender: Joi.string().required().escapeHTML(),
        address: Joi.string().required().escapeHTML(),
        nationality: Joi.string().required().escapeHTML(),
        siblings:Joi.string().required().escapeHTML(),
        // image:Joi.string().required(),
    }).required(),
    deleteImages: Joi.array()
});

module.exports.subjectAssesmentSchema = Joi.object({
    subjectAssesment:Joi.object({
        subject: Joi.string().required().escapeHTML(),
        topic: Joi.string().required().escapeHTML(),
        date: Joi.string().required().escapeHTML(),
        studentScore: Joi.number().required(),
        totalScore: Joi.number().required(),
        // studentPercentage: Joi.number().required(),
        comment: Joi.string().required().escapeHTML(),
    }).required()
});
