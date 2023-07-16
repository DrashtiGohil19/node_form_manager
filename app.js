var express = require('express');
var mysql = require('mysql');
var bodyParser = require('body-parser');

var con = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"",
    database:"admin"
})

con.connect();

var app = express();
app.use(bodyParser.urlencoded({extended:false}))

app.set('view engine','ejs');

// app.get('/',function(req,res){
//     res.sendFile(__dirname+'/index.html');
    
// })

app.get('/',function(req,res){
    var data = "select * from query";
    con.query(data,function(error,results,fields){
        if(error) throw error;
        res.render("index",{ results })
    })
})

// get method open ejs file

// app.get('/ejs',function(req,res){
//     res.render('index');
// })

app.post('/',function(req,res){
    var name = req.body.name;
    var email = req.body.email;
    var password = req.body.password;
    var gender = req.body.gender;
    var contact = req.body.contact; 
    var address = req.body.address;
    var city = req.body.city;
    var dob = req.body.dob;
    var hobby = req.body.hobby;

    var query = "insert into query(name,email,password,gender,contact,address,city,dob,hobby) values ('"+name+"','"+email+"','"+password+"','"+gender+"','"+contact+"','"+address+"','"+city+"','"+dob+"','"+hobby+"')";

    con.query(query,function(error,results,fields){
        if(error) throw error;

        res.redirect('/');
    })
})

app.get('/delete/:id',function(req,res){
    var id = req.params.id;

    var query = "delete from query where id='"+id+"'"
    con.query(query,function(error,results,fields){
        if(error) throw error;

        res.redirect("/")
    })
})

app.get('/update/:id',function(req,res){
    var id = req.params.id;
    var query = "select * from query where id ='"+id+"'";

    con.query(query,function(error,results,fields){
        if(error) throw error;
        res.render('update',{results})
    })
})

app.post('/update/:id',function(req,res){
    var id= req.params.id;
    var name = req.body.name;
    var email = req.body.email;
    var password = req.body.password;
    var gender = req.body.gender;
    var contact = req.body.contact;
    var address = req.body.address;
    var city = req.body.city;
    var dob = req.body.dob;
    var hobby = req.body.hobby;

    var query = "update query set name='"+name+"',email='"+email+"',password='"+password+"',gender='"+gender+"',contact='"+contact+"',address='"+address+"',city='"+city+"',dob='"+dob+"',hobby='"+hobby+"' where id='"+id+"'";

    con.query(query,function(error,results,fields){
        if(error) throw error;
        res.redirect('/');
    })
})
app.listen(3030);