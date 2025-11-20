let testCtx = null

describe('Upload file on ExpandTesting', () => {
    const resultsFile = 'cypress/results/expandtesting-upload.json'

    it('should upload a file and verify', function () {
        cy.startTimer()

        cy.on('uncaught:exception', () => false)

        cy.visit('https://practice.expandtesting.com/upload')

        cy.get('[data-testid="file-input"]').selectFile('cypress/fixtures/upload.txt')
        cy.get('[data-testid="file-submit"]').click()
        cy.get('h1').should('contain.text', 'File Uploaded!')
        cy.get('#uploaded-files p').should('contain.text', 'upload.txt')

        cy.then(() => { testCtx = this })
    })

    it('should fail randomly for dashboard testing', () => {
        const FAIL_PROBABILITY = 0.01
        cy.maybeFailForDashboard(FAIL_PROBABILITY)
    })

    it('should write timestamps to JSON file', () => {
        cy.then(() => {
            cy.saveResults(resultsFile, 'Upload file on ExpandTesting', testCtx)
        })
    })
})
