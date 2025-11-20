describe('Validate parking cost calculation', () => {
    const resultsFile = 'cypress/results/expandtesting-webpark.json'
    let testCtx = null

    it('should visit app and validate calculated cost', function () {
        cy.startTimer()
        cy.then(() => { testCtx = this })

        cy.visit('https://practice.expandtesting.com/webpark')

        cy.get('#calculateCost').click({ force: true })
        cy.get('#result').should('be.visible')
        cy.get('#resultValue').should('have.text', '18.00€')

    })

    it('should fail randomly for TestHub dashboard testing', () => {
        const FAIL_PROBABILITY = 0.01
        cy.maybeFailForDashboard(FAIL_PROBABILITY)
    })

    it('should save timestamps to JSON', () => {
        cy.then(() => {
            cy.saveResults(resultsFile, 'Validate parking cost', testCtx)
        })

    })
})
