/// <reference types="cypress" />

describe('POST /users', () => {
	
	// Usando dessa forma (função fixture() dentro de um beforeEach()), teremos que usar o "this".
	// Porem, as funções de seta não reconhece a variavel "this" dentro de sus blocos.
	// Com isso, temos que mudar para as funções convencionais
	beforeEach(function () {
		cy.fixture('users').then(function (users){
			this.users = users
		})
	})

    it('register a new user',function () {

        const user = this.users.create
		
		cy.task('removeUser', user.email)
		
		cy.postUser(user)
			.then(response=> {
				expect(response.status).to.eq(200)
			})
		
		/*
		cy.api({
			url: '/users',
			method: 'POST',
			body: user,
			failOnStatusCode: false
		}).then((response) => {
			expect(response.status).to.eq(200)
			cy.log(JSON.stringify(response.body))
		})
		*/

    })
	
	it('duplicate email',function () {
		
		const user = this.users.dup_email
		
		cy.task('removeUser', user.email)
		cy.postUser(user)
		cy.postUser(user)
			.then(response=> {
				
				const { message } = response.body
				
				expect(response.status).to.eq(409)
				expect(response.body.message).to.eq('Duplicated email!')
				expect(message).to.eq('Duplicated email!') // também pode ser feito dessa forma, declarando o campo em uma constante
			})
		
	})
	
	context('required field',function () {
		
		let user
		
		beforeEach(function () {
			user = this.users.required
		})
		
		it('name is required',function () {
			
			delete user.name
			
			cy.postUser(user)
				.then(response => {
					expect(response.status).to.eq(400)
					cy.log(JSON.stringify(response.body))
					expect(response.body.message).to.eq('ValidationError: "name" is required')
				})
			
		})
		
		it('email is required',function () {
			
			delete user.email
			
			cy.postUser(user)
				.then(response => {
					expect(response.status).to.eq(400)
					cy.log(JSON.stringify(response.body))
					expect(response.body.message).to.eq('ValidationError: "email" is required')
				})
			
		})
		
		it('password is required',function () {
			
			delete user.password
			
			cy.postUser(user)
				.then(response => {
					expect(response.status).to.eq(400)
					cy.log(JSON.stringify(response.body))
					expect(response.body.message).to.eq('ValidationError: "password" is required')
				})
			
		})
		
	})
	
})