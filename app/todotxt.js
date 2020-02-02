'use strict'

function TodoTXT () {
}

TodoTXT.prototype.load = function load (filePath) {

}

TodoTXT.prototype.parse = function parse (line) {
  const matches = /(x )?(\([A-Z]\) )?([0-9]{4}-[0-9]{2}-[0-9]{2} )?([0-9]{4}-[0-9]{2}-[0-9]{2} )?(.*)$/.exec(line)
  return {
    done: !!matches[1],
    priority: matches[2] || null,
    completionDate: matches[3] || null,
    creationDate: matches[4] || null,
    description: matches[5],
    projects: [],
    contexts: [],
    extraMetadata: []
  }
}

TodoTXT.prototype.parseDescription = function parseDescription (description) {

}

module.exports = TodoTXT
