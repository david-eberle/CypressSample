describe('Notification message on ExpandTesting', () => {
    const resultsFile = 'cypress/results/expandtesting-notification.json'
    let startTime, endTime

    it('should show Action successful message after clicking', () => {
        startTime = new Date()

        cy.visit('https://practice.expandtesting.com/notification-message-rendered')

        cy.get('#flash').should('not.exist')

        cy.contains('a', 'Click here').click()

        cy.get('#flash b')
            .should('be.visible')
    })

    it('should fail randomly for TestHub dashboard testing', () => {
        const random = Math.random()
        const FAIL_PROBABILITY = 0.03
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
            testName: 'Notification message on ExpandTesting',
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
