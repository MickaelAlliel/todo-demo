<template>
  <section class="main" v-show="todos.length">
      <input class="toggle-all" type="checkbox" v-model="allDone">
      <ul class="todo-list">
        <todo :v-for="todo in filteredTodos" :v-key="todo._id"/>
      </ul>
    </section>
</template>

<script>
import Todo from './Todo.vue'

export default {
  name: 'TodoMain',
  components: {
    Todo
  },
  props: {
    
  }
}
</script>

<style scoped>
.main {
	position: relative;
	z-index: 2;
	border-top: 1px solid #e6e6e6;
}

.toggle-all {
	position: absolute;
	top: -55px;
	left: -12px;
	width: 60px;
	height: 34px;
	text-align: center;
	border: none; /* Mobile Safari */
}

.toggle-all:before {
	content: '❯';
	font-size: 22px;
	color: #e6e6e6;
	padding: 10px 27px 10px 27px;
}

.toggle-all:checked:before {
	color: #737373;
}

.todo-list {
	margin: 0;
	padding: 0;
	list-style: none;
}
</style>
