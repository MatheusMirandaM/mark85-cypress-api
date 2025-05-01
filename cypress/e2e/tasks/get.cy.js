describe('GET /tasks', ()=> {
	
	beforeEach(function () {
		cy.fixture('tasks/get').then(function (tasks) {
			this.tasks = tasks
		})
	})
	
	it('get my tasks ', function () {
		
		const { user, tasks } = this.tasks.list
		
		cy.task('removeTasksLike', 'Estud4r')
		cy.task('removeUser', user.email)
		cy.postUser(user)
		cy.postSession(user)
			.then(userResp => {
				/*
				cy.postTasks(tasks[0], userResp.body.token)
				cy.postTasks(tasks[1], userResp.body.token)
				cy.postTasks(tasks[2], userResp.body.token)
				*/
				tasks.forEach(function (t) {                // utilizar o forEach para fazer um lup para pergorresr o array e não utilizar o metodo comentado a cima
					cy.postTasks(t, userResp.body.token)
				})
				
				cy.getTasks(userResp.body.token)
					.then(response => {
						expect(response.status).to.eq(200)
					}).its('body')      // a função its() serve para obter uma propriedade
						.should('be.an', 'array')
						.and('have.length', tasks.length)
			})
		
	})
	
})

describe('GET /tasks/:td', ()=> {
	
	beforeEach(function () {
		cy.fixture('tasks/get').then(function (tasks) {
			this.tasks = tasks
		})
	})
	
	it('get unique task', function () {
		
		const { user, task } = this.tasks.unique
		
		cy.task('removeTask', task.name, user.email)
		cy.task('removeUser', user.email)
		cy.postUser(user)
		cy.postSession(user)
			.then(userResp => {
				cy.postTasks(task, userResp.body.token)
					.then(taskRasp => {
						cy.getUniqueTask(taskRasp.body._id, userResp.body.token)
					}).then(response => {
						expect(response.status).to.eq(200)
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
						cy.getUniqueTask(taskRasp.body._id, userResp.body.token)
							.then(response => {
								expect(response.status).to.eq(404)
							})
					})
			})
	
	})
	
})
