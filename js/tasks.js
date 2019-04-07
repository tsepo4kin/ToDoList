// init id module
const id = Id;

const Tasks = (function(){

	let searchTsk = [];
	let tasks = [];
	let instance;

	const getTasks = function () {
		return tasks;
	}

	const setTasks = function (array) {
		tasks = array;
		return tasks;
	}

	const addTask = async function (task) {
		task.id = id.generate();
		await tasks.unshift(task);
		return task;
	}


	const removeTask = async function(id) {
		tasks = await tasks.filter(task => task.id !== id);
		return tasks
	}

	const removeAll = function() {
		tasks = [];
	}

	const searchTask = async function (txt, tasksArr) {
		searchTsk = await tasksArr.filter(tsk => {
			let str = '';
			for(let i = 0; i < tsk.text.length; i++) {
				str += tsk.text[i];
				if(str.toLowerCase() == txt.toLowerCase()) {
					return true;
				}
			}
			return false;
		})
		return searchTsk;
	}

	const createInstance = function () {
		return {
			getTasks,
			setTasks,
			addTask,
			removeTask,
			removeAll,
			searchTask
		}
	}

	return {
		getInstance: function() {
			return instance || (instance = createInstance());
		}
	}

}());