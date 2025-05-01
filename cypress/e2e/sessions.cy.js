/// <reference types="cypress" />

describe('POST/ sessions', ()=> {

	// Usando dessa forma (função fixture() dentro de um beforeEach()), teremos que usar o "this".
	// Porem, as funções de seta não reconhece a variavel "this" dentro de sus blocos.
	// Com isso, temos que mudar para as funções convencionais
	beforeEach(function () {
		cy.fixture('users').then(function(users){
			this.users = users
		})
	})
	
	it('user session',function () {
		
		const userData = this.users.login
		
		cy.task('removeUser', userData.email)
		cy.postUser(userData)
		cy.postSession(userData)
			.then(response => {
				expect(response.status).to.eq(200)
				expect(response.body.user.name).to.eq(userData.name)
				expect(response.body.user.email).to.eq(userData.email)
				expect(response.body.token).not.to.be.empty // Não deve ser vazio
			})
		
		/* TAMBÉM PODE SER FEITO DA SEGUINTE FORMA (CONVENCIONAL):
		<--- USANDO A FUNÇÃO "cy.fixture()" DIRETAMENTE NO TESTE --->
		cy.fixture('users')
			.then(function (users) {
				const userData = users.login
				cy.task('removeUser', userData.email)
				cy.postUser(userData)
				cy.postSession(userData)
					.then(response => {
						expect(response.status).to.eq(200)
						expect(response.body.user.name).to.eq(userData.name)
						expect(response.body.user.email).to.eq(userData.email)
						expect(response.body.token).not.to.be.empty // Não deve ser vazio
					})
			})
		*/
		
	})
	
	it('invalid password',function () {
		
		const user = this.users.inv_pass
		
		cy.postSession(user)
			.then(response => {
				expect(response.status).to.eq(401)
			})
		
	})
	
	it('email not found',function () {
		
		const user = this.users.email_404
		
		cy.postSession(user)
			.then(response => {
				expect(response.status).to.eq(401)
			})
		
	})
	
})

