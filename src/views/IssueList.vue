<template>
	<div class="issues-app">
		<br />
		<h1>ISSUES LIST</h1>
		<br />
		<el-button type="success" @click="getIssues">Get Issues</el-button>
		<form @submit.prevent="onAddissue" class="add-issue-form">
			<!-- <label for="issue">New issue:</label> -->
			<div class="input-container">
				<!-- <el-input v-model="issue" type="text" id="issue" placeholder="Enter a new issue" /> -->
				<!-- <el-button type="primary" @click="onAddissue">Add issue</el-button> -->
			</div>
		</form>

		<el-row :gutter="12" class="issue-list">
			<el-col :span="12" v-for="(issue, index) in issues" :key="index">
				<el-card class="issue-card" shadow="hover">
					<el-row :gutter="12">
						<el-col :span="18">
							{{ issue.title }}
						</el-col>
						<el-col :span="4">
							<el-button
								icon="el-icon-check"
								circle
								type="success"
								@click="closeIssue(index)"
							></el-button>
						</el-col>
					</el-row>
				</el-card>
			</el-col>
		</el-row>
	</div>
</template>

<script>
import axios from "axios";

const client = axios.create({
	baseURL: `${process.env.VUE_APP_GITHUB_ENDPOINT}`,
	headers: {
		Accept: "application/vnd.github.v3+json",
		"Content-Type": "application/json",
		Authorization: `Bearer ${process.env.VUE_APP_GITHUB_TOKEN}`,
	},
});
export default {
	name: "IssueList",

	data() {
		return {
			issues: [],
		};
	},
	methods: {
		getIssues() {
			client.get("/issues").then((res) => {
				this.issues = res.data;
			});
		},
		closeIssue(index) {
			const target = this.issues[index];
			client
				.patch(`/issues/${target.number}`, {
					state: "closed",
				})
				.then(() => {
					this.issues.splice(index, 1);
				});
		},
	},
    created() {
        this.getIssues();
    }
};
</script>

<style>
.issues-app {
	max-width: 600px;
	margin: auto;
}

.add-issue-form {
	margin-bottom: 20px;
}

.issue-card {
	margin: 5px 0;
}

.issue-list {
	display: flex;
	flex-wrap: wrap;
}
</style>
