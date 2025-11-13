describe('Drag and Drop on ExpandTesting', () => {
    const resultsFile = 'cypress/results/expandtesting-draganddrop.json'
    let startTime, endTime

    it('should drag A over B and verify B is first', () => {
        startTime = new Date()

        cy.visit('https://practice.expandtesting.com/drag-and-drop')

        const dataTransfer = new DataTransfer()

        cy.get('#column-a').trigger('dragstart', { dataTransfer })
        cy.get('#column-b').trigger('drop', { dataTransfer })
        cy.get('#column-a').trigger('dragend')

        cy.get('#dnd-columns .column').first().find('header').should('contain.text', 'B')
    })

    it('should save timestamps to JSON', function () {
        endTime = new Date()

        const durationMs = (endTime - startTime) / 1000

        const allPassed = this.test.parent.tests
            .filter(t => t.title !== this.test.title)
            .every(t => t.state === 'passed')

        const result = {
            testName: 'Drag and Drop on ExpandTesting',
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
