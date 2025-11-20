describe('Login on ExpandTesting', () => {
    const resultsFile = 'cypress/results/expandtesting-login.json'
    let testCtx = null

    it('should login with valid credentials and validate login', function () {
        cy.startTimer()


        cy.visit('https://practice.expandtesting.com/login')


        cy.get('#username').type('practice', { force: true })
        cy.get('#password').type('SuperSecretPassword!', { force: true })
        cy.get('#submit-login').click({ force: true })

        cy.url().should('include', '/secure')
        cy.get('#flash').should('contain.text', 'You logged into a secure area!')
        cy.then(() => { testCtx = this })

    })

    it('should fail randomly for TestHub dashboard testing', () => {
        const FAIL_PROBABILITY = 0.02
        cy.maybeFailForDashboard(FAIL_PROBABILITY)
    })

    it('should save timestamps to JSON', () => {
        cy.then(() => {
            cy.saveResults(resultsFile, 'Login on ExpandTesting', testCtx)
        })
    })
})
