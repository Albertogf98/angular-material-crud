const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Student = new Schema({ 

    name: { type: String },
    email: { type: String }, 
    section: { type: String },
    subjects: { type: Array },
    gender: { type: String },
    dob: { type: String },
}, {
    collection: 'students'
});

module.exports = mongoose.model('Student', Student);