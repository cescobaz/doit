'use strict'

function TodoTXT () {
}

TodoTXT.prototype.load = function load (filePath) {

}
function trimOrNull (text) {
  if (text === undefined || text === null) {
    return null
  }
  return text.trim()
}
function dateFromString (text) {
  if (!text) {
    return null
  }
  return new Date(`${text.trim()}T00:00:00Z`)
}
TodoTXT.prototype.parse = function parse (line) {
  const matches = /(x )?(\([A-Z]\) )?([0-9]{4}-[0-9]{2}-[0-9]{2} )?([0-9]{4}-[0-9]{2}-[0-9]{2} )?(.*)$/.exec(line)
  const description = matches[5]
  return {
    done: !!matches[1],
    priority: trimOrNull(matches[2]),
    completionDate: dateFromString(matches[3]),
    creationDate: matches[4] || null,
    description,
    ...this.parseDescription(description)
  }
}

TodoTXT.prototype.parseDescription = function parseDescription (description) {
  const projects = /(\+\w+)/g.exec(description) || []
  if (projects.length > 0) {
    projects.splice(0, 1)
  }
  const contexts = []
  const extraMetadata = {}
  return {
    projects,
    contexts,
    extraMetadata
  }
}

module.exports = TodoTXT
