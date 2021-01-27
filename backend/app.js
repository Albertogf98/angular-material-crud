let express = require('express');
let path = require('path');
let mongoose = require('mongoose');
let cors = require('cors');
let bodyPsr = require('body-parser');
let database = require('./databases/db');

//Connection mongoDB
mongoose.Promise = global.Promise;
mongoose.connect(database.config, { useNewUrlParser: true, useFindAndModify: false }).then(() => { console.log('OK !') }, error => { console.log('NO!' + error) });

    const studentRoute = require('./routes/student.route');

    const app = express();
    app.useb(bodyPsr.json());
    app.use(bodyPsr.urlencoded({ extended: false }));
    app.use(cors());

    app.use(express.static(path.join(__dirname, 'dist/angular-material')));

    app.use('/api', studentRoute);

    const port = process.env.PORT || 8000;
    app.listen(port, () => console.log('Conectado!') );

    app.use((request, response, next) => next(404));
    
    app.get('/', (request, response) => response.send('endpoint no válido.'));

    app.get('*', (request, response) => response.sendFile(__dirname, 'angular-material'));

    app.use(function (err, request, response, next) {
        console.error(err.message);

        if(!err.statusCode) err.statusCode = 500;

        response.status(err.statusCode).send(err.message);
    });