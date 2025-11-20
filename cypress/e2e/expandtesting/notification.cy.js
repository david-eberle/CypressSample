describe('Notification message on ExpandTesting', () => {
    const resultsFile = 'cypress/results/expandtesting-notification.json'
    let testCtx = null

    it('should show Action successful message after clicking', function () {
        cy.startTimer()

        cy.visit('https://practice.expandtesting.com/notification-message-rendered')

        cy.get('#flash').should('not.exist')

        cy.contains('a', 'Click here').click()

        cy.get('#flash b').should('be.visible')

        cy.then(() => { testCtx = this })

    })

    it('should fail randomly for TestHub dashboard testing', () => {
        const FAIL_PROBABILITY = 0.03
        cy.maybeFailForDashboard(FAIL_PROBABILITY)
    })

    it('should save timestamps to JSON', () => {
        cy.then(() => {
            cy.saveResults(resultsFile, 'Notification message on ExpandTesting', testCtx)
        })
    })
})
