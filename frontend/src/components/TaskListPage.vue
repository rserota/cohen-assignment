<script setup>
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import axios from 'axios'

const todo = ref({})
const newTask = ref({
	priority: 'High',
})

const route = useRoute()
console.log(route.params, 'route')
onMounted( async () => {
	try {
		const response = await axios.get(`/todos/${route.params.todoID}`)
		console.log(response)
		todo.value = response.data
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
					<div class="col-sm-2">{{new Date(task.dueDate).toLocaleString()}}</div>
					<div class="col-sm-3">{{task.description}}</div>
					<div class="col-sm-1"><button class="btn btn-danger">Delete</button></div>
				</div>
			</li>
			<li>
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
					<div class="col-sm-2"><input type="date"></div>
					<div class="col-sm-3"><textarea placeholder="New task description">{{newTask.description}}</textarea></div>
					<div class="col-sm-1"><button class="btn btn-success">Create</button></div>
				</div>
			</li>
		</ul>
	</div>
</template>

<style scoped>
	#task-list {
		list-style-type: none;
	}

</style>
