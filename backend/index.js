import express from 'express';
import mysql from 'mysql';
import cors from 'cors';
const app = express();
const db = mysql.createConnection({
  host: 'bzmrqhbxlt3q7dkczsfj-mysql.services.clever-cloud.com',
  user: 'upjxttnkttkvjyae',
  password: 'k4Z4E9I26KEZJ0r2eq1j',
  database: 'bzmrqhbxlt3q7dkczsfj',
  port: 3306
});
// ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'root';
app.use(express.json());
app.use(cors());
app.get('/', (req, res) => {
  res.json('hello this is the backend');
});

app.get('/books', (req, res) => {
  const query = 'select * from books';
  db.query(query, (err, data) => {
    if (err) {
      return res.json(err);
    }
    return res.json(data);
  });
});

app.post('/books', (req, res) => {
  const query = 'INSERT INTO books (title, descrpt, cover ,price) VALUES (?)';
  const values = [req.body.title, req.body.descrpt, req.body.cover,req.body.price];
  db.query(query, [values], (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

app.delete('/books/:id', (req, res) => {
  const bookId = req.params.id;
  const q = "DELETE FROM books where id = ?"
  
  db.query(q, [bookId], (err, data) => {
    if (err) return res.json(err);
    return res.json("book deleted successfully");
  });

})

app.put('/books/:id', (req, res) => {
  const bookId = req.params.id;
  const q = "UPDATE books SET title=?,descrpt=?,cover=?,price=? WHERE id = ?";
  const values = [req.body.title, req.body.descrpt, req.body.cover,req.body.price];

  
  db.query(q, [...values,bookId], (err, data) => {
    if (err) return res.json(err);
    return res.json("book updated successfully");
  });

})

const PORT = process.env.PORT || 8800;
app.listen(PORT, () => {
  console.log('connected to backend!!!');
});
