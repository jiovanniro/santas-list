import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as path from 'path';
const prerender = require('prerender-node');

prerender.set('prerenderServiceUrl', 'http://localhost:1337/');
prerender.set('prerenderToken', process.env.PRERENDER_TOKEN);

import api from './api';
import * as routing from './middleware/routing.mw';

let PORT = process.env.PORT || 3000; 
let app = express(); 
let clientPath = path.join(__dirname, '../client');

app.use(require('prerender-node'));

app.use(bodyParser.json()); 

app.use(express.static(clientPath));

app.use('/api', api); 

app.get('*', routing.stateRouting);

app.listen(PORT);


//Does not handle passport. Can be added later if req




