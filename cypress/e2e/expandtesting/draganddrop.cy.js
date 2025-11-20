describe('Drag and Drop on ExpandTesting', () => {
    const resultsFile = 'cypress/results/expandtesting-draganddrop.json'
    let testCtx = null

    it('should drag A over B and verify B is first', function () {
        cy.startTimer()
        cy.then(() => { testCtx = this })
        cy.visit('https://practice.expandtesting.com/drag-and-drop')

        const dataTransfer = new DataTransfer()

        cy.get('#column-a').trigger('dragstart', { dataTransfer })
        cy.get('#column-b').trigger('drop', { dataTransfer })
        cy.get('#column-a').trigger('dragend')

        cy.get('#dnd-columns .column').first().find('header').should('contain.text', 'B')

    })

    it('should fail randomly for TestHub dashboard testing', () => {
        const FAIL_PROBABILITY = 0.02
        cy.maybeFailForDashboard(FAIL_PROBABILITY)
    })

    it('should write timestamps to JSON file', () => {
        cy.then(() => {
            cy.saveResults(resultsFile, 'Drag and Drop on ExpandTesting', testCtx)
        })
    })
})
