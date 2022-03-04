const express = require('express')
const app = express()
const mysql = require('mysql')

const port = process.env.PORT || 3000

//conection
const connection = mysql.createConnection({
    host: 'eu-cdbr-west-02.cleardb.net',
    user: 'b45a5769a8153a',
    password: 'd0b9d566',
    database: 'heroku_a6c1a29456a7b8b'
})


//view engine
app.set('view engine', 'ejs')


//render home page
app.get('/', function(req, res){
    connection.query('SELECT * FROM animal WHERE id = "1"', (error, rows) => {
        if (error) throw error;
    
        if (!error) {
            console.log(rows);
            res.render('pages/index', {rows})
        }
    })
    
})



app.listen(port)
console.log(`Server is listening on ${port}`);