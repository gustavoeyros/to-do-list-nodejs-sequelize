const express = require('express')
const exphbs = require('express-handlebars')
const conn = require('./db/conn')
const Message = require('./models/Message')
const app = express()
app.use(express.json())
app.engine('handlebars', exphbs.engine())
app.set('view engine', 'handlebars')
app.use(express.urlencoded({
    extended: true
}))

app.post('/message/create', async(req, res)=>{
    const description = req.body.description
    await Message.create({description})
    res.redirect('/')
})

app.get('/', async(req, res)=>{
    const list = await Message.findAll({raw: true})
    res.render('home', {list})
})




conn.sync().then(()=>{
    app.listen(3000)
}).catch((err)=>{
    console.log(err)
})