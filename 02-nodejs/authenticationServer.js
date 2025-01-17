/**
  You need to create a HTTP server in Node.js which will handle the logic of an authentication server.
  - Don't need to use any database to store the data.

  - Save the users and their signup/login data in an array in a variable
  - You can store the passwords in plain text (as is) in the variable for now

  The expected API endpoints are defined below,
  1. POST /signup - User Signup
    Description: Allows users to create an account. This should be stored in an array on the server, and a unique id should be generated for every new user that is added.
    Request Body: JSON object with username, password, firstName and lastName fields.
    Response: 201 Created if successful, or 400 Bad Request if the username already exists.
    Example: POST http://localhost:3000/signup

  2. POST /login - User Login
    Description: Gets user back their details like firstname, lastname and id
    Request Body: JSON object with username and password fields.
    Response: 200 OK with an authentication token in JSON format if successful, or 401 Unauthorized if the credentials are invalid.
    Example: POST http://localhost:3000/login

  3. GET /data - Fetch all user's names and ids from the server (Protected route)
    Description: Gets details of all users like firstname, lastname and id in an array format. Returned object should have a key called users which contains the list of all users with their email/firstname/lastname.
    The users username and password should be fetched from the headers and checked before the array is returned
    Response: 200 OK with the protected data in JSON format if the username and password in headers are valid, or 401 Unauthorized if the username and password are missing or invalid.
    Example: GET http://localhost:3000/data

  - For any other route not defined in the server return 404

  Testing the server - run `npm run test-authenticationServer` command in terminal
 */

const express = require("express")
const PORT = 3000;
const app = express();
const bodyParser = require('body-parser')
// write your logic here, DONT WRITE app.listen(3000) when you're running tests, the tests will automatically start the server

//FUNCTIONS FOR MIDDLEWARES
// function middleware1(req , res , next){
//   console.log("from middleware "  + req.headers.count);
//   next();
// }

// //middlewares
// app.use(middleware1);  
app.use(bodyParser.json());
var account = []; 

//function of HTTPS handelers

function signupHandler(req , res){
  
  //condition for already existing username
  var count=0;
  var found = false;
  account.forEach(obj=>{
    if(obj.username==req.body.username){
      
      found =true;
    }
  })
  if(found){
    res.status(400).send("Username already exists");
    return;
  }
  //extracting values of body
  var username = req.body.username;
  var id = Math.floor(Math.random()*1000);
  var password = req.body.password;
  var firstName = req.body.firstName;
  var lastName = req.body.lastName;

  var obj = {
    "id":id,
    "username":username,
    "password":password,
    "firstName": firstName,
    "lastName":lastName
  }
  account.push(obj);
  
  account.sort((a,b)=>  
  {return (a.id-b.id)});
  res.status(201).send( account);
}

function loginHandler(req ,res){
  var username = req.body.username;
  var password = req.body.password;

  var authentication = authenticate(username , password);
 // console.log(authentication)
  if(authentication == false){
    res.status(401).send("Unauthorised")
    return;
  }

  authentication = {
    "token-value": authentication
  }
  res.status(200).send(authentication);
    
}
function authenticate(userName , passWord){
  var foundUser = false;
  //console.log(account);
 // console.log("this is waht is sent" + userName+ " " + passWord);
  account.forEach(obj=>{
   // console.log(obj.username + " " + userName);
    if(obj.username==userName ){
      
      foundUser = true;
    }
  })
  if(foundUser == true){
    return "Random authorization token "
  }else{
    return foundUser;
  }
 
}
function dataHandler(req, res){
  
}
//HTTP SERVERS DESCRIPTION
app.post('/signup' , signupHandler);
app.post('/login' , loginHandler);
app.get('/data' , dataHandler);


//express lsitner
app.listen(PORT, ()=>{
  console.log(`app listeneing in port ${PORT}`);
})


//no idea what this is 
//module.exports = app;
