const { defineConfig } = require("cypress");
const { connect } = require('./cypress/support/mongo')
const allureWriter = require('@shelex/cypress-allure-plugin/writer');

require('dotenv').config()

module.exports = defineConfig({
	e2e: {
		viewportWidth: 1920,
		viewportHeight: 1080,
		baseUrl: 'http://localhost:3333/', //process.env.BASE_URL,
		screenshotOnRunFailure: false,
		env: {
			//snapshotOnly: true,
			requestMode: true,
			amqpHost: 'https://leopard.lmq.cloudamqp.com/api/queues/vrqwwald', //process.env.AMQP_HOST,
			amqpQueue: 'tasks', //process.env.AMQP_QUEUE,
			amqpUser: 'vrqwwald', //process.env.AMQP_USER,
			amqpPass: 'KN_J-KE3h9rY28SDUC2JrnDiKYjjQioq', //process.env.AMQP_PASS
			allure: true
		},
		async setupNodeEvents(on, config) {
			allureWriter(on, config)
			const db = await connect()
			on('task', {
				async removeUser(email) {
					const users = db.collection('users')
					await users.deleteMany({ email: email })
					return null
			  	},
				async removeTask(taskName, emailUser) {
					const users = db.collection('user')
					const user = users.findOne({ email: emailUser })
					const tasks = db.collection('tasks')
					await tasks.deleteMany({ name: taskName, user: user._id })
					return null
				},
				async removeTasksLike(key) {
					const tasks = db.collection('tasks')
					await tasks.deleteMany({ name: { $regex: key } })
					return null
				}
		  })
			return config
	  },
		
	},
});
