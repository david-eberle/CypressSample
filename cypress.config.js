const { defineConfig } = require('cypress')
const fs = require('fs')
const path = require('path')

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      on('task', {
        writeFile({ filePath, content }) {
          fs.mkdirSync(path.dirname(filePath), { recursive: true })
          fs.writeFileSync(filePath, content)
          return null
        }
      })
    }
  }
})
