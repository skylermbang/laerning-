const express = require('express')
const app = express()
const port = 8080

app.use(express.urlencoded({ extended: false })); // request.body ?  to get
app.use(express.json());

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname + '/index.html'));
    //__dirname : It will resolve to your project folder.
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})