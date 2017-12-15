import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as path from 'path';
import configurePassport from './config/passport';

import api from './api';
import * as routing from './middleware/routing.mw';
 
let app = express(); 
let clientPath = path.join(__dirname, '../client');
app.use(bodyParser.json()); 

configurePassport(app);

app.use(express.static(clientPath));

app.use('/api', api); 

app.get('*', routing.stateRouting);

app.listen(process.env.PORT || 3000, function (){
    console.log(`listening to port 3000`);
});


