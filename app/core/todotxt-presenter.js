'use strict'

function compare (a, b) {
  if (a.done !== b.done) {
    return (a.done !== true) ? -1 : 1
  }
  if (a.priority !== b.priority) {
    return ((a.priority && b.priority && a.priority < b.priority) ||
        (a.priority && !b.priority)) ? -1 : 1
  }
  if (a.completionDate !== b.completionDate) {
    if (a.completionDate && b.completionDate) {
      return a.completionDate < b.completionDate ? -1 : 1
    }
    return (a.completionDate) ? -1 : 1
  }
  if (a.creationDate !== b.creationDate) {
    if (a.creationDate && b.creationDate) {
      return a.creationDate < b.creationDate ? -1 : 1
    }
    return (a.creationDate) ? -1 : 1
  }
  return 0
}
function sort (tasks) {
  return tasks.sort(compare)
}

function projects (tasks) {
  return tags('projects', tasks)
}

function contexts (tasks) {
  return tags('contexts', tasks)
}

function tags (key, tasks) {

}

module.exports = { compare, sort, projects, contexts }
