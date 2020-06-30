const path		= require('path');
const mongoWork	= require('../mongoWork');
const htmlPath	= '../../public/html/';

module.exports = {
	index : function (req, res) {
		res.redirect('/login');
	},
	login : function (req, res) {
		res.sendFile(path.resolve(__dirname, `${htmlPath}login.html`));
	},
	tasks : function (req, res) {
		res.sendFile(path.resolve(__dirname, `${htmlPath}tasks.html`));
	},
	getTasks : async function (req, res) {
		let {userName} = req.body;
		console.log('userName', userName);

		let tasks = await mongoWork.getTasks(userName);

		tasks = tasks.map((taskData) => {
			return {
				id : taskData._id,
				body : taskData.body,
				complete : taskData.complete
			}
		})

		res.status(200).end(JSON.stringify({userName, tasks}));
	},
	addNewTask : function (req, res) {
		let {userName, taskBody} = req.body;
		mongoWork.addNewTask({userName, taskBody});

		let data = {'status' : 'success'}
		res.status(200).end(JSON.stringify(data));
	},
	toggleCompleteTask : async function (req, res) {
		let {userName, taskId} = req.body;
		let taskData = await mongoWork.getTask(taskId);
		console.log('toggleCompleteTask');
		console.log(taskData);
		// add validation
		mongoWork.updateTask(taskId, {complete : !taskData.complete });
		let data = {'status' : 'success'}
		res.status(200).end(JSON.stringify(data));
	},
	removeTask : function (req, res) {
		let {userName, taskId} = req.body;
		mongoWork.removeTask(taskId);
		let data = {'status' : 'success'}
		res.status(200).end(JSON.stringify(data));
	}
}
