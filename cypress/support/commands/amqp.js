Cypress.Commands.add('purgeQueueMesseges', ()=> {
	cy.api({
		url: 'https://leopard.lmq.cloudamqp.com/api/queues/vrqwwald/tasks/contents',
		method: 'DELETE',
		auth: {
			username: 'vrqwwald',
			password: 'KN_J-KE3h9rY28SDUC2JrnDiKYjjQioq'
		},
		failOnStatusCode: false
	}).then(response => {
		return response
	})
})

Cypress.Commands.add('getQueueMessage', ()=> {
	cy.api({
		url: 'https://leopard.lmq.cloudamqp.com/api/queues/vrqwwald/tasks/get',
		method: 'POST',
		auth: {
			username: 'vrqwwald',
			password: 'KN_J-KE3h9rY28SDUC2JrnDiKYjjQioq'
		},
		body: {
			'count': 1,
			'ack_mode': 'reject_requeue_true',
			'encoding': 'auto',
			'truncate': 50000
		},
		failOnStatusCode: false
	}).then(response => {
		return response
	})
})