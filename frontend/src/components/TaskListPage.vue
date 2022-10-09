<script setup>
import { onMounted, computed } from 'vue'
import { useRoute } from 'vue-router'

console.log('task list')

const route = useRoute()
console.log(route.params, 'route')
onMounted(() => {
	console.log(route.params.todoID)
})
</script>

<template>
</template>

<style scoped>
</style>
