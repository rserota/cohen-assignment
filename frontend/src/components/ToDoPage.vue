<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

onMounted(() => {
	axios.get('/todos').then((response)=>{
		console.log(response.data)
		console.log(todos)
		console.log('??')

		todos.value = response.data
	})
})
defineProps({
	msg: String
})


const count = ref(0)
const todos = ref([])

const deleteTodoList = async (listID)=>{
	console.log('list id?', listID)
	try {
		await axios.delete(`/todos/${listID}`)
		const updatedTodos = await axios.get('/todos')
		console.log(updatedTodos)
		todos.value = updatedTodos.data
	}
	catch(e){
		console.log('oops')
	}
}
</script>

<template>
	<div class="container">
		<h1>ToDo Page</h1>
		<ul id="todo-list">
			<li class="list-heading">
				<div class="row my-2">
					<div class="col-sm-7">
						Name
					</div>
					<div class="col-sm-3">
						Tasks Left
					</div>
				</div>
			</li>
			<li v-for="todo in todos" @click="deleteTodoList(todo.id)">
				<div class="row my-2">
					<div class="col-sm-7">
						{{todo.name}}
					</div>
					<div class="col-sm-3">
						{{todo.progress.totalTasks - todo.progress.completedTasks}}
					</div>
					<div class="col-sm-2">
						<button class="btn btn-danger">Delete</button>
					</div>
				</div>
			</li>
		</ul>
	</div>

</template>

<style scoped>
.read-the-docs {
	color: #888;
}
</style>
