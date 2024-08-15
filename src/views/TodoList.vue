<template>
  <div class="todo-app">
    <h1>TODO LIST</h1>
    <form @submit.prevent="onAddTask" class="add-task-form">
      <label for="task">New Task:</label>
      <div class="input-container">
        <el-input v-model="task" type="text" id="task" placeholder="Enter a new task" />
        <el-button type="primary" @click="onAddTask">Add Task</el-button>
      </div>
    </form>

    <el-row :gutter="12" class="task-list">
      <el-col :span="12" v-for="(task, index) in tasks" :key="index">
        <el-card class="task-card" shadow="hover">
          <el-row :gutter="12">
            <el-col :span="18">
              {{ task }}
            </el-col>
            <el-col :span="4" >
              <el-button
                icon="el-icon-check"
                circle
                type="success"
                @click="onCompleteTask(index)"
              ></el-button>
            </el-col>
          </el-row>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
	name: "TodoList",
	data() {
		return {
			task: "",
			tasks: JSON.parse(localStorage.getItem('tasks')) || [],
		};
	},
	methods: {
		onAddTask() {
			this.tasks.push(this.task);
      localStorage.setItem('tasks', JSON.stringify(this.tasks));
			this.task = "";
		},
		onCompleteTask(index) {
			console.log(index);
			this.tasks.splice(index, 1);
      localStorage.setItem('tasks', JSON.stringify(this.tasks));
		},
	},
};
</script>

<style scoped>
.todo-app {
  max-width: 600px;
  margin: auto;
}

.add-task-form {
  margin-bottom: 20px;
}

.task-card {
  margin: 5px 0;
}

.task-list {
  display: flex;
  flex-wrap: wrap;
}

.input-container {
  display: flex;
  margin-top: 8px;
}

.input-container .el-button {
  margin: 0 4px 0 4px;
}
</style>
