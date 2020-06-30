const mongoose = require('mongoose');

mongoose.connect('mongodb://ip_note_todo_mongo:27017/todo', {useNewUrlParser: true, useUnifiedTopology: true});

const todoSchema = mongoose.Schema({
    userName: String,
    body: String,
    complete : Boolean
});

const Tasks = mongoose.model('Tasks', todoSchema);

module.exports = {
	addNewTask : function (taskData) {
		let {userName, taskBody} = taskData;
		let newTask = new Tasks({
			_id: new mongoose.Types.ObjectId(),
			userName: userName,
			body: taskBody,
			complete: false
		});

		newTask.save(function(err) {
			if (err) console.log(err);
		})

	},
	updateTask : function (taskId, newData) {
		Tasks.findByIdAndUpdate(taskId, newData,function(err, author) {
			if (err) console.log(err);
			return
		});
	},
	removeTask : function (taskId) {
		Tasks.deleteOne({_id : taskId},function(err, author) {
			if (err) console.log(err);
		});
	},
	getTasks : function (userName) {
		return new Promise((resolve) => {
			Tasks.find({ userName: userName }, function(err, arr) {
				console.log('find', userName);
				if (err) console.log(err);
				resolve(arr);
			});
		})
	},
	getTask : function (taskId) {
		return new Promise((resolve) => {
			Tasks.find({ _id: taskId }, function(err, arr) {
				console.log('find', taskId);
				if (err) console.log(err);
				resolve(arr[0]);
			});
		})
	}
}
