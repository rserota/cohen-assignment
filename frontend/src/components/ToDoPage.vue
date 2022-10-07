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
</script>

<template>
	<h1>ToDo Page</h1>
	<ul >
		<li v-for="todo in todos">
			{{todo.name}}
		</li>
	</ul>

</template>

<style scoped>
.read-the-docs {
	color: #888;
}
</style>
