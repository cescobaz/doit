const TodoTXT = require('../todotxt')
const todotxt = new TodoTXT()
const { assert } = require('chai')

function parseTest (input, expectedOutput) {
  const output = todotxt.parse(input)
  assert.deepEqual(output, expectedOutput, JSON.stringify(output))
}

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
    parseTest(line, expectedTask)
  })
  it('simple description starting with x and space (false completed)', function () {
    const line = 'x Buy some food'
    const expectedTask = {
      done: false,
      priority: null,
      completionDate: null,
      creationDate: null,
      description: 'Buy some food',
      projects: [],
      contexts: [],
      extraMetadata: {}
    }
    parseTest(line, expectedTask)
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
    parseTest(line, expectedTask)
  })
  it('completed task', function () {
    const line = 'x 2020-02-20 Buy some food'
    const expectedTask = {
      done: true,
      priority: null,
      completionDate: new Date('2020-02-20T00:00:00Z'),
      creationDate: null,
      description: 'Buy some food',
      projects: [],
      contexts: [],
      extraMetadata: {}
    }
    parseTest(line, expectedTask)
  })
  it('completed task with creation date', function () {
    const line = 'x 2020-02-20 2020-02-01 Buy some food'
    const expectedTask = {
      done: true,
      priority: null,
      completionDate: new Date('2020-02-20T00:00:00Z'),
      creationDate: new Date('2020-02-01T00:00:00Z'),
      description: 'Buy some food',
      projects: [],
      contexts: [],
      extraMetadata: {}
    }
    parseTest(line, expectedTask)
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
    parseTest(line, expectedTask)
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
    parseTest(line, expectedTask)
  })
  it('completion date and simple description', function () {
    const line = '2020-12-31 Buy some food'
    const expectedTask = {
      done: false,
      priority: null,
      completionDate: null,
      creationDate: new Date('2020-12-31T00:00:00Z'),
      description: 'Buy some food',
      projects: [],
      contexts: [],
      extraMetadata: {}
    }
    parseTest(line, expectedTask)
  })
  it('one project', function () {
    const line = 'Buy some +food'
    const expectedTask = {
      done: false,
      priority: null,
      completionDate: null,
      creationDate: null,
      description: 'Buy some +food',
      projects: ['+food'],
      contexts: [],
      extraMetadata: {}
    }
    parseTest(line, expectedTask)
  })
  it('two project', function () {
    const line = 'Buy some +food for +home'
    const expectedTask = {
      done: false,
      priority: null,
      completionDate: null,
      creationDate: null,
      description: 'Buy some +food for +home',
      projects: ['+food', '+home'],
      contexts: [],
      extraMetadata: {}
    }
    parseTest(line, expectedTask)
  })
  it('two project and one context', function () {
    const line = 'Buy some +food for +home @betterLife'
    const expectedTask = {
      done: false,
      priority: null,
      completionDate: null,
      creationDate: null,
      description: 'Buy some +food for +home @betterLife',
      projects: ['+food', '+home'],
      contexts: ['@betterLife'],
      extraMetadata: {}
    }
    parseTest(line, expectedTask)
  })
  it('two project and three context', function () {
    const line = 'Buy some +food for +home @betterLife @yeah and @cool'
    const expectedTask = {
      done: false,
      priority: null,
      completionDate: null,
      creationDate: null,
      description: 'Buy some +food for +home @betterLife @yeah and @cool',
      projects: ['+food', '+home'],
      contexts: ['@betterLife', '@yeah', '@cool'],
      extraMetadata: {}
    }
    parseTest(line, expectedTask)
  })
  it('completed task with two project and three context', function () {
    const line = 'x 2020-02-20 Buy some +food for +home @betterLife @yeah and @cool'
    const expectedTask = {
      done: true,
      priority: null,
      completionDate: new Date('2020-02-20T00:00:00Z'),
      creationDate: null,
      description: 'Buy some +food for +home @betterLife @yeah and @cool',
      projects: ['+food', '+home'],
      contexts: ['@betterLife', '@yeah', '@cool'],
      extraMetadata: {}
    }
    parseTest(line, expectedTask)
  })
  it('one extra metadata', function () {
    const line = 'Buy some food due:tomorrow'
    const expectedTask = {
      done: false,
      priority: null,
      completionDate: null,
      creationDate: null,
      description: 'Buy some food due:tomorrow',
      projects: [],
      contexts: [],
      extraMetadata: { due: 'tomorrow' }
    }
    parseTest(line, expectedTask)
  })
  it('one extra metadata', function () {
    const line = 'Buy some food due:tomorrow'
    const expectedTask = {
      done: false,
      priority: null,
      completionDate: null,
      creationDate: null,
      description: 'Buy some food due:tomorrow',
      projects: [],
      contexts: [],
      extraMetadata: { due: 'tomorrow' }
    }
    parseTest(line, expectedTask)
  })
})
