// init tasks module
const tasks = Tasks.getInstance();

// init ui module
const ui = 	UI;

//  init localStorage module
const localstorage = LocalStorage;

// init notification
const notification = Notification;

// init observer
const addTaskObserver = new EventObserver();
const removeTaskObserver = new EventObserver();
const removeAllTaskObserver = new EventObserver();

// subscribe on add task event
addTaskObserver.subscribe(localstorage.update);
addTaskObserver.subscribe(notification.show);
addTaskObserver.subscribe(ui.checkList);

removeTaskObserver.subscribe(localstorage.update);
removeTaskObserver.subscribe(notification.show);
removeTaskObserver.subscribe(ui.checkList);

removeAllTaskObserver.subscribe(localstorage.update);
removeAllTaskObserver.subscribe(notification.show);
removeAllTaskObserver.subscribe(ui.checkList);
// init elements
const form = document.forms['addToDoItem'];
const inputText = form.elements['toDoText'];
const inputSearch = document.getElementById('searchItem');
const ul = document.querySelector('.list-group');
const clearBtn = document.querySelector('.clear-btn');
const searchBtn = document.querySelector('.search-btn');
const restSearch = document.querySelector('.rest-btn');

window.addEventListener('load', function(e){
	let ls = localstorage.getTasks();
	if(ls.length) {
		ls.forEach(task => {
			tasks.addTask(task)
				.then(task => ui.addTask(task))
		});
	} else {
		ui.checkList();
	}
})

form.addEventListener('submit', function(e){
	e.preventDefault();

	if(!inputText.value) {
		// show error, is-invalid
	} else {
		tasks.addTask({ text: inputText.value })
			.then(task => ui.addTask(task))
			.then(() => addTaskObserver.fire({
				text: 'Новая задача добавлена успешно!',
				class: 'alert alert-success'
		}));
	}
})

ul.addEventListener('click', function(e){
	if(e.target.classList.contains('fa-times')){
		let id = e.target.closest('li').getAttribute('data-id');
		tasks.removeTask(id)
			.then(() => ui.deleteTask(id))
			.then(() => removeTaskObserver.fire({
				text: 'Задача успешно удалена',
				class: 'alert alert-warning'
			}))
	}
})

clearBtn.addEventListener('click', function(e){
	tasks.removeAll()
		.then(()=> ui.deleteAll())
		.then(()=> removeAllTaskObserver.fire({
			text: 'Все задачи успешно удалены',
			class: 'alert alert-danger'
		}))
})

searchBtn.addEventListener('click', function(e) {
	e.preventDefault();
	let ls = localstorage.getTasks();
	if(ls.length) {
		tasks.searchTask(inputSearch.value, ls)
			.then((res) => ui.search(res))
			.then(res => {
				if(!res) ui.checkList();
			})

	} else {
		ui.checkList();
	}
})

restSearch.addEventListener('click', function(e) {
	e.preventDefault();
	inputSearch.value = '';
	let ls = localstorage.getTasks();
	if(ls.length == ul.children.length) return;
	if(ls.length) {
		ui.deleteAll();
		ls.forEach(task => {
			tasks.addTask(task)
				.then(task => ui.addTask(task))
		});
	} else {
		ui.checkList();
	}
})