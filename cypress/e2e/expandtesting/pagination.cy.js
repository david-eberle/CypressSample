describe('Pagination change on ExpandTesting', () => {
    const resultsFile = 'cypress/results/expandtesting-pagination.json'
    let testCtx = null

    it('should change items per page from 3 to 5 and verify table updates', function () {
        cy.startTimer()

        cy.visit('https://practice.expandtesting.com/dynamic-pagination-table')

        cy.get('select[name="example_length"]').select('5')

        cy.get('#example tbody tr')
            .should('have.length', 5)

        cy.then(() => { testCtx = this })

    })

    it('should fail randomly for TestHub dashboard testing', () => {
        const FAIL_PROBABILITY = 0.01
        cy.maybeFailForDashboard(FAIL_PROBABILITY)
    })

    it('should save timestamps to JSON', () => {

        cy.then(() => {
            cy.saveResults(resultsFile, 'Pagination change on ExpandTesting', testCtx)
        })
    })
})
