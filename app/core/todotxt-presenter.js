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

function projects (tasks) {
  return tags('projects', tasks)
}

function contexts (tasks) {
  return tags('contexts', tasks)
}

function tags (key, tasks) {
  if (!Array.isArray(tasks) || tasks.length === 0) {
    return []
  }
  return tasks.reduce((tags, task) => {
    const taskTags = task[key]
    if (!(Array.isArray(taskTags) && taskTags.length !== 0)) {
      return tags
    }
    return tags.concat(taskTags)
  }, [])
}

function indexForPriority (priority, maxPriorityIndex = 7) {
  const matches = /^ *\(([A-Z])\) *$/.exec(priority)
  if (!matches) {
    return maxPriorityIndex
  }
  return matches[1].charCodeAt(0) - 'A'.charCodeAt(0)
}

function colorForPriority (priority, maxPriorityIndex = 7) {
  const index = indexForPriority(priority, maxPriorityIndex)
  const saturatedIndex = (index > maxPriorityIndex) ? maxPriorityIndex : index
  if (saturatedIndex === maxPriorityIndex) {
    return 'gray'
  }
  const hdelta = 360 / maxPriorityIndex
  return `hsl(${saturatedIndex * hdelta},60%,50%)`
}

module.exports = { compare, projects, contexts, indexForPriority, colorForPriority }
