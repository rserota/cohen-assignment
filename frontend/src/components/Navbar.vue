<script setup>
import { ref } from 'vue'

defineProps({
	msg: String
})

const count = ref(0)
</script>

<template>
	<h1>To Do Today</h1>
	<router-link to="/">Home</router-link>
	<br>
	<router-link to="/task-list">Task List</router-link>

</template>

<style scoped>
.read-the-docs {
	color: #888;
}
</style>
