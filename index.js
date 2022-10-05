const express = require('express');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('frontend/dist'));
let todos = [{id: 1, name: 'Cohen Interview Assignment'}];

const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
	res.sendFile('./frontend/dist/index.html', {root: './'});
})
app.get('/todos', (req, res) => {
	return res.status(200).send(todos);
});

app.listen(PORT, () =>
	console.log(`Example app listening on port ${PORT}!`)
);