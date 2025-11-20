let startTime = null
let endTime = null

Cypress.Commands.add('startTimer', () => {
    startTime = new Date()
})

Cypress.Commands.add('saveResults', (resultsFile, testName, testCtx) => {
    endTime = new Date()

    if (!testCtx || !testCtx.test || !testCtx.test.parent) {
        throw new Error('Invalid testCtx passed to saveResults')
    }

    const suite = testCtx.test.parent
    const tests = suite.tests

    const durationMs = endTime - startTime

    const failedTest = tests.find(t => t.state === 'failed')
    const firstErrorMessage = failedTest?.err?.message || null

    const allPassed = tests
        .filter(t => t.title !== testCtx.test.title)
        .every(t => t.state === 'passed')

    const result = {
        testName,
        startTime: startTime.toISOString(),
        endTime: endTime.toISOString(),
        durationMs,
        passed: allPassed,
        firstErrorMessage
    }

    cy.task('writeFile', {
        filePath: resultsFile,
        content: JSON.stringify(result, null, 2)
    })
})

Cypress.Commands.add('startTimer', () => {
    startTime = new Date()
})

Cypress.Commands.add('maybeFailForDashboard', (FAIL_PROBABILITY) => {
    const random = Math.random()

    if (random < FAIL_PROBABILITY) {
        throw new Error('Intentional failure for dashboard testing')
    }

    expect(true).to.equal(true)
})
