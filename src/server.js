const express = require('express');
const cors = require('cors');
const routes = require('./routes');

const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);    
 
 
//localhost:3333
app.listen(process.env.PORT || 3000);