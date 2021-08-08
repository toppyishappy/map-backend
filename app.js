import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import {MyObject} from './models/object';
import {User} from './models/user';
import jwt from 'jsonwebtoken';
import bodyParser from 'body-parser';
import auth from './middleware/auth';
import { compare } from 'bcryptjs';
//import bcrypt from 'bcrypt';

var app = express();
app.use(cors());

// create application/json parser
var jsonParser = bodyParser.json()

mongoose.connect('mongodb://localhost:27017/map', { useNewUrlParser: true, useUnifiedTopology: true });


app.get('/', async (req, res) => {
    const result = await MyObject.find();
    res.json({result: result})
})

app.post('/fakeadmin', async (req, res) => {
    //TODO
    try {
        await MyObject.create({
            name: 'police1',
            des: '',
            lat: '13.7255137',
            long: '100.5546136',
            icon: 'police',
        })
    } catch (err) {
        res.json({status: err})
    }
    res.json({status: 'success'})
})

app.post('/admin',auth,jsonParser, async (req, res) => {
    //TODO
    try {
        const { name, des,lat,long,icon } = req.body;

        await MyObject.create({
            name: name,
            des: des,
            lat: lat,
            long: long,
            icon: icon,
        })
    } catch (err) {
        res.json({status: err})
    }
    res.json({status: 'success'})
})

app.post('/register',jsonParser, async (req, res) => {
    //TODO
    try {
        const { first_name, last_name,username,password } = req.body;

        console.log(req.body);
      //  encryptedPassword = await bcrypt.hash(password, 10);
      //  console.log(encryptedPassword);

        const regis = await User.create({
            first_name: first_name,
            last_name: last_name,
            username: username.toLowerCase(),
            password: password
        });

        console.log(regis);

        const token = jwt.sign(
            { user_id: regis._id, username },
            'secret',
            {
              expiresIn: "2h",
            }
          );

          console.log(regis);
          // save user token
          regis.token = token;
      
          // return new user
          res.status(201).json(regis);

    } catch (err) {
        res.status(999).json({status: err})
        console.log(err);
    }
})


app.post('/login',jsonParser, async (req, res) =>{
    try{
         const { username, password } = req.body;
         // Validate user input
         if (!(username && password)) {
           res.status(400).send("All input is required");
         }
         
        const userData = await User.findOne({ username });

        if(userData && compare(password, userData.password) /**(await bcrypt.compare(password, userData.password))**/){
            const token = jwt.sign(
                { user_id: userData._id, username },
                'secret',
                {
                  expiresIn: "2h",
                }
            );
            const response = {
                token: token
              };
    
            // user
            res.status(200).json(response);

        }
        else{ res.status(400).send("Invalid Credentials"); }

        

    }
    catch(err){console.log(err);}
})

app.listen(8000, () => {console.log('starting app')})