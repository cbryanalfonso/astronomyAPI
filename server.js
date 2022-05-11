const express = require('express');
const astronomy = require('./astronomy.json');
const app = express();
const cors = require('cors')

let port = process.env.PORT || 8080;

app.use(cors())

app.get("/", (req, res) => {
    res.send("Hello www")
})



app.get('/astronomy', (req, res) => {
    const page = parseInt(req.query.page ? req.query.page : "1")
    const limit = parseInt("9")

    const startIndex = (page - 1) * limit
    const endIndex = page * limit

    const results = {}


    if (req.query.id) {
        const filters = req.query;
        const filteredUsers = astronomy.filter(user => {
            let isValid = true;
            for (key in filters) {
                isValid = isValid && user[key] == filters[key];
               // console.log(isValid);
            }
            return isValid;
        });
        res.json(filteredUsers);
    } else if (req.query.search) {
        const include = req.query;
        const filteredAstro = astronomy.filter(user => {
            let isValid = true;
            for (key in include) {
               // isValid = isValid && user[key] == filters[key];
               if(user.title.toLowerCase().includes(req.query.search.toLowerCase())){
               // console.log(user.title.toLowerCase().includes(req.query.search.toLowerCase()));
                isValid= true;
               }else{
                   //console.log('as');
                   isValid=false;
               }
            }
            return isValid;
        });
        res.json(filteredAstro);
    } else if (req.query.page) {
        if (endIndex < astronomy.length) {
            results.next = {
                next: `https://astroapinodejs.herokuapp.com/astronomy??page=${(page + 1)}&limit=${limit}`
            }
        }

        if (startIndex > 0) {
            results.previus = {
                previus: `https://astroapinodejs.herokuapp.com/astronomy?page=${(page - 1)}&limit=${limit}`
            }

        }
        results.results = astronomy.slice(startIndex, endIndex)
        res.json(results)
    } else {
        if (endIndex < astronomy.length) {
            results.next = {
                next: `https://astroapinodejs.herokuapp.com/astronomy?page=${(page + 1)}&limit=${limit}`
            }
        }

        if (startIndex > 0) {
            results.previus = {
                previus: `https://astroapinodejs.herokuapp.com/astronomy??page=${(page - 1)}&limit=${limit}`
            }

        }

        results.results = astronomy.slice(startIndex, endIndex)
        res.json(results)
    }



})

app.listen(port, () => {
    console.log('escuchando ', port);
})
