<script setup>
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import axios from 'axios'

const todo = ref({})
const newTask = ref({ priority: 'High' })
const route = useRoute()

const getUpdatedTasks = async ()=>{
	const updatedTasks = await axios.get(`/todos/${route.params.todoID}`)
	todo.value = updatedTasks.data
}

const validateTaskName = (newName, todos)=>{
	const validationErrors = []
	return validationErrors
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

const createTask = async ()=>{
	const validationErrors = validateTaskName(newTask.value.name, todo.value.tasks)
	if ( !validationErrors.length ) {
		await axios.post('/tasks', {...newTask.value, todoID:route.params.todoID})
		await getUpdatedTasks()
		newTask.value = { priority: 'High' }
	}
	else {
		for ( let error of validationErrors ) {
			alert(error)
		}

	}
}

const deleteTask = async (taskID)=>{
	console.log(taskID)
	const response = await axios.delete(`/tasks/${taskID}`)
	await getUpdatedTasks()
	console.log(response)
}

onMounted( async () => {
	try {
		await getUpdatedTasks()
	}
	catch(e){
		console.log(e)
		alert("Failed to fetch todo list")
	}
})
</script>

<template>
	<div class="py-5"></div>
	<div class="container">
		<ul id="task-list">
			<li v-for="task in todo.tasks">
				<div class="row my-2">
					<div class="col-sm-1"><input type="checkbox" :checked="task.completed"></div>
					<div class="col-sm-3">{{task.name}}</div>
					<div class="col-sm-2">{{task.priority}}</div>
					<div class="col-sm-2">{{task.dueDate}}</div>
					<div class="col-sm-3">{{task.description}}</div>
					<div class="col-sm-1"><button @click="deleteTask(task.id)" class="btn btn-danger">Delete</button></div>
				</div>
			</li>
			<li>
				<form @submit.prevent="createTask">
					<div class="row my-2">
						<div class="col-sm-1"></div>
						<div class="col-sm-3"><input v-model="newTask.name" class="form-control" placeholder="New Task Name"></div>
						<div class="col-sm-2">
							<select v-model="newTask.priority">
								<option value="High">High</option>
								<option value="Medium">Medium</option>
								<option value="Low">Low</option>
							</select>
						</div>
						<div class="col-sm-2"><input v-model="newTask.dueDate" type="date"></div>
						<div class="col-sm-3"><textarea v-model="newTask.description" placeholder="New task description"></textarea></div>
						<div class="col-sm-1"><button class="btn btn-success">Create</button></div>
					</div>
				</form>
			</li>
		</ul>
	</div>
</template>

<style scoped>
	#task-list {
		list-style-type: none;
	}

</style>
