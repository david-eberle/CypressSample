describe('Form validation on ExpandTesting', () => {
    const resultsFile = 'cypress/results/expandtesting-formvalidation.json'
    let testCtx = null

    it('should validate all fields', function () {
        cy.startTimer()

        cy.visit('https://practice.expandtesting.com/form-validation')

        // Contact Name
        cy.get('#validationCustom01').clear()
        cy.get('form').invoke('addClass', 'was-validated')
        cy.get('#validationCustom01').siblings('.invalid-feedback').should('be.visible')

        cy.get('#validationCustom01').type('John Doe')
        cy.wait(500)
        cy.get('#validationCustom01').siblings('.valid-feedback').should('be.visible')

        // Contact number
        cy.get('input[name="contactnumber"]').clear()
        cy.get('form').invoke('addClass', 'was-validated')
        cy.get('input[name="contactnumber"]').siblings('.invalid-feedback').should('be.visible')

        cy.get('input[name="contactnumber"]').type('123-4567890')
        cy.wait(500)
        cy.get('input[name="contactnumber"]').siblings('.invalid-feedback').should('not.be.visible')

        // PickUp Date
        cy.get('input[name="pickupdate"]').clear()
        cy.get('form').invoke('addClass', 'was-validated')
        cy.get('input[name="pickupdate"]').siblings('.invalid-feedback').should('be.visible')

        cy.get('input[name="pickupdate"]').type('2025-12-31')
        cy.wait(500)
        cy.get('input[name="pickupdate"]').siblings('.invalid-feedback').should('not.be.visible')

        // Payment Method
        cy.get('form').invoke('addClass', 'was-validated')
        cy.get('#validationCustom04').siblings('.invalid-feedback').should('be.visible')

        cy.get('#validationCustom04').select('card')
        cy.wait(500)
        cy.get('#validationCustom04').siblings('.invalid-feedback').should('not.be.visible')

        cy.then(() => { testCtx = this })

    })

    it('should fail randomly for TestHub dashboard testing', () => {
        const FAIL_PROBABILITY = 0.01
        cy.maybeFailForDashboard(FAIL_PROBABILITY)
    })

    it('should write timestamps to JSON file', () => {
        cy.then(() => {
            cy.saveResults(resultsFile, 'Form validation on ExpandTesting', testCtx)
        })

    })
})
