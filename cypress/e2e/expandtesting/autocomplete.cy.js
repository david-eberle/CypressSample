describe('Autocomplete on ExpandTesting', () => {
    const resultsFile = 'cypress/results/expandtesting-autocomplete.json'
    let testCtx = null

    it('should autocomplete country name', function () {
        cy.startTimer()
        cy.then(() => { testCtx = this })

        cy.visit('https://practice.expandtesting.com/autocomplete')

        cy.get('#country').type('Arg')
        cy.wait(500)

        cy.get('#countryautocomplete-list div')
            .contains('Argentina')
            .should('be.visible')

        cy.get('#countryautocomplete-list div')
            .contains('Argentina')
            .click()

        cy.get('#country').should('have.value', 'Argentina')

    })

    it('should fail randomly for TestHub dashboard testing', () => {
        const FAIL_PROBABILITY = 0.05
        cy.maybeFailForDashboard(FAIL_PROBABILITY)

    })

    it('should save timestamps to JSON', () => {
        cy.then(() => {
            cy.saveResults(resultsFile, 'Autocomplete on ExpandTesting', testCtx)
        })
    })
})
