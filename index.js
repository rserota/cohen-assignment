const express = require('express');
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
	}
}
const getProgress = (todo)=>{
	console.log('todo? ', todo)
	const totalTasks = todo.tasks.length
	const completedTasks = todo.tasks.filter((task)=>{
		return task.completed
	}).length
	
	return { totalTasks, completedTasks }
}
const testTask = new Task('Test task', 'this is a test', Date.now(), 'High')
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

app.listen(PORT, () =>
	console.log(`Raphael's app is listening on port ${PORT}!`)
);