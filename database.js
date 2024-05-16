const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const dbConn = require('./config/db');



app.use('/src', express.static('src'));

// Middleware - บอกวิธีการที่ client ส่งข้อมูลผ่าน middleware
app.use(bodyParser.urlencoded({extended:false})) // ส่งผ่าน Form
app.use(bodyParser.json()) // ส่งด้วย Data JSON



app.use((req, res, next) => {
    if (res.locals.redirectUrl) {
        res.redirect(res.locals.redirectUrl);
    } else {
        next();
    }
});


app.get("/", (req, res)=>{
   
    res.sendFile(__dirname + '/students.html');
  } );

//  GET students

app.get('/students', async (req,res) => {
    const connection = await dbConn
    const rows = await connection.query('SELECT * from students')
    res.send(rows)
})

// GET students/:id 
app.get('/students/:id', async (req,res)=>{
    const connection = await dbConn
    const rows = await connection.query('SELECT * from students where id = ' +req.params.id)
    res.send(rows)
})

// เมื่อ Delete แล้วควรส่ง status แจ้งให้ผู้ใช้ทราบด้วย เช่น code 204
// localhost:3000/students/2
app.delete('/students/:id', async (req,res)=>{

    const connection = await dbConn
    await connection.query('Delete from students where id = ' +req.params.id)
    res.status(204).json("Deleted id " + req.params.id + " successful" )
    
})

// ทำ POST /students สำหรับข้อมูล student 1 คน
// JSON Body-Parser 
/*
{
    "name":"Oak",
    "age":"22",
    "phone":555,
    "email":"oak@email.com"
}
*/
app.post('/students', async (req, res) => {
    // console.log(req.body.name);
    // console.log(req.body.age);
    // console.log(req.body.phone);
    // console.log(req.body.email);

    try {
        const { name, age, phone, email } = req.body;
        const connection = await dbConn;
        const [result] = await connection.execute("INSERT INTO students (name, age, phone, email) VALUES (?, ?, ?, ?)", [name, age, phone, email]);
      
        res.status(201).json({ message: 'Data inserted successfully', insertedId: result.insertId });
    
    } catch (error) {
        console.error('Error inserting data:', error);
        res.status(500).json({ error: 'An error occurred while inserting data' });
        console.log(error);
      
    }

});

// PUT
/*
{
    "name":"Oak",
    "age":"22",
    "phone":555,
    "email":"oak@email.com"
}
*/
app.put("/students/:id", async (req, res) => {
    // รับ id จาก params
    const id = req.params.id;
    // ส่งข้อมูลผ่าน body-parser (Middleware)
    const name = req.body.name;
    const age = req.body.age;
    const phone = req.body.phone;
    const email = req.body.email;

    const connection = await dbConn
    const rows = await connection.query("Update students set name = '"+name+"', age = '"+age+"', phone = "+phone+", email = '"+email+"' where id = "+id+" ")
    res.status(201).send(rows)
})



app.get("/query-1", async (req, res) => {
    const connection = await dbConn
    const rows = await connection.query('SELECT * from students')
    res.send(rows);
})

app.get("/query-2", async (req, res) => {
    const connection = await dbConn
    const rows = await connection.query('SELECT * from students')
    res.send(rows);
})

app.listen(3000, async() => {
    console.log("Server is running at port 3000")
      // Connect to the database
      try {
        await dbConn; 
        console.log('Database connection successful');
    } catch (error) {
        console.error('Error connecting to database:', error);
    }
})
