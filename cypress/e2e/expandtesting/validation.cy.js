describe('Form validation on ExpandTesting', () => {
    const resultsFile = 'cypress/results/expandtesting-formvalidation.json'
    let startTime, endTime

    it('should validate all fields', () => {
        startTime = new Date()

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
    })

    it('should save timestamps to JSON', function () {
        endTime = new Date()

        const durationMs = (endTime - startTime) / 1000

        const allPassed = this.test.parent.tests
            .filter(t => t.title !== this.test.title)
            .every(t => t.state === 'passed')

        const result = {
            testName: 'Form validation on ExpandTesting',
            startTime: startTime.toISOString(),
            endTime: endTime.toISOString(),
            durationMs,
            passed: allPassed
        }

        cy.task('writeFile', {
            filePath: resultsFile,
            content: JSON.stringify(result, null, 2)
        })
    })
})
