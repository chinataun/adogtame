const express = require('express')
const app = express()
const mysql = require('mysql')
const path = require("path");
const bodyParser = require("body-parser");
const statics = path.join(__dirname,"public");
app.use(bodyParser.urlencoded({ extended: false }));


//conection
const pool = mysql.createPool({
    host: 'eu-cdbr-west-02.cleardb.net',
    user: 'b45a5769a8153a',
    password: 'd0b9d566',
    database: 'heroku_a6c1a29456a7b8b'
})

app.use(express.static(statics));



//view engine
app.set('view engine', 'ejs')


//render home page
app.get('/', function(req, res){
    pool.getConnection((err,connection) => {
        if(err){
            callback(err);
            return;
        }
        connection.query('SELECT * FROM datos', (error, rows) => {
            if (error)
            connection.release();
        
            if (!error) {
                console.log(rows)
                res.render('pages/index', {rows})
            }
        })
        connection.release();
    });
})

//TEST INTEGRACIÓN
app.post('/users', async (req, res) => {
    const { password, username } = req.body
    if (!password || !username) {
      res.sendStatus(400)
      return
    }
  
    res.send({ userId: 0 })
})

//Introduce nuevos usuarios en la base de datos, comprobando que no haya campos vacios o usuarios repetidos
app.post("/registro",(request, response)=>{
    let body = request.body;
    pool.getConnection((err,connection) => {
        if(err){
            connection.release();
            return;
        }
        connection.query(
            "insert into datos(nombre,tipo,rango) values (?,?,?)",
            [body.nombre,body.tipo,body.rango],
            (error, result) => {
            if (error) {
                response.status(500);
                console.log(err);
                response.end(err.message);
            }    
            if (!error) {
                response.redirect('/')
            }
        })
        connection.release();
    });
});

const port = process.env.PORT || 3000
const server = app.listen(port, () => {
    console.log(`Server is listening on ${port}`);
})

module.exports = {app, server}

// app.listen(port)
// console.log(`Server is listening on ${port}`);