Cypress.Commands.add('postUser', (user) => {
	cy.api({
		url: '/users',
		method: 'POST',
		body: user,
		failOnStatusCode: false
	}).then((response) => { return response })
})

Cypress.Commands.add('postSession', (user)=> {
	cy.api({
		url: '/sessions',
		method: 'POST',
		body: {email: user.email, password: user.password},
		failOnStatusCode: false
	}).then(response => {
		return response
	})
})

Cypress.Commands.add('postTasks', (task, token) => {
	cy.api({
		url: 'tasks',
		method: 'POST',
		body: task, // body: this.tasks.create.task <-- também pode ser usado dessa forma -->
		headers: {
			authorization: token
		},
		failOnStatusCode: false
	}).then(response => {
		return response
	})
})

Cypress.Commands.add('getTasks', (token)=> {
	cy.api({
		url: '/tasks',
		method: 'GET',
		headers: {
			authorization: token
		},
		failOnStatusCode: false
	}).then(response => {
		return response
	})
})

Cypress.Commands.add('getUniqueTask', (task, token)=> {
	cy.api({
		url: '/tasks/' + task,
		method: 'GET',
		headers: {
			authorization: token
		},
		failOnStatusCode: false
	}).then(response => {
		return response
	})
})

Cypress.Commands.add('deleteTask', (task, token)=> {
	cy.api({
		url: '/tasks/' + task,
		method: 'DELETE',
		headers: {
			authorization: token
		},
		failOnStatusCode: false
	}).then(response => {
		return response
	})
})