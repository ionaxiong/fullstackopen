const config = require('./utils/config')
const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
app.use(express.json())
app.use(cors())

const blogSchema = new mongoose.Schema({
	author: String,
	title: String,
	url: String,
	likes: Number
})

const Blog = mongoose.model('Blog', blogSchema)

const url = config.MONGODB_URL

mongoose.connect(url, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	useFindAndModify: false,
	useCreateIndex: true,
})

app.get('/api/blogs', (request, response) => {
	Blog.find({}).then((blogs) => {
		response.json(blogs)
	})
})

app.post('/api/blogs', (request, response) => {
	console.log(request)
	const blog = new Blog(request.body)


	blog.save().then((result) => {
		response.status(201).json(result)
	})
})

module.exports = app