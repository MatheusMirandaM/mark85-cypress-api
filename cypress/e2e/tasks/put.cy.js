describe('PUT /tasks/:td/done', ()=> {
	
	beforeEach(function () {
		cy.fixture('tasks/put').then(function (tasks) {
			this.tasks = tasks
		})
	})
	
	it('update task to done', function () {
		
		const { user, task } = this.tasks.update
		
		cy.task('removeTask', task.name, user.email)
		cy.task('removeUser', user.email)
		cy.postUser(user)
		cy.postSession(user)
			.then(userResp => {
				cy.postTasks(task, userResp.body.token)
					.then(taskRasp => {
						cy.putTaskDone(taskRasp.body._id, userResp.body.token)
							.then(response => {
								expect(response.status).to.eq(204)
							})
						cy.getUniqueTask(taskRasp.body._id, userResp.body.token)
							.then(response => {
								expect(response.body.is_done).to.be.then
							})
					})
			})
		
	})
	
	it('task not found', function() {
		
		const { user, task } = this.tasks.not_found
		
		cy.task('removeTask', task.name, user.email)
		cy.task('removeUser', user.email)
		cy.postUser(user)
		cy.postSession(user)
			.then(userResp => {
				cy.postTasks(task, userResp.body.token)
					.then(taskRasp => {
						cy.deleteTask(taskRasp.body._id, userResp.body.token)
							.then(delResp => {
								expect(delResp.status).to.eq(204)
							})
						cy.putTaskDone(taskRasp.body._id, userResp.body.token)
							.then(response => {
								expect(response.status).to.eq(404)
							})
					})
			})
	
	})
	
})
