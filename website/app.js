const express			= require('express');
const config			= require('config');
const bodyParser		= require('body-parser');
const routing			= require('./src/routing');
// set configs
const httpServerPort	= config.get('httpServerPort');
// init server
const app = express();

app.use(express.static('public'));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.listen(httpServerPort, ()=>{console.log(`http server is running on port: ${httpServerPort}`)});
// simple routing
app.get('/', routing.index);
app.get('/login', routing.login);
app.get('/tasks', routing.tasks);
// recive post requests
app.post('/get_tasks', routing.getTasks);
app.post('/add_new_task', routing.addNewTask);
app.post('/toggle_complete_task', routing.toggleCompleteTask);
app.post('/remove_task', routing.removeTask);
