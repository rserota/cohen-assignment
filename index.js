const express = require('express');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('frontend/dist'));
let todos = [
	{id: 1, name: 'Cohen Interview Assignment', tasks: []},
	{id: 2, name: 'Another todo', tasks: []},
];

const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
	res.sendFile('./frontend/dist/index.html', {root: './'});
})

app.get('/todos', (req, res) => {
	const todoNames = todos.map((todo)=>{
		return {
			id: todo.id,
			name: todo.name,
		}
	})
	res.send(todoNames);
});

app.listen(PORT, () =>
	console.log(`Raphael's app is listening on port ${PORT}!`)
);