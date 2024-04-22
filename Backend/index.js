// server.js

const express = require('express');
const cors = require('cors'); 
const faqData = require('./faqData.json'); // Import your FAQ data
const app = express();
const PORT = process.env.PORT || 3000;
const fs = require('fs');

app.use(cors());
app.use(express.json());
// Route to serve FAQ data
app.get('/', (req, res) => {
  res.json(faqData);
});

// const checkAdminCredentials = (req, res, next) => {
//   const { username, password } = req.body;

//   // Check if both username and password are correct
//   if (username === 'parth' && password === 'atharv') {
//     // If credentials are correct, proceed to the next middleware
//     next();
//   } else {
//     // If credentials are incorrect, send a 403 Forbidden response
//     res.status(403).json({ message: 'Invalid admin credentials' });
//   }
// };


app.post('/admin/add',  (req, res) => {
  const { Questions, Answers , Remarks, Links } = req.body;
  
  let faqData = [];
  try {
    const data = fs.readFileSync('faqData.json');
    faqData = JSON.parse(data);
  } catch (err) {
    console.error('Error reading file:', err);
  }

  faqData.push({ Questions, Answers, Remarks , Links });
  console.log(faqData);
  try{
   const check  = fs.writeFileSync('faqData.json', JSON.stringify(faqData, null, 2));
  }
  catch(err){
    console.error('Error reading file:', err);
  }

  res.json({ message: 'FAQ entry added successfully' });
});

app.listen( () => {
  console.log(`Server is running`);
});
