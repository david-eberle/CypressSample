describe('Pagination change on ExpandTesting', () => {
    const resultsFile = 'cypress/results/expandtesting-pagination.json'
    let startTime, endTime

    it('should change items per page from 3 to 5 and verify table updates', () => {
        startTime = new Date()

        cy.visit('https://practice.expandtesting.com/dynamic-pagination-table')

        cy.get('select[name="example_length"]').select('5')

        cy.get('#example tbody tr')
            .should('have.length', 5)
    })

    it('should fail randomly for TestHub dashboard testing', () => {
        const random = Math.random()
        const FAIL_PROBABILITY = 0.01
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
            testName: 'Pagination change on ExpandTesting',
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
