const UI = (function(){

	const ul = document.querySelector('.list-group');
	const emptyAlert = document.querySelector('.empty-alert');

	const listTemplate = function(task) {
		//create li - list-item
		let li = document.createElement('li');
		li.textContent = task.text;
		li.className = 'list-group-item d-flex align-items-center';
		li.setAttribute('data-id', task.id);

		//create icon time(delete)
		let iDelete = document.createElement('i');
		iDelete.className = 'fas fa-times delete-item ml-auto cursor';


		//append
		li.appendChild(iDelete);

		return li;

	}

	const addTask = function(task) {
		ul.insertAdjacentElement('afterbegin', listTemplate(task));
	}

	const deleteTask = function (id) {
		const li = ul.querySelector(`[data-id="${id}"]`);
		li.remove();
	}

	const checkList = function() {
		if(!ul.children.length){
			emptyAlert.style.display = 'block';
		} else {
			emptyAlert.style.display = 'none';

		}
	}

	const deleteAll = function() {
		ul.innerHTML = '';
	}

	const search = function(tasks) {
		deleteAll();
		tasks.forEach(tsk => ul.insertAdjacentElement('afterbegin', listTemplate(tsk)));
	}

	return {
		addTask,
		deleteTask,
		checkList,
		deleteAll,
		search
	}
}())