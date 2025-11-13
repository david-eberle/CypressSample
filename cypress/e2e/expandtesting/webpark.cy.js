describe('Validate parking cost calculation', () => {
    const resultsFile = 'cypress/results/expandtesting-webpark.json'
    let startTime, endTime

    it('should visit app and validate calculated cost', () => {
        startTime = new Date()

        cy.visit('https://practice.expandtesting.com/webpark')


        cy.get('#calculateCost').click()

        cy.get('#result').should('be.visible')

        cy.get('#resultValue').should('have.text', '18.00€')

    })

    it('should save timestamps to JSON', function () {
        endTime = new Date()

        const durationMs = (endTime - startTime) / 1000

        const allPassed = this.test.parent.tests
            .filter(t => t.title !== this.test.title)
            .every(t => t.state === 'passed')

        const result = {
            testName: 'Validate parking cost',
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
