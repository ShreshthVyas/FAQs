// server.js

const express = require('express');
const cors = require('cors'); 
const faqData = require('./faqData.json'); // Import your FAQ data
const app = express();
const PORT = process.env.PORT || 3000;
const fs = require('fs');
const path = require('path');

app.use(cors());
app.use(express.json());
// Route to serve FAQ data
app.get('/', (req, res) => {
  res.json(faqData);
});



app.post('/admin/add',  (req, res) => {
  const { Questions, Answers , Remarks, Links } = req.body;
  const respath = path.join(process.cwd(), 'faqData.json');
  console.log(respath);
  let faqData = [];

  try {
    const data = fs.readFileSync(respath);
    faqData = JSON.parse(data);
  } catch (err) {
    console.error('Error reading file:', err);
  }

  faqData.push({ Questions, Answers, Remarks , Links });
  console.log(faqData);
  try{
   const check  = fs.writeFileSync(respath, JSON.stringify(faqData, null, 2));
  }
  catch(err){
    console.error('Error reading file:', err);
  }
  res.json({ path: respath });
  res.json({ message: 'FAQ entry added successfully' });
});

app.listen( () => {
  console.log(`Server is running`);
});
