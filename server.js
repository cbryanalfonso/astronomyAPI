const express = require('express');
const astronomy = require('./astronomy.json');
const app = express();

let port = process.env.PORT || 3000;

app.get("/",(req, res) =>{
    res.send("Hello www")
})

app.get('/astronomy', (req, res) => {
    const page = parseInt(req.query.page ? req.query.page : 1 )
    const limit = parseInt(req.query.limit ? req.query.limit : 10) 

    

    const startIndex = (page - 1) * limit
    const endIndex = page * limit

    const results = {}

   if(endIndex < astronomy.length){
     results.next = {
        page: page,
        limit: limit
    } 

    results.siguiente = {
        siguiente: `https://astroapinodejs.herokuapp.com/astronomy?page=2&limit=10`
    }
   
   }

    if(startIndex > 0){
         results.previus = {
            page: page,
            limit: limit
        } 
       
    }
    
    results.results = astronomy.slice(startIndex, endIndex)
    res.json(results)
})

app.listen(port, () =>{
    console.log('escuchando ',port);
})
