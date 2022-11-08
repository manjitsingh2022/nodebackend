const express = require("express");
require("./db/conn");
const Student = require("./models/students");
const app = express();
const port = process.env.PORT || 8000;
app.use(express.json());
app.get("/", (req, res) => {
  res.status.send("hello from the other sides");
});

// read the data of registered Students
app.get("/students" , async(req, res) =>{
  try{
  const studentsData = await Student.find()
  res.send(studentsData);
  }catch(e){
  res.send(e);
  }
  })




app.post("/students", (req, res) => {
  console.log(req.body);
  const user = new Student(req.body);
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
