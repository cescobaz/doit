const TodoTXT = require('../todotxt')
const todotxt = new TodoTXT()
const assert = require('assert')

describe('todotxt core', function () {
  it('simple description', function () {
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
    assert.deepEqual(task, expectedTask)
  })
  it('completed task with simple description', function () {
    const line = 'x Buy some food'
    const expectedTask = {
      done: true,
      priority: null,
      completionDate: null,
      creationDate: null,
      description: 'Buy some food',
      projects: [],
      contexts: [],
      extraMetadata: {}
    }
    const task = todotxt.parse(line)
    assert.deepEqual(task, expectedTask)
  })

  it('simple description starting with x (false completed)', function () {
    const line = 'xBuy some food'
    const expectedTask = {
      done: false,
      priority: null,
      completionDate: null,
      creationDate: null,
      description: 'xBuy some food',
      projects: [],
      contexts: [],
      extraMetadata: {}
    }
    const task = todotxt.parse(line)
    assert.deepEqual(task, expectedTask)
  })
  it('priority and simple description', function () {
    const line = '(A) Buy some food'
    const expectedTask = {
      done: false,
      priority: '(A)',
      completionDate: null,
      creationDate: null,
      description: 'Buy some food',
      projects: [],
      contexts: [],
      extraMetadata: {}
    }
    const task = todotxt.parse(line)
    assert.deepEqual(task, expectedTask)
  })
  it('wrong priority and simple description', function () {
    const line = '(a) Buy some food'
    const expectedTask = {
      done: false,
      priority: null,
      completionDate: null,
      creationDate: null,
      description: '(a) Buy some food',
      projects: [],
      contexts: [],
      extraMetadata: {}
    }
    const task = todotxt.parse(line)
    assert.deepEqual(task, expectedTask)
  })
  it('completion date and simple description', function () {
    const line = '2020-12-31 Buy some food'
    const expectedTask = {
      done: false,
      priority: null,
      completionDate: new Date('2020-12-31T00:00:00Z'),
      creationDate: null,
      description: 'Buy some food',
      projects: [],
      contexts: [],
      extraMetadata: {}
    }
    const task = todotxt.parse(line)
    assert.deepEqual(task, expectedTask)
  })
})
