const express = require('express');
const path = require('path');
const app = express();

//static file
app.use(express.static(path.join(__dirname , "public")));

//listen to port
const PORT = process.env.PORT || 5000;
app.listen(PORT , ()=>console.log(`Page running on port : ${PORT}`))