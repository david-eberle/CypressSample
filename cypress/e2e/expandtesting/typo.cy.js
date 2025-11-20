describe('Typo on ExpandTesting', () => {
    const resultsFile = 'cypress/results/expandtesting-typo.json'
    let testCtx = null

    it('should check for typo text', function () {
        cy.startTimer()

        cy.visit('https://practice.expandtesting.com/typos')

        cy.contains("Sometimes you'll see a typo, other times you won't.")
            .should('exist')
        cy.then(() => { testCtx = this })

    })

    it('should fail randomly for TestHub dashboard testing', () => {
        const FAIL_PROBABILITY = 0.05
        cy.maybeFailForDashboard(FAIL_PROBABILITY)
    })

    it('should save timestamps to JSON', () => {

        cy.then(() => {
            cy.saveResults(resultsFile, 'Typo on ExpandTesting', testCtx)
        })
    })
})