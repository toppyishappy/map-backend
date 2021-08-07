import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import {MyObject} from './models/object';

var app = express();
app.use(cors());

//TODO add body parser

mongoose.connect('mongodb://localhost:27017/map', { useNewUrlParser: true, useUnifiedTopology: true });


app.get('/', async (req, res) => {
    const result = await MyObject.find();
    res.json({result: result})
})

app.post('/admin', async (req, res) => {
    //TODO
    try {
        await MyObject.create({
            name: 'police1',
            des: '',
            lat: '13.7218137',
            long: '100.5546136',
            icon: 'police',
        })
    } catch (err) {
        res.json({status: err})
    }
    res.json({status: 'success'})
})
app.listen(8000, () => {console.log('starting app')})