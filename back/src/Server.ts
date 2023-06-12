require('dotenv').config();
import * as argon from 'argon2';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import express, {ErrorRequestHandler, Express} from 'express';
import 'process';
import connection from './database/db';
import Gift from './database/models/Gift';
import List from './database/models/List';
import Role from './database/models/Role';
import User from './database/models/User';
import apiRoutes from './routes/ApiRoute';

const errorHandler: ErrorRequestHandler = (err, req, res, next) => {

    const statusCode = err.statusCode || 500;

    res.status(statusCode).end();

}

connection.sync({force: true}).then(async () => {
    await Role.create({name: 'Admin'});
    await Role.create({name: 'User'});
    await Role.create({name: 'Anon'});
    let user = await User.create({email: 'admin@gifter.pl', password: await argon.hash('Alamakota1!')});
    let list = await List.create({name: 'Andrzejki', access_code: 123123, ownerId: user.id});
    await Gift.bulkCreate([
        {name: 'Telewizor', image: 'http', list_id: list.id},
        {name: 'Telewizor', image: 'http', list_id: list.id},
        {name: 'Telewizor', image: 'http', list_id: list.id},
        {name: 'Telewizor', image: 'http', list_id: list.id},
    ]);
    list = await List.create({name: 'Mikolajki', access_code: 321321, ownerId: user.id});
    await Gift.bulkCreate([
        {name: 'Mikrofala', image: 'http', list_id: list.id},
        {name: 'Mikrofala', image: 'http', list_id: list.id},
        {name: 'Mikrofala', image: 'http', list_id: list.id},
        {name: 'Mikrofala', image: 'http', list_id: list.id},
        {name: 'Mikrofala', image: 'http', list_id: list.id},
    ]);
});


const app: Express = express();

app.use(cors({origin: 'http://localhost:3000', credentials: true}))

app.use(cookieParser(process.env.secret));

app.use(express.json());

app.use(express.urlencoded({extended: true}));

app.use('/api', apiRoutes);

// app.use((req, res, next) => {

//     if(/(.ico|.js|.css|.jpg|.png|.map|.webp)$/i.test(req.path)) {
//         next();
//     }else {
//         res.header('Cache-Contorl', 'private, no-chache, no-store, must-revalidate');
//         res.header('Expires', '-1');
//         res.header('Pragma', 'no-cache');
//         res.sendFile(path.join(__dirname, '../../front/build', 'index.html'));
//     }

// });

// app.use(express.static(path.join(__dirname, '../../front/build')));

app.use(errorHandler);

try {

    app.listen(3001, () => {

        console.log('express running on port 3001');

    });

} catch(err) {

    console.log(err);

}

process.on('exit', () => {connection.close();});