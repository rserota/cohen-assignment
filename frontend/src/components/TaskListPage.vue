<script setup>
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import axios from 'axios'

const todo = ref({})
const newTask = ref({ priority: 'High' })
const editingTask = ref({})
const route = useRoute()

const updateTask = async (task)=>{
	console.log('update?')
	const response = await axios.put(`/tasks/${task.id}`, task)
	await getUpdatedTasks()
	console.log(response)

}

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

const saveTask = async (task)=>{
	console.log('task? ', task)
	// task.value = editingTask.value
	const taskIndex = todo.value.tasks.indexOf(task)
	console.log(taskIndex)
	stopEditingTask(editingTask.value)
	todo.value.tasks[taskIndex] = editingTask.value
	await updateTask(editingTask.value)
}

// just changes the UI so the task is editable
const editTask = (task) => {
	// first, set all tasks to read-only, so we only edit one task at a time
	for ( let t of todo.value.tasks ) {
		t.editing = false
	}
	task.editing = true
	editingTask.value = {...task}
}

// changes UI for a task back to read-only
const stopEditingTask = (task) => { task.editing = false }

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
			<li class="list-heading">
				<div class="row my-2">
					<div class="col-sm-1">Done</div>
					<div class="col-sm-2">Name</div>
					<div class="col-sm-2">Priority</div>
					<div class="col-sm-2">Due Date</div>
					<div class="col-sm-3">Description</div>
					<div class="col-sm-2"></div>
				</div>
			</li>
			<li v-for="task in todo.tasks">
				<div class="row my-2" v-if="!task.editing">
					<div class="col-sm-1"><input type="checkbox" @change="updateTask(task)" v-model="task.completed"></div>
					<div class="col-sm-2" @click="editTask(task)" v-if="!task.editing"><span :class="{completed:task.completed}">{{task.name}}</span></div>
					<div class="col-sm-2" @click="editTask(task)">{{task.priority}}</div>
					<div class="col-sm-2" @click="editTask(task)">{{task.dueDate}}</div>
					<div class="col-sm-3" @click="editTask(task)">{{task.description}}</div>
					<div class="col-sm-2"><button @click="deleteTask(task.id)" class="btn btn-danger d-block full-width">Delete</button></div>
				</div>
				<div class="row my-2" v-if="task.editing">
					<div class="col-sm-1"><input type="checkbox" @change="updateTask(task)" v-model="task.completed"></div>
					<div class="col-sm-2" ><input class="form-control" v-model="editingTask.name"></div>
					<div class="col-sm-2">
						<select v-model="editingTask.priority">
							<option value="High">High</option>
							<option value="Medium">Medium</option>
							<option value="Low">Low</option>
						</select>
					</div>
					<div class="col-sm-2"><input v-model="editingTask.dueDate" type="date"></div>
					<div class="col-sm-3"><textarea v-model="editingTask.description"></textarea></div>
					<div class="col-sm-2">
						<!-- <button @click="deleteTask(task.id)" class="btn btn-danger">Cancel</button> -->
						<div class="btn-group d-block" role="group">
							<button @click="stopEditingTask(task)" type="button" class="btn btn-danger half-width">Cancel</button>
							<button @click="saveTask(task)" type="button" class="btn btn-success half-width">Save</button>
						</div>
					</div>
				</div>
			</li>
			<li>
				<form @submit.prevent="createTask">
					<div class="row my-2">
						<div class="col-sm-1"></div>
						<div class="col-sm-2"><input v-model="newTask.name" class="form-control" placeholder="New Task Name"></div>
						<div class="col-sm-2">
							<select v-model="newTask.priority">
								<option value="High">High</option>
								<option value="Medium">Medium</option>
								<option value="Low">Low</option>
							</select>
						</div>
						<div class="col-sm-2"><input v-model="newTask.dueDate" type="date"></div>
						<div class="col-sm-3"><textarea v-model="newTask.description" placeholder="New task description"></textarea></div>
						<div class="col-sm-2"><button class="btn btn-success d-block full-width">Create</button></div>
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
	.half-width {
		width: 50%;
	}
	.full-width {
		width: 100%;
	}

</style>
