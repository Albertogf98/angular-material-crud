const express = require('express');
const app = express();
const studentRoute = express.Router();


let Student = require('../models/Student');

//CREATE 
studentRoute.route('/add-student').post((request, response, next) => {
    Student.create(request.body, (error, data) => {
        if(error) return next(error);
        else response.json(data);
    })
});

//GET
studentRoute.route('/').get((request, response) => {
    Student.find((error, data) => {
        if(error) return next(error);
        else response.json(data);
    })
});

//GET(id)
studentRoute.route('/read-student/:id').get((request, response) => {
    Student.findById(request.params.id, (error, data) => {
        if(error) return next(error);
        else response.json(data);
    })
});

//PUT
studentRoute.route('/update-student/:id').put((request, response, next) => {
    Student.findByIdAndUpdate(req.params.id, { $set: request.body }, (error, data) => {
        if(error) return next(error);
        else response.json(data);
    })
});

//DELETE
studentRoute.route('/delete-student/:id').delete((request, response, next) => {
    Student.findByIdAndRemove(request.params.id, (error, data) => {
        if(error) return next(error);
        else response.status(200).json({ msg: data })
    })
});

module.exports = studentRoute;