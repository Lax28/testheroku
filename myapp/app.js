var express = require('express')
var bodyParser = require('body-parser')
var app =  express();
var jsonParser = bodyParser.json()

const customers = [
    {id:1, name: "John"},
    {id:2, name: "Marie"},
    {id:3, name: "Claire"}
]

app.get ('/', (req,res) => {
    res.send('hello world');
});

app.get ('/api/customers', (req,res) => {
    res.send('[1, 2, 3');
});

//GET Method
app.get('/api/customers/:id', (req,res) => {
    const customer = customers.find(c => c.id == parseInt(req.params.id));
    if(!customer){
        res.status(404).send('The ID was not found')
    };

    res.send(customer)
})

//POST Method
app.post('/api/customers', jsonParser, function (req,res) {
    if(!req.body.username || req.body.username.length < 3){
        //400 bad request
        res.status(400).send('selamat!');
    };
    cur_id = customers.length + 1
    const customer = {
        id: cur_id,
        username: req.body.username,
    };

    customers.push(customer);
    res.send(customer);
})

//PUT Method
app.put('/api/customers/:id', (req, res) => {
    const customer = customers.find(c => c.id == parseInt(req.params.id));
    if(!customer){
        res.status(404).send('The ID was not found')
        return;
    };

    //Name Validation
    if(!req.body.name || req.body.name.length <3){
        //400 bad request
        res.status(400).send('Input the valid name');
        return;
    };
})

//DELETE Method
app.delete('/api/customers/:id', (req, res) => {
    const customer = customers.find(c => c.id == parseInt(req.params.id));
    if(!customer){
        res.status(404).send('The ID was not found')
    };

    const index = customers.indexOf(customer)
    customers.splice(index, l);

    res.send(customer);
})

app.listen(3000, () => console.log('Listening to port 3000'))
