
const express = require('express');
const mysql = require('mysql2');
const app = express();

app.get('/students', (req, res) => {
 const connection = mysql.createConnection({
   host: 'localhost',
   user: 'root',
   password: '',
   database: 'pim_database',

 });


 
 app.get("/", (req, res)=>{
   
  res.sendFile(__dirname + '/index.html');
} );





 // เปิด connection ไปที่ database
 connection.connect((err) => {
  if (err) {
     console.error('Error connecting to MySQL server:', err);
     return;
  }
  console.log('เชื่อมต่อ mysql สำเร็จ');
});

 

 connection.query('SELECT * from students where id = 3', (err, rows, fields) => {
   if (err) throw err;

   // return response กลับไปหา client โดยแปลง record เป็น json array
   res.json(rows);
 });

 // ปิด connection
 connection.end();
});

app.listen(3000, () => {
 console.log('server started on port 3000!');

});

