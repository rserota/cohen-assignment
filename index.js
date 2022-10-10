const express = require('express');
const crypto = require('crypto')
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('frontend/dist'));

class Task {
	constructor(name, description, dueDate, priority){
		this.name = name
		this.description = description
		this.dueDate = dueDate
		this.priority = priority
		this.completed = false
		this.id = crypto.randomUUID()
	}
}

class ToDoList {
	constructor(name){
		this.name = name
		this.tasks = []
		this.id = crypto.randomUUID()
	}
}
const getProgress = (todo)=>{
	const totalTasks = todo.tasks.length
	const completedTasks = todo.tasks.filter((task)=>{
		return task.completed
	}).length
	
	return { totalTasks, completedTasks }
}
const testTask = new Task('Test task', 'this is a test', '2022-11-03', 'High')
let todos = [
	{id: 1, name: 'Cohen Interview Assignment', tasks: [testTask]},
	{id: 2, name: 'Another todo', tasks: []},
];

const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
	res.sendFile('./frontend/dist/index.html', {root: './'});
})

app.get('/todos', (req, res) => {
	const todoNames = todos.map((todo)=>{
		const progress = getProgress(todo)
		return {
			id: todo.id,
			name: todo.name,
			progress,
		}
	})
	res.send(todoNames);
});

app.get('/todos/:todoID', (req, res) => {
	const todo = todos.find((t)=>{ return t.id == req.params.todoID })
	if ( todo ) {
		res.send(todo)
	}
	else { res.status(404).send({error:"Failed to find todo"}) }
})

app.post('/todos', (req, res) => {
	const newToDoList = new ToDoList(req.body.newToDoListName)
	console.log(req.body.newToDoListName, '??')
	todos.push(newToDoList)
	res.status(201).send(newToDoList)
})

app.delete('/todos/:todoID', (req, res) => {
	const listIndex = todos.findIndex((todo)=>{
		return todo.id == req.params.todoID
	})
	todos.splice(listIndex, 1)
	res.status(204).send()
})

app.post('/tasks', (req, res) => {
	console.log('body? ', req.body)
	console.log('...')
	const newTask = new Task(req.body.name, req.body.description, req.body.dueDate, req.body.priority)
	const parentList = todos.find((todo)=>{ return todo.id == req.body.todoID})
	parentList.tasks.push(newTask)
	console.log(newTask)
	res.status(201).send(newTask)
})

app.delete('/tasks/:taskID', (req, res) => {
	for ( let todo of todos ) {
		const taskIndex = todo.tasks.findIndex((task)=>{
			return task.id === req.params.taskID
		})
		if ( taskIndex > -1 ) {
			todo.tasks.splice(taskIndex, 1)
			break
		}
	}
	res.status(204).send()
})

app.put('/tasks/:taskID', (req, res) => {
	for ( let todo of todos ) {
		const taskIndex = todo.tasks.findIndex((task)=>{
			return task.id === req.params.taskID
		})
		if ( taskIndex > -1 ) {
			todo.tasks[taskIndex] = req.body
			break
		}
	}
	res.status(204).send()
})

app.listen(PORT, () =>
	console.log(`Raphael's app is listening on port ${PORT}!`)
);