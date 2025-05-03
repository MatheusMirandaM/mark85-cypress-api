/// <reference types="cypress" />

describe('POST/tasks',()=> {
	
	beforeEach(function () {
		cy.fixture('tasks/post').then(function (tasks){
			this.tasks = tasks
		})
	})
	
	context('register a new task', function (){
		before(function (){
			cy.purgeQueueMesseges()
				.then(response => {
					expect(response.status).to.eq(204)
				})
		})
		
		it('post task', function () {
			
			const { user, task } = this.tasks.create
			
			cy.task('removeUser', user.email)
			cy.postUser(user)
			cy.postSession(user)
				.then(userResp => {
					cy.log(userResp.body.token)
					cy.task('removeTask', task.name, user.email)
					cy.postTasks(task, userResp.body.token)
						.then(response => {
							expect(response.status).to.eq(201)
							expect(response.body.name).to.eq(task.name)
							expect(response.body.tags).to.eql(task.tags) // IMPORTANTE:: A  função "eql" se preocupa com os dados e não com a tipagem como a função "eq"
							expect(response.body.is_done).to.be.false
							expect(response.body.user).to.eq(userResp.body.user._id)
							expect(response.body._id.length).to.eq(24)
						})
				})
			
		})
		
		after(function (){
			const { user, task } = this.tasks.create
			cy.wait(5000)
			cy.getQueueMessage()
				.then(response => {
					expect(response.status).to.eq(200)
					cy.log(JSON.stringify(response.body[0]))
					expect(response.body[0].payload).to.include(user.name.split(' ')[0])
					expect(response.body[0].payload).to.include(user.email)
					expect(response.body[0].payload).to.include(task.name)
				})
		})
	})
	
	context('dup task',()=> {
		
		it('duplicate task', function () {
			
			const { user, task } = this.tasks.dup
			
			cy.task('removeUser', user.email)
			cy.postUser(user)
			cy.postSession(user)
				.then(userResp => {
					cy.log(userResp.body.token)
					cy.task('removeTask', task.name, user.email)
					cy.postTasks(task, userResp.body.token)
					cy.postTasks(task, userResp.body.token)
						.then(response => {
							expect(response.status).to.eq(409)
							expect(response.body.message).to.eq('Duplicated task!')
						})
				})
			
		})
		
	})
	
})