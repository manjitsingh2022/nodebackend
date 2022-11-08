const express = require("express");
require("./db/conn");
const User = require("./models/user");
const app = express();
const port = process.env.PORT || 8000;
app.use(express.json());
app.get("/", (req, res) => {
  res.status.send("hello from the other sides");
});

// read the data of registered user
app.get("/user" , async(req, res) =>{
  try{
  const userData = await User.find()
  res.send(userData);
  }catch(e){
  res.send(e);
  }
  })




app.post("/user", (req, res) => {
  console.log(req.body);
  const user = new User(req.body);
  user.save().then(()=>{
    res.send(user)
  }).catch((e)=>{
    res.send(e)
  })
//   res.send("hello from the other sides");
});
app.listen(port, () => {
  console.log(`connection is setup at ${port}`);
});
