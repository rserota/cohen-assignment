<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

const todos = ref([])
const newToDoListName = ref('')

const getUpdatedToDos = async ()=>{
	const updatedToDos = await axios.get('/todos')
	todos.value = updatedToDos.data
}

onMounted(async () => {
	await getUpdatedToDos()
})

defineProps({
	msg: String
})

const deleteToDoList = async (listID)=>{
	try {
		await axios.delete(`/todos/${listID}`)
		await getUpdatedToDos()
	}
	catch(e){
		console.log('oops')
	}
}

const validateListName = (newName, todos)=>{
	const validationErrors = []
	const currentNames = todos.map((todo)=>{
		return todo.name
	})
	if ( currentNames.includes(newName) ) {
		validationErrors.push("The list name must be unique.")
	}
	if ( newName === '' ) {
		validationErrors.push("The list name can't be blank.")
	}

	return validationErrors
}

const createToDoList = async ()=>{
	const validationErrors = validateListName(newToDoListName.value, todos.value)
	if ( !validationErrors.length ) {
		await axios.post(`/todos`, {newToDoListName: newToDoListName.value})
		await getUpdatedToDos()
		newToDoListName.value = ''
	}
	else {
		for ( let error of validationErrors ) {
			alert(error)
		}

	}
}

</script>

<template>
	<div class="container">
		<h1>ToDo Page</h1>
		<ul id="todo-list">
			<li class="list-heading">
				<div class="row my-2">
					<div class="col-sm-7"> Name </div>
					<div class="col-sm-3"> Tasks Left </div>
				</div>
			</li>
			<li v-for="todo in todos" @click="deleteToDoList(todo.id)">
				<div class="row my-2">
					<div class="col-sm-7"> {{todo.name}} </div>
					<div class="col-sm-3"> {{todo.progress.totalTasks - todo.progress.completedTasks}} </div>
					<div class="col-sm-2"> <button class="btn btn-danger">Delete</button> </div>
				</div>
			</li>
			<li>
				<form @submit.prevent="createToDoList">
					<div class="row my-2">
						<div class="col-sm-7"><input v-model="newToDoListName" class="form-control" placeholder="New Todo List" autofocus></div>
						<div class="col-sm-3"> </div>
						<div class="col-sm-2"> <button class="btn btn-success">Create</button> </div>
					</div>
				</form>
			</li>
		</ul>
	</div>

</template>

<style scoped>
</style>
