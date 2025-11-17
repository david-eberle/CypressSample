describe('Autocomplete on ExpandTesting', () => {
    const resultsFile = 'cypress/results/expandtesting-autocomplete.json'
    let startTime, endTime

    it('should autocomplete country name', () => {
        startTime = new Date()

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
        const random = Math.random()
        const FAIL_PROBABILITY = 0.05
        if (random < FAIL_PROBABILITY) {
            throw new Error('Intentional failure for dashboard testing')
        }

        expect(true).to.equal(true)
    })

    it('should save timestamps to JSON', function () {
        endTime = new Date()

        const durationMs = (endTime - startTime) / 1000

        const allPassed = this.test.parent.tests
            .filter(t => t.title !== this.test.title)
            .every(t => t.state === 'passed')

        const result = {
            testName: 'Autocomplete on ExpandTesting',
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
