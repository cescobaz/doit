const TodoTXT = require('../todotxt')
const todotxt = new TodoTXT()

describe('todotxt core', function () {
  it('only simple description', function () {
    const line = 'Buy some food'
    const expectedTask = {
      done: false,
      priority: null,
      completionDate: null,
      creationDate: null,
      description: line,
      projects: [],
      contexts: [],
      extraMetadata: {}
    }
    const task = todotxt.parse(line)

    expect(expectedTask).toBe(task)
  })
})
