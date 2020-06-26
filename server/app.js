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

const RC = require('./controllers/roomController');
const UC = require('./controllers/userController');

io.on('connection', (socket) => {
	socket.on('login', (nickname) => {
		RC.getRooms()
		  .then(data => {
			  socket.emit('get-rooms', data);
		  })
		  .catch(err => console.log(err));
	});
	socket.on('create-room', (data) => {
		RC.addRoom(data.roomName, data.admin)
		  .then(_ => {
			return RC.getRooms();
		  })
		  .then(data => {
			io.emit('updated-room', data);
		  })
		  .catch(err => console.log(err));
	});
	socket.on('join-room', (data) => {
		RC.findOne(data.id)
		  .then(res => {
			return UC.add(data.nickname, data.id);
		  })
		  .then(_ => {
			return RC.findOne(data.id);
		  })
		  .then(room => {
			socket.join(room.name, () => {
			  io.sockets.in(room.name).emit('room-detail', room);
			})
		  })
		  .catch(err => {
			  if (err.errors) {
				console.log(err.errors)
			  } else {
				console.log(err)
			  }
		  });
	});
	socket.on('add-score', name => {
		UC.addScore(name);
	})
	socket.on('start-game', (id) => {
		socket.broadcast.emit('start-game');
	})
	socket.on('shift-product', data => {
		socket.broadcast.emit('shift-product', data);
	});
	socket.on('game-over', data => {
		socket.broadcast.emit('game-over', data);
	})
	socket.on('result-score', data => {
		socket.broadcast.emit('result-score', data);
	})
	socket.on('show-modal-true', () => {
		socket.broadcast.emit('show-modal-true');
		console.log('masuk ga yaaaaaaaaa')
	})
	// socket.on('leave-room', (data) => {
		//disini leave room
	// })
})
app.get('/rooms/:id', (req, res) => {
	RC.findOne(req.params.id)
	  .then(data => {
		  res.status(200).json(data);
	  })
	  .catch(err => console.log(err));
})


server.listen(port, ()=>{
	console.log(`app running on port: ${port}`)
})