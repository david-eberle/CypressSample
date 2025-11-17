describe('Upload file on ExpandTesting', () => {
    const resultsFile = 'cypress/results/expandtesting-upload.json'
    let startTime, endTime

    it('should upload a file and verify', () => {
        startTime = new Date()
        // Prevent Cypress from failing this test if the application throws an error
        // during file upload (e.g., "Assignment to constant variable" from fileValidation)
        cy.on('uncaught:exception', (err, runnable) => false)

        cy.visit('https://practice.expandtesting.com/upload')

        cy.get('[data-testid="file-input"]').selectFile('cypress/fixtures/upload.txt')
        cy.get('[data-testid="file-submit"]').click()
        cy.get('h1').should('contain.text', 'File Uploaded!')
        cy.get('#uploaded-files p').should('contain.text', 'upload.txt')
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
            testName: 'Upload file on ExpandTesting',
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
