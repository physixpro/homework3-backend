const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const app = express();

app.use(cors())

//Connect to the mongodb db

mongoose.connect('mongodb+srv://keagan:1234@cluster0.qvhok.mongodb.net/olympians?retryWrites=true&w=majority',{ useNewUrlParser: true ,  useUnifiedTopology: true })

const db = mongoose.connection

//Listen for errors
db.on('error', console.error.bind(console,'connection error'));

//Once the db connection is open , we confirm its up and running
db.once('open', function callback(){
    console.log('database is up and running');
});

//route handler
app.get('/', async(req, res) => {
    //use. find to find the info from olympians
    const olympians = await db.collection('athletes').find({}).toArray();
    res.json(olympians)
})

//PORT

const port = process.env.PORT || 3001;
app.listen(port, () => console.log(`listening on port ${port}...`));