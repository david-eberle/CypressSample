describe('Login on SauceDemo', () => {
    const resultsFile = 'cypress/results/saucedemo-login.json'
    let startTime, endTime

    it('should login and validate', () => {
        startTime = new Date()
        cy.visit('https://www.saucedemo.com/')
        cy.get('[data-test="username"]').clear().type('standard_user')
        cy.get('[data-test="password"]').clear().type('secret_sauce')
        cy.get('[data-test="login-button"]').click()
        cy.url().should('include', '/inventory.html')
        cy.get('.inventory_list').should('be.visible')
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
            testName: 'Login on Sauce Demo',
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
