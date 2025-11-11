describe('Login on SauceDemo', () => {
    const resultsFile = 'cypress/results/login-test.json'
    let startTime, endTime

    it('should login and validate', () => {
        startTime = new Date()
        cy.visit('https://www.saucedemo.com/')
        cy.login('standard_user', 'secret_sauce')
        cy.url().should('include', '/inventory.html')
        cy.get('.inventory_list').should('be.visible')
        cy.then(() => { endTime = new Date() })
    })

    it('should save timestamps to JSON', () => {
        const durationMs = endTime - startTime
        const result = {
            testName: 'Login on SauceDemo',
            startTime: startTime.toISOString(),
            endTime: endTime.toISOString(),
            durationMs
        }

        cy.task('writeFile', {
            filePath: resultsFile,
            content: JSON.stringify(result, null, 2)
        })
    })
})
