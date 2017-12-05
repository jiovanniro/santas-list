import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as path from 'path';


import api from './api';
import * as routing from './middleware/routing.mw';

let PORT = process.env.PORT || 3000; 
let app = express(); 
let clientPath = path.join(__dirname, '../client');
app.use(bodyParser.json()); 

app.use(express.static(clientPath));

app.use('/api', api); 

app.get('*', routing.stateRouting);

app.listen(PORT, function (){
    console.log(`listening to port ${PORT}`);
});


//Does not handle passport. Can be added later if req




