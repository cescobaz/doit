'use strict'
const fs = require('fs')

function TodoTXT () {
}

TodoTXT.prototype.load = function load (filePath, encoding, callback) {
  fs.readFile(filePath, encoding, function (error, content) {
    if (error) {
      return callback(error)
    }
    const tasks = content.split('\n').map(this.parse.bind(this))
    callback(null, tasks)
  })
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
  const firstDate = dateFromString(matches[3])
  const secondDate = dateFromString(matches[4])
  const done = !!matches[1] && !!firstDate
  return {
    done,
    priority: trimOrNull(matches[2]),
    completionDate: done ? firstDate : null,
    creationDate: done ? secondDate : (secondDate || firstDate),
    description,
    ...parseDescription(description)
  }
}

function parseDescriptionTags (description, regex) {
  const matches = regex.exec(description)
  if (!matches) {
    return []
  }
  return [matches[1]].concat(parseDescriptionTags(description, regex))
}

function parseDescriptionMetadata (regex) {
  return function parseDescriptionMetadataRec (description) {
    const matches = regex.exec(description)
    if (!matches) {
      return {}
    }
    return {
      [matches[1]]: matches[2],
      ...parseDescriptionMetadataRec(description)
    }
  }
}

function parseDescription (description) {
  const projects = parseDescriptionTags(description, /(\+\w+)/g)
  const contexts = parseDescriptionTags(description, /(@\w+)/g)
  const extraMetadata = parseDescriptionMetadata(/(\w+):(\w+)/g)(description)
  return {
    projects,
    contexts,
    extraMetadata
  }
}

module.exports = TodoTXT
