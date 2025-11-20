describe('Login on SauceDemo', () => {
    const resultsFile = 'cypress/results/saucedemo-login.json'
    let testCtx = null

    it('should login and validate', function () {
        cy.startTimer()
        cy.visit('https://www.saucedemo.com/')
        cy.get('[data-test="username"]').clear().type('standard_user')
        cy.get('[data-test="password"]').clear().type('secret_sauce')
        cy.get('[data-test="login-button"]').click()
        cy.url().should('include', '/inventory.html')
        cy.get('.inventory_list').should('be.visible')
        cy.then(() => { testCtx = this })
    })

    it('should fail randomly for TestHub dashboard testing', () => {
        const FAIL_PROBABILITY = 0.01
        cy.maybeFailForDashboard(FAIL_PROBABILITY)
    })

    it('should save timestamps to JSON', () => {
        cy.then(() => {
            cy.saveResults(resultsFile, 'Login on Sauce Demo', testCtx)
        })
    })
})
