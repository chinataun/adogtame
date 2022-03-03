const express = require('express')
const app = express()
const mysql = require('mysql')

const port = process.env.PORT || 3000

//conection
const connection = mysql.createConnection({
    host: 'eu-cdbr-west-02.cleardb.net',
    user: 'b8a84ef34c9fb6',
    password: 'e601c5e6',
    database: 'heroku_0069b22dc9c1b23'
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