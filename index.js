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

//Inserir a mensagem
app.post('/message/create', async(req, res)=>{
    const description = req.body.description
    await Message.create({description})
    res.redirect('/')
})

app.get('/message/edit/:id', async(req, res)=>{
    const id = req.params.id
    const message = await Message.findOne({raw: true, where: {id:id}})
    res.render('edit', {message})
})

app.post('/message/update/', async(req, res)=>{
    const id = req.body.id
    const description = req.body.description
    const listUpdate = {
        id,
        description
    }
    const update = await Message.update(listUpdate, {where: {id:id}})
    res.redirect('/')
})


//Apagar a mensagem
app.get('/message/delete/:id', async(req, res)=>{
    const id = req.params.id
    await Message.destroy({where: {id: id}})
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