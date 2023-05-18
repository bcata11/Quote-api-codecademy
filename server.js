const express = require('express');
const app = express();

const { quotes } = require('./data.js');
const { getRandomElement } = require('./utils.js');

const PORT = process.env.PORT || 4001;

app.use(express.static('public'));

app.get('/api/quotes/random', (req, res, next) => {
    const random = getRandomElement(quotes)
    res.json({quote: random})
})


app.get('/api/quotes', (req, res, next) => {
    //destructuring the param
    const {person} = req.query

    //if there is no person, then send the whole array of quotes
    if(!person) {
        res.send({quotes: quotes})
    } else{
    // else if there is a person, filter the quotes array, and send the quotes which have the matching author
        const personQ = quotes.filter( quote => quote.person === person)
        res.send({quotes: personQ})
    }
})

app.post('/api/quotes', (req,res,next) => {
    //destructuring the params
    const {quote, person} = req.query;
    //if one of the person and quote doesn't exist, send an error
    if( !quote || !person) {
        res.status(400).send()
    } else {
    //else push the new quote in the array
        quotes.push({quote: {quote: quote, person: person}})
        res.status(201).json({quote: {quote: quote, person: person}})
    }
})

app.listen(PORT, () => console.log("listening"))