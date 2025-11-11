const fs = require('fs')
const path = require('path')

describe('Login on SauceDemo', () => {
    const resultsFile = path.join('cypress', 'results', 'login-test.json')
    let startTime
    let endTime

    it('should login with standard_user and validate login', () => {
        startTime = new Date()

        cy.visit('/')
        cy.login('standard_user', 'secret_sauce')

        cy.url().should('include', '/inventory.html')
        cy.get('.inventory_list').should('be.visible')

        cy.then(() => {
            endTime = new Date()
        })
    })

    it('should save test timestamps to JSON', () => {
        if (!startTime || !endTime) {
            cy.log('Timestamps not available')
            return
        }

        const durationMs = endTime - startTime
        const result = {
            testName: 'Login on SauceDemo',
            startTime: startTime.toISOString(),
            endTime: endTime.toISOString(),
            durationMs
        }

        fs.mkdirSync(path.dirname(resultsFile), { recursive: true })
        fs.writeFileSync(resultsFile, JSON.stringify(result, null, 2))
    })
})
