<template>
	<div>
	  <h1>lista de tareas</h1>
	  <!-- formulario de entrada de tareas -->
	  <form @submit.prevent="addTodo()">
		<el-input placeholder="todo" v-model="todo"></el-input>
	  </form>
	  <el-row :gutter="12">
		<!-- área de visualización de tareas pendientes -->
		<TodoItem v-for="( todo, index ) in todos" :key="todo" :index="index" :todo="todo" @close-todo="removeTodo"/>
		<!-- zona de visualización de problemas -->
		<TodoItem v-for="( issue, index ) in issues" :key="index" :index="index" :todo="issue.title" @close-todo="closeIssue"/>
		  <el-card class="box-card" shadow="hover" style="margin: 5px 0;">
			<el-row :gutter="12">
			</el-row>
		  </el-card>
	  </el-row>
	</div>
  </template>
  
  <script>
  import axios from 'axios';
  import TodoItem from '@/components/TodoItem';
  
  const client = axios.create({
	baseURL: `${process.env.VUE_APP_GITHUB_ENDPOINT}`,
	headers: {
	  'Authorization': `Bearer ${process.env.VUE_APP_GITHUB_TOKEN}`,
	  'Accept': 'application/vnd.github.v3+json',
	  'Content-Type':'application/json',
	},
  })
  
  export default {
	name: 'TodosIssues',
	components: {
	  TodoItem
	},
	data () {
	  return {
		todo: '',
		todos: [],
		issues: []
	  }
	},
	methods: {
	  addTodo(){
		this.todos.push(this.todo);
		this.todo= '';
	  },
	  removeTodo(index){
		this.todos.splice(index, 1);
	  },
	  closeIssue(index){
		const target = this.issues[index];
		client.patch(`/issues/${target.number}`,
			{
			  state: 'closed'
			},
		  )
		  .then(() => {
		   this.issues.splice(index, 1);
		})
	  },
	  getIssues() {
		client.get('/issues')
		  .then((res) => {
			this.issues = res.data
			console.log(this.issues)
		})
	  }
	},
	created() {
	  this.getIssues();
	}
  }
  </script>