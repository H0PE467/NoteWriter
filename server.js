const express = require('express');
const path = require('path');
const fs = require('fs');
const { log } = require('util');

const app = express();
const PORT = 3001;

app.use(express.static('public'))
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) =>{
    res.sendFile(path.join(__dirname, '/public/index.html'))
})

app.get('/notes', (req, res) =>{
    res.sendFile(path.join(__dirname, '/public/notes.html'))
})

app.get('/api/notes', (req, res) =>{
    res.sendFile(path.join(__dirname, '/db/db.json'))
})


app.post('/api/notes', (req, res) => {

    fs.readFile('./db/db.json','utf8',(err, data) => {
        let fileData = JSON.parse(data);
        fileData.push(req.body)
        fs.writeFile('./db/db.json', JSON.stringify(fileData), (err,data) => {
        });
    })

    res.json({
        status: "success"
    })

})

app.delete('/api/notes/', (req, res) =>{

    fs.readFile('./db/db.json','utf8',(err, data) => {
        
        let fileData = JSON.parse(data);
        let noteTitle = req.body.title;
        let noteText = req.body.text;

        fileData = fileData.filter((element) => {
            if (element.title === noteTitle && element.text === noteText) {
                return false
            }
            return true;
        });
        fs.writeFile('./db/db.json', JSON.stringify(fileData), (err,data) => {
        });
    })

    res.json({
        status: "success"
    })
})



app.listen(PORT, () =>{
    console.log(`Listening to http://localhost:${PORT}`);
})