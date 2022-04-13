const Animal = require('../models/Animal')
const Solicitud = require('../models/Solicitud')
const {validateNombreAnimal, validateAnimal} = require('../utils/service.validations')

const renderAnimales = async (request, response) => {
const animales = await Animal.find({}) 
const animales_filtrado_tipo = await Animal.collection.distinct("tipo")
const animales_filtrado_genero = await Animal.collection.distinct("genero")
const animales_filtrado_raza = await Animal.collection.distinct("raza")
response.render('animales/animales', { animales , animales_filtrado_tipo , animales_filtrado_genero, animales_filtrado_raza })
}

const renderAddAnimal = async (request, response) => {
  response.render('animales/add')
}

const busquedaAnimal = async (request, response) => {
  console.log(" AAAAAAAAAAAAAA -----------------------------------------------------------------------------------------");
  console.log(request.query);
  console.log(" BBBBBBBBBBBBBBB -----------------------------------------------------------------------------------------");
  console.log(request.body);
  console.log(" CCCCCCCCCCCCCCC  -----------------------------------------------------------------------------------------");
  const {busqueda} = request.body
  console.log("-----------------------------------------------------------------------------------------");
  console.log(busqueda);
  console.log(busqueda[0]);
  console.log(busqueda[1]);
  console.log(busqueda[2]);
  console.log(busqueda[3]);
  console.log(busqueda[4]);
  console.log(busqueda[5]);

 // {'tipo': {$cond: $eq: [busqueda[1] ,null ] }},
 // {'genero': busqueda[2] }

 const animales_filtrado_tipo = await Animal.collection.distinct("tipo")
 const animales_filtrado_genero = await Animal.collection.distinct("genero")
 const animales_filtrado_raza = await Animal.collection.distinct("raza")

  // $or: [ ]
  Animal.find
  (
    {
      'tipo': { "$in" : [busqueda[1]] },
      'genero': { "$in" : [busqueda[2]] },
      'edad': { '$gt':busqueda[4] ,'$lt': busqueda[5] 
    }}
  )
  .then(animales => {

    if (animales)
    console.log(animales);
    response.render('animales/animales', {animales, animales_filtrado_tipo , animales_filtrado_genero, animales_filtrado_raza})
  })
  .catch(err => next(err))
}

// {'descripcion' : {$regex : busqueda[0]}},

const addAnimal = async (request, response, error) => {

  const {file, body, nombre, user} = request
  console.log(user.user);

  const validation = validateAnimal(request)
  let checkedH;
  let checkedM;
  if (validation.length !== 0) {
    if (body.genero === "Hembra") {
      checkedH = 'checked'
    } else if (body.genero === "Macho") {
      checkedM = 'checked'
    }
    return response.render('animales/add', {errors: validation, body, checkedH, checkedM})
  }

  try {
    const datos = body
    // console.log(body);
    // console.log(file);
    const animal = new Animal({
            nombre: body.nombre,
            tipo: body.tipo,
            raza: body.raza,
            edad: (body.edad == '') ? undefined : body.edad,
            genero: body.genero,
            descripcion: (body.descripcion == '') ? undefined : body.descripcion,
            image: (file == undefined) ? file : file.filename,
            protectora: user.user._id
        })
    const savedUser = await animal.save()
        // response.locals.success_msg = 'Añadido con exito'
    request.flash('success_msg', 'Añadido con éxito')
    response.redirect('/animales/animal/'+ savedUser.id )
  } catch (error) {
    response.render('animales/add')
  }
}
const renderAnimal = async (request, response) => {
  const { id } = request.params
  const {user} = request.user
  const solicitado = await Solicitud.find({adoptante: user._id, animal: id})

  const animal = await Animal.findById(id)
  if (animal) {
    response.render('animales/animal', {animal: animal, solicitado})
  }else{
    response.response('/animales')
  }
}

  const solicitudAnimal = async (request, response) => {
    const params = request.params
    const {animal, mensaje} = request.body
    const user = request.user
    const animalfound = await Animal.findById(animal)
    const protectora = await animalfound.populate('protectora')
    // console.log(protectora);
    const solicitud = new Solicitud({
      animal: animalfound._id,
      adoptante: user.user._id,
      mensaje: mensaje,
      protectora: protectora.protectora._id,
      estado: 'enviada'
    })
    const saved = await solicitud.save()
    request.flash("success_msg", 'Solicitud enviada correctamente.')
      response.redirect('/animales/animal/' + animal)
    // console.log(solicitud);
    // console.log(saved);
    // const protectora = await Animal.findById(id)
    // const adoptante = await Adoptante.findById()
  
  //   console.log('pedo');
  //   console.log(params);
  //   console.log('pedo2');
  //   console.log(body.animal);
  //   console.log('pedo3');
  //   console.log(request.user);
  // response.send('solicitar')
  }

module.exports = {renderAnimales, renderAddAnimal, addAnimal, busquedaAnimal, renderAnimal, solicitudAnimal}
