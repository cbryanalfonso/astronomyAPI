const express = require('express');
const astronomy = require('./astronomy.json');
const app = express();

let port = process.env.PORT || 3000;

app.get("/",(req, res) =>{
    res.send("Hello www")
})

app.get('/astronomy', (req, res) => {
    const page = parseInt(1)
    const limit = parseInt(10)

    const startIndex = (page - 1) * limit
    const endIndex = page * limit

    const results = {}

   if(endIndex < astronomy.length){
    results.next = {
        page: page + 1,
        limit: limit
    }
   }

    if(startIndex > 0){
        results.previus = {
            page: page - 1,
            limit: limit
        }
    }
    
    results.results = astronomy.slice(startIndex, endIndex)
    res.json(results)
})

app.listen(port, () =>{
    console.log('escuchando ',port);
})
