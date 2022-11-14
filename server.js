const express = require('express')
const mongoose = require('mongoose')
const articleRouter = require('./routes/articles')
const Article = require('./models/article')
const methodOverride = require('method-override')
const PORT = 5000
const HOST = '0.0.0.0'
const app = express()

mongoose.connect('mongodb://mongo_db:27017/pi-app')

app.set('view engine', 'ejs')
app.use('/public', express.static('public'));

app.use(express.urlencoded({ extended: false }))

app.use(methodOverride('_method'))

app.get('/', async (req, res) => {
    const articles = await Article.find().sort({
        createdAt: 'desc'
    })
    res.render('articles/index', { articles: articles })
})

app.use('/articles', articleRouter)

app.listen(PORT, HOST)