```const express=require("express");
const app=express();
app.use((req,res)=>{
    res.send("hello from the server");
});
app.listen(3000,()=>{
    console.log("server is successfully listening on port 3000..");
    
});
```

- it wll always show a "hello from the server" whatevr be the request i.e if i write  `localhost:3000/hello` it will show the hello from the server


### to change this we have to do changes on the code 

```javascript
const express=require("express");
const app=express();
app.use("/home "(req,res)=>{
    res.send("hello from the server");
});
app.listen(3000,()=>{
    console.log("server is successfully listening on port 3000..");
    
});
```
- while doing this i am getting response on `http://localhost:3000/home  `  not on `http://localhost:3000 ` it shows cannot get

`we need to create different different routes`
> ### `app.get()` is used for handling specific GET requests. This way, /home and /contact won't be affected by the root path /.

>### `app.use()` is for middleware and will trigger for every route if the base path matches. In your case, app.use("/", ...) matches every route since all routes are prefixed with /.


## Difference between  Caret (`^`) vs. Tilde (`~`)

>### In JavaScript (specifically in the context of package management with npm or yarn), the caret (^) and tilde (~) symbols are used in package.json to specify version ranges. They indicate how flexible the versioning of a package is when you're installing dependencies.

## `1.Caret (^):`
- #### The caret symbol allows updates to non-breaking changes based on semver (Semantic Versioning) rules.
- #### It allows updates to `minor and patch versions` but not major versions.
## Example:

```
"lodash": "^4.17.0"
```
- #### This means that the version can update to anything from 4.17.0 to <5.0.0.
- #### It will allow updates like 4.17.1, 4.18.0, etc., but not 5.0.0 because a major version change may introduce breaking changes.

## In summary:
---

- #### ^1.2.3 allows updates to any version >=1.2.3 and <2.0.0.
- #### ^0.2.3 (if the major version is 0) allows updates to >=0.2.3 and <0.3.0 (no major version bump when the major version is 0).

## `2. Tilde (~):`
- The tilde symbol allows updates to the patch version, but not the minor or major version.
It only allows updates within the same minor version.

### **Example**:

```
"lodash": "~4.17.0"
```
- #### This means the version can update to anything from 4.17.0 to <4.18.0.
- #### It will allow updates like 4.17.1, 4.17.2, etc., but not 4.18.0 because the minor version must stay the same.

### In summary:

- #### ~1.2.3 allows updates to >=1.2.3 and <1.3.0.
- #### ~0.2.3 allows updates to >=0.2.3 and <0.3.0.

### Key Differences:

- #### Caret (^) is more permissive and allows updates to both minor and patch versions.
- #### Tilde (~) is more restrictive and only allows updates to patch versions within the same minor version.

## When to use:
- ### `Use caret (^)` when you're okay with` both minor and patch updates`, trusting the package won't introduce breaking changes.
- ### `Use tilde (~)` when you want to restrict updates to `only patch versions`, ensuring more stability
-----
----

### - episode 6 
```javascript
const express = require("express");
const app = express();

app.use("/admin", (req, res, next) => {
  console.log("admin auth is getting checked");
  const token = "xyz";
  const isAdminAuthorized = token === "xyz";
  if (!isAdminAuthorized) {
    res.status(401).send("unauthorized request");
  } else {
    next();
  }
});

// Define a route for /admin
app.get("/admin", (req, res) => {
  res.send("Admin dashboard or other admin-related info");
});

app.get("/user", (req, res) => {
  res.send("user data sent");
});

app.get("/admin/getAllData", (req, res) => {
  res.send("You have access to all data");
});

app.get("/admin/deleteUser", (req, res) => {
  res.send("delete a user");
});

app.listen(3000, () => {
  console.log("Server is successfully listening on port 3000..");
});
```

#### 1. app.use()
- **Purpose:** app.use() is used to apply middleware. Middleware functions are executed in sequence for every incoming request that matches the given path, regardless of the HTTP method (e.g., GET, POST, PUT).
- **Execution:** It doesn't care about the specific HTTP method (GET, POST, etc.) and applies to all of them unless you specify otherwise.
- **Path:** It can take a path (like /admin) and apply the middleware to any route that starts with that path (e.g., /admin/getAllData, /admin/deleteUser).
 ```
 app.use("/admin", (req, res, next) =>
  {
  console.log("Checking authorization for admin routes");
  next(); 
  // Move to the next middleware or route handler
});
```
- In this example, any request to a path that starts with /admin (like /admin/getAllData) will trigger this middleware. It will run for all HTTP methods.

#### **2. app.get()**
- **Purpose:** app.get() is used to define a route that responds to GET requests. It listens for GET requests on a specific path and executes the associated callback function.
- **Execution:** Only responds to GET requests.
- **Path:** It is tied to a specific route and will only handle GET requests to that exact path (or a path pattern).

 **Example:**

```
app.get("/user", (req, res) => {
  res.send("User data sent");
});
```
- In this example, only GET requests to /user will be handled by this route. It won’t affect POST, PUT, or other methods.

```javascript
const express = require("express");
const app = express();
const { adminAuth } = require("./middlewares/auth.js");

app.use("/admin",adminAuth);

app.get("/admin",(req,res)=>{
  res.send("finally on admin using  get");
  
})

app.get("/user", (req, res) => {
 
  res.send("user data sent");

});

app.get("/admin/getAllData", (req, res) => {
 
    res.send("You have access to all data");
 
});
app.get("/admin/deleteUser",(req,res)=>
{
  res.send("delte a user");
});


app.listen(3000, () => {
  console.log("Server is successfully listening on port 3000..");
});
```

## Connecting database to the server..
- first we have to create a config folder then inside this we have to create a database.js file

- make suree you have install mongoose `(npm i mongoose)`

#### how the database structure looks like

```javascript
const mongoose=require('mongoose');

const connectDB=async()=>
{
    await mongoose.connect(
        "mongodb+srv://sumitchaubey76:Tq9KWbiJafPhz9qu@mongodbtest.9axqh.mongodb.net/DevTinder"
                          );
};
connectDB().then(()=>{
    console.log("database connection established");
    
}).catch((err)=>
{
    console.log("database cannot be connected");
    
});
```
#### how app.js structue looks like

```javascript
const express = require("express");
require("./config/database");
const app = express();

app.listen(3000, () => {
  console.log("Server is successfully listening on port 3000..");
});
```
- **but this is not right way to do it becausee first it goes to server then database is coonecting.**  

```
Server is successfully listening on port 3000..
database connection established
```

### now we need to first database coonction established then server is running on port 3000 i.e  `this is the right process`

## good way
#### `app.js file`
```javascript
const express = require("express");
const connectDB=require("./config/database");
const app = express();

connectDB().then(()=>{
  console.log("database connection established");
  app.listen(3000, () => {
    console.log("Server is successfully listening on port 3000..");
  });
  
  
}).catch((err)=>
{
  console.log("database cannot be connected");
  
});
```
---

### Database.js file inside comfig
```javascript
const mongoose=require('mongoose');

const connectDB=async()=>
{
    await mongoose.connect(
        "mongodb+srv://sumitchaubey76:Tq9KWbiJafPhz9qu@mongodbtest.9axqh.mongodb.net/DevTinder"
                          );
};
module.exports=connectDB
```
```
database connection established
Server is successfully listening on port 3000..
```
------
## How to create schema

- **we need to create a folder models and inside this user.js folder**
```javascript
const mongoose=require('mongoose');

const userSchema= new mongoose.Schema({
    firstName:{
        type: String,
    },
    lastName:{
        type:String
    },
    emailId:{
        type: String,
        unique: true
    },
    password:{
        type: String
    },
    age:{ 
        type: Number
    },
    gender:{
        type:String
    }

    });
    // const User= mongoose.model("User",userSchema);
    // module.exports=User; 

    //or
    module.exports=mongoose.model("User",userSchema);
```
> **this is schema we need to do write the same details as given in the schema `if we do not write a same name we will get error`**

#### **in app.js we need to add user instance**
```javascript
const express = require("express");
const connectDB=require("./config/database");
const app = express();


constUser=require("./models/user");//

app.post("/signup", async(req,res)=>{
  const user=new User({
    firstName:"sumit",
    lastName:"chaubey",
    emailId:"sumit76@gmail.com",
    password:"123456"
  });
  await user.save();
  res.send("user added successfully");

}) //

connectDB().then(()=>{
  console.log("database connection established");
  app.listen(3000, () => {
    console.log("Server is successfully listening on port 3000..");
  });
  

  
}).catch((err)=>
{
  console.log("database cannot be connected");
  
});
```
`// means added code`
---
**after this we need to call a API through postman ie. `http://localhost:3000/post` it will give response**
---------
**and after this we get a data in my cluster database which i have created DeVTinder inside this i.e `DevTinder.users` i get all details**

>- `devTinder` is a database.
>- `users` is a collection.
>- the info inside it , is a document

### __it is better to add in try and catch block__ (error handling)
```javascript
try{
    await user.save();
    res.send("user added successfully");
  }
  catch(err){
    res.status(400).send("error while adding user");
  }
  
  ```
  ---
  # EPISODE 7⬇️
  ### __Javascript Object vs JSON__
  **1. JavaScript Object**
  - `Type:` A built-in data type in JavaScript.

- `Usage:` Used to store key-value pairs, functions, and other complex data in JavaScript code.

 **`Syntax:`**

- Properties can be unquoted.
- Can include methods (functions).
- Flexible in terms of data types (numbers, strings, arrays, functions, etc.).
```javascript
let person = {
  name: 'John',
  age: 30,
  greet: function() {
    console.log('Hello');
  }
};
```
 **2. JSON(javascript object notation)**

 
- `Type:` A lightweight data interchange format.

- `Usage:` Used primarily for data transmission (e.g., between client and server) and data storage.

**`Syntax:`**

- Keys and strings must be double-quoted.
- Does not support functions or undefined values.
- Supports simple data types like strings, numbers, booleans, arrays, and objects.
```json
{
  "name": "John",
  "age": 30
}
```
---

| Feature | JS Object | JSON|
| -------- | ------- |--------|
| **Format** | Flexible|Strict (double quotes for keys)|
| **Data Types** | Can include functions, undefined |Only supports simple data types|
| **Use** |For working with data in JavaScript code |For data storage/transfer|
|**Methods**|can have methods| cannot include methods|

- ### this data is hard-coded  we need to pass dynamic data 
- we will go to postman then will go to request then body=>raw=>JSON 
- now in json we have to pass dynamic data in json format.
```json
{
    "firstName":"kahuri",
    "lastName":"singh",
    "emailId":"sarfbjd@gmail.com",
    "password}":"12345"
}

```
- now  to access the body of json we need to  do a `req.body`
- but it will give **undefined** because our server is  unable to read the json data
- to read the json data we need a help of middleware 

- a middleware which is given by express ie. `express.json`
- and we know how to use middleware  using app.use
```
app.use(express.json());
```
- we need to simply add  `req.body` inside the new User

```javascript
const express = require("express");

const connectDB=require("./config/database");

const app = express();

const User=require("./models/user");
 app.use(express.json());✅

app.post("/signup", async(req,res)=>{
  //console.log(req.body);
  
 const user=new User(req.body);✅
  try{   
    await user.save();
    res.send("user added successfully");
  } 
  catch(err){
    res.status(400).send("error while adding user");
  }
 
})  
connectDB().then(()=>{
  console.log("database connection established");
  app.listen(3000, () => {
    console.log("Server is successfully listening on port 3000..");
  });
  

  
}).catch((err)=>
{
  console.log("database cannot be connected");
  
});
```
- tick ✅ one change only.
- now user will add in the mangodb database by sending req to the server (postman)

## now i will a feed api
- Feed API-get/feed -get all the users from the database

### **get user by email**
```javascript
app.get("/user", async (req,res)=>{
  const userEmail=req.body.emailId;
try{
  const users= await User.find({emailId: userEmail});
  res.send(users);
}
catch(err){
  res.status(404).send("user not found");
}
})
```
- **now suppose there is no user found then what.**
- i will add condition here

```javascript
app.get("/user", async(req,res)=>{
  try{
    const users= await User.find({emailId:req.body.emailId});
    if(users.length===0)
    {
      res.status(404).send("user not found");
    }
    else{

res.send(users);
  }
    }
    
  catch(err){
    res.status(404).send("something went wrong");
  }
})

```
---
## feed API -GET/feed -`get all the users from the database`

```javascript
app.get("/feed", async(req,res)=>{
  try {
    const users= await User.find({});
    res.send(users);
    
  } catch (error) {

     res.status(404).send("something went wrong");
  }

});
```
### **now let suppose we have to same emailId then what i will do**
-  i will  use findOne();
```javascript
app.get("/user",async(req,res)=>
{
  const userEmail=req.body.emailId;
  try{
    const user=User.findOne({emailId:userEmail});
    if(!user)
    {
      res.status(404).send("user not found") 
         }
         else
         {
           res.send(user);
         }
  }
  catch(err){
    res.status(404).send("user not found");
  }

})
```
- but we should not add same email ,email should be unique

## deleting a user by its id
```javascript
app.delete("/user",async(req,res)=>
{
  const userId=req.body.userId;
  try{
    const user=await User.findByIdAndDelete({userId});
    res.send("user deleted successfully");
  }
  catch(e){
    res.status(404).send("somethig went wrong");
  }
})
```
- now postman me body ke json format me likna hai
```json
{
  "userId":"jo bhi id hogii"
}
```
# **PUT vs PATCH in HTTP Methods**

The main difference between **PATCH** and **PUT** lies in **how they update resources** on the server:

## 1. **PUT (Replace Entire Resource)**

**PUT** is used when you want to **replace the entire resource** on the server with the new data provided in the request.

- If the resource exists, it will be fully replaced with the new data.
- If the resource doesn’t exist, **PUT** can also create a new resource (depending on how the server is designed).
- **Idempotent**: Multiple **PUT** requests with the same data will result in the same resource state on the server, meaning the request can be repeated without changing the resource further.

### Example of PUT:

If you have a resource (e.g., user) at `/users/1`, and you want to update the entire resource:

```json
PUT /users/1
{
  "firstName": "John",
  "lastName": "Doe",
  "emailId": "john.doe@example.com",
  "age": 30,
  "gender": "Male"
}
```
- This request will replace all fields of the resource, including fields that aren’t provided in the request (those will be removed or set to default if missing in the body)


## 1. **PATCH (Partial Update)**
- **PATCH** PATCH is used when you want to **partially update** a resource, modifying only the specific fields sent in the request.
- **PATCH** does not replace the entire resource—only the provided fields are updated, and other fields remain unchanged.
- `Non-idempotent by default`, but can be designed to be idempotent in certain implementations.

### Example of Patch:
 if you want to update the `age` field of the user at `/users/1`:
  ```json
  PATCH /users/1
{
  "age": 31
}
  ```
## Key Differences Between PUT and PATCH

| **Feature**            | **PUT**                              | **PATCH**                            |
|------------------------|--------------------------------------|--------------------------------------|
| **Purpose**            | Replace the entire resource          | Partially update a resource          |
| **Request Body**       | Contains the full resource           | Contains only the fields to update   |
| **Effect**             | Replaces the whole resource          | Updates specific fields only         |
| **Missing Fields**     | Removes or sets missing fields to default | Unchanged if not included in the request |
| **Idempotent**         | Yes (repeating the same request has the same effect) | Not guaranteed to be idempotent unless designed that way |
| **Common Use Case**    | Full updates (e.g., replacing a document) | Partial updates (e.g., changing one or two fields) |


## When to Use

- **Use PUT** when you need to replace or create a resource with a complete new representation.
- **Use PATCH** when you only want to update specific fields of a resource without affecting the rest.

---
### update data of the user using id.
```javascript
app.patch("/user",async(req,res)=>
{
  const userId=req.body.userId;
  const data=req.body;
  try{
    await User.findByIdAndUpdate({_id:userId},data);
    res.send("user added successfully");
  }
  catch(e){
    res.status(404).send("something went wrong");
  }
})
```
## update the user with emailId 

```javascript
app.patch("/user",async(req,res)=>
  {
     const emailId=req.body.emailId;
        const data=req.body;
        try{
          await User.findOneAndUpdate({emailId},data);
          res.send("user added successfully");
        }
        catch(e){
          res.status(404).send("something went wrong");
        }
})
```
 ### in postman json file will looks like
 
 ```json
 {
    "emailId":"sardar@gmail.com",
        "firstName": "haaha",
        "lastName": "singh"
}
 ```
# EPISODE 8


### custom validator
```javascript
gender:{
  type:   String,
  validate(value)
  {
    if(!["male", "female","others"].includes(value))
    {
      throw new Error("gender data is not valid");
    }
  },

}

```
- buut it will only work   when we add the user or object ,not on the updating the user on updating the user  

- for this we need to add  runValidators:true, inside the await User.findByIdAndUpdate() method

```javascript
app.patch("/user",async(req,res)=>
  {
     
    const userId=req.body.userId;
    const data=req.body; 
    try{
      await User.findByIdAndUpdate({ _id:userId },data,{
        runValidators:true,
      });
      
      res.send("user added successfully");
    }
    catch(e){
      res.status(404).send("something went wrong" +e.message);
    }
  });
  ```
- now it will work on updating the user

### timestamps in database
- we pass it as a second parameter in a schema
 ```javascript
 const userSchema=new mongoose.Schema({
    firstName:{
        type: String,
    },
    lastName:{
        type:String
    }
    },{timestamps:true},);
     
 ```
## Api level validation

- **`API LEVEL Validation`  is a process where  data is validated when it is send through an api before being stored to database**
  - it ensures only correct,,complete and secured data is send to db
  - it allows ony the required fields and filter out the unnecesaary fields thst are injected by any attacks.

```javascript
app.patch("/user",async(req,res)=>
  {
     
    const userId=req.body.userId;
    const data=req.body; 
    try{
      ▶️const Allowded_fields=["about","skill"]
      ▶️const isUpdated=Object.keys(data).every((k)=>
      ▶️Allowded_fields.includes(k));
      ▶️if(!isUpdated){
        throw new Error("Invalid fields to update");
      }
      await User.findByIdAndUpdate({ _id:userId },data,{
        runValidators:true,
      });
      
      res.send("user added successfully");
    }
    catch(e){
      res.status(404).send("something went wrong" +e.message);
    } 
  },
  );
  ```
  > this ▶️ indicates the changes in  code

- if there is any mismatch in the incoming data like addition of extra field it will throw an error which is catched by catch block




  





















