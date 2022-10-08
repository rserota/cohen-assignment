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
	console.log('list id?', listID)
	try {
		await axios.delete(`/todos/${listID}`)
		await getUpdatedToDos()
	}
	catch(e){
		console.log('oops')
	}
}

const createToDoList = async ()=>{
	await axios.post(`/todos`, {newToDoListName: newToDoListName.value})
	await getUpdatedToDos()
	newToDoListName.value = ''
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
						<div class="col-sm-7"><input v-model="newToDoListName" class="form-control" placeholder="New Todo List"></div>
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
