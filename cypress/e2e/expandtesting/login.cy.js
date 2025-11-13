describe('Login on ExpandTesting', () => {
    const resultsFile = 'cypress/results/expandtesting-login.json'
    let startTime, endTime

    it('should login with valid credentials and validate login', () => {
        startTime = new Date()

        cy.visit('https://practice.expandtesting.com/login')


        cy.get('#username').type('practice')
        cy.get('#password').type('SuperSecretPassword!')
        cy.get('#submit-login').click()

        cy.url().should('include', '/secure')
        cy.get('#flash').should('contain.text', 'You logged into a secure area!')
    })

    it('should save timestamps to JSON', function () {
        endTime = new Date()

        const durationMs = (endTime - startTime) / 1000

        const allPassed = this.test.parent.tests
            .filter(t => t.title !== this.test.title)
            .every(t => t.state === 'passed')

        const result = {
            testName: 'Login on ExpandTesting',
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
