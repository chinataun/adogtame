const router = require('express').Router()
const mongoose = require ('mongoose')
// const User = require('../models/User.js')

const {getAnimals} = require('../../controllers/animal.controller')


//render API USERS
// router.get('/users', (request, response) => {
//     User.find({}).then(users => {
//         response.writeHead(200, {'Content-type': 'application/json'})
//         response.end(JSON.stringify(users))
//         // response.json(users)
//         // mongoose.connection.close()
//     })
// })

//render API USERS
router.get('/datos', (request, response) => {
	Animal.find({}).then(datos => {
		response.end(JSON.stringify(datos))
		// response.json(users)
		// mongoose.connection.close()
	})
})

// router.post('/registro', (request, response) => {
// 	const datos = request.body
// 	console.log("datos")
// 	console.log(datos)
// 	if (!datos) {
// 		return response.status(400).json({
// 			error: 'required content field missing'
// 		})
// 	}
// 	const ficha = new Animal({
// 		nombre: datos.nombre,
// 		tipo: datos.tipo,
// 		raza: datos.raza,
// 		edad: datos.edad,
// 		genero: datos.genero,
// 		descripcion: datos.descripcion
// 	})
// 	ficha.save()
// 		.then(result =>{
// 			// console.log(result)
// 			response.redirect('/')
// 		})
// 		.catch(err => {
// 			console.error(err)
// 		})


	// try {
	//     const datosApi = await axios.get('http://localhost:3000/api/datos')
	//     response.render('index', {rows : datosApi.data})
	// }
	// catch (err) {
	//     if (err.response) {
	//         console.error(err.response.data);
	//         console.error(err.response.status);
	//         console.error(err.response.headers);
	//     } else if(err.request) {
	//         console.error(err.request); 
                
	//     }else{
	//         console.error('error', err.message); 
	//     }
	// }

	// User.find({}).then(users => {
	//     response.writeHead(200, {'Content-type': 'application/json'})
	//     response.end(JSON.stringify(users))
	//     // response.json(users)
	//     // mongoose.connection.close()
	// });
// })
// usersRouter.get('/users', (request,response) => {
//     User.find({}).then(users => {
//         response.json(users)
//         mongoose.connection.close()
//     })
// })

//Introduce nuevos usuarios en la base de datos, comprobando que no haya campos vacios o usuarios repetidos
// usersRouter.post("/registro",(request, response)=>{
//     let body = request.body;
//     pool.getConnection((err,connection) => {
//         if(err){
//             connection.release();
//             return;
//         }
//         connection.query(
//             "insert into datos(nombre,tipo,rango) values (?,?,?)",
//             [body.nombre,body.tipo,body.rango],
//             (error, result) => {
//             if (error) {
//                 response.status(500);
//                 console.log(err);
//                 response.end(err.message);
//             }    
//             if (!error) {
//                 response.redirect('/')
//             }
//         })
//         connection.release();
//     });
// });




// const Note = require('../models/note')

// notesRouter.get('/', (request, response) => {
//   Note.find({}).then(notes => {
//     response.json(notes)
//   })
// })

// notesRouter.get('/:id', (request, response, next) => {
//   Note.findById(request.params.id)
//     .then(note => {
//       if (note) {
//         response.json(note)
//       } else {
//         response.status(404).end()
//       }
//     })
//     .catch(error => next(error))
// })

// notesRouter.post('/', (request, response, next) => {
//   const body = request.body

//   const note = new Note({
//     content: body.content,
//     important: body.important || false,
//     date: new Date()
//   })

//   note.save()
//     .then(savedNote => {
//       response.json(savedNote)
//     })
//     .catch(error => next(error))
// })

// notesRouter.delete('/:id', (request, response, next) => {
//   Note.findByIdAndRemove(request.params.id)
//     .then(() => {
//       response.status(204).end()
//     })
//     .catch(error => next(error))
// })

// notesRouter.put('/:id', (request, response, next) => {
//   const body = request.body

//   const note = {
//     content: body.content,
//     important: body.important,
//   }

//   Note.findByIdAndUpdate(request.params.id, note, { new: true })
//     .then(updatedNote => {
//       response.json(updatedNote)
//     })
//     .catch(error => next(error))
// })

module.exports = router