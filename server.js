const express = require('express')
const astronomy = require('./astronomy.json')
const app = express()

app.get("/",(req, res) =>{
    res.send("Hello")
})

app.get('/astronomy', (req, res) => {
    const page = parseInt(req.query.page)
    const limit = parseInt(req.query.limit)

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

app.listen(process.env.PORT || 3000)
