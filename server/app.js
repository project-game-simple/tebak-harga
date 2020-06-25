if(process.env.NODE_ENV == 'development'){
	require('dotenv').config()
}

const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const cors = require('cors')
const http = require('http')
const server = http.createServer(app)
const routes = require('./routes/index.js')
const io = require('socket.io')(server)


app.use(cors())
app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(function (req, res, next){
	req.io = io
	next()
})

app.use('/', routes)

app.listen(port, ()=>{
	console.log(`app running on port: ${port}`)
})