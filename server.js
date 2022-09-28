let express = require('express');

let app = express();

app.use(express.static(__dirname+'/dist/pokemon-trainer'));

app.get('/*', (req, resp)=> {
    resp.sendFile(__dirname+'/dist/pokemon-trainer/index.html');
})

app.listen(process.env.PORT || 8080);