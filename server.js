const express = require('express')
const bodyParser = require('body-parser')

const app = express()

// // parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())


const db = require('./models')
db.mongoose
    .connect(
        `mongodb+srv://root:gc742899@cluster0.mqkff.mongodb.net/TEST?retryWrites=true&w=majority`,
        {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
        }
    )
    .then(() => {
        console.log('Successfully connect to MongoDB.')
    })
    .catch((err) => {
        console.error('Connection error', err)
        process.exit()
    })

    
///////////////////////////////////
app.get('/', (req, res) => {
    res.json({ message: 'Toong.' })
})

///////////////////////////////
// Require Notes routes
require('./routes/Harry.item.routes')(app);
require('./routes/Harry.itembut.routes')(app);



const PORT = process.env.PORT || 8080
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});