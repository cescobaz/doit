const todotxt = require('../core/todotxt-presenter')
const { assert } = require('chai')

function serializeTest (input, expectedOutput) {
  const output = todotxt.sort(input)
  assert.deepEqual(output, expectedOutput, JSON.stringify(output))
}

describe('todotxt presenter', function () {
  it('by done/not done', function () {
    const tasks = [
      {
        done: true,
        priority: null,
        completionDate: null,
        creationDate: null,
        description: 'Buy some food',
        projects: [],
        contexts: [],
        extraMetadata: {}
      },

      {
        done: false,
        priority: null,
        completionDate: null,
        creationDate: null,
        description: 'Buy some food',
        projects: [],
        contexts: [],
        extraMetadata: {}
      }
    ]
    serializeTest(tasks, [tasks[1], tasks[0]])
  })
  it('by priority - nop', function () {
    const tasks = [
      {
        done: false,
        priority: '(B)'
      },

      {
        done: false,
        priority: '(E)'
      }
    ]
    serializeTest(tasks, [tasks[0], tasks[1]])
  })
  it('by priority', function () {
    const tasks = [
      {
        done: false,
        priority: '(B)'
      },
      {
        done: false,
        priority: '(Z)'
      },
      {
        done: false,
        priority: '(A)'
      }
    ]
    serializeTest(tasks, [tasks[2], tasks[0], tasks[1]])
  })
  it('by priority - one null', function () {
    const tasks = [
      {
        done: false,
        priority: '(B)'
      },
      {
        done: false,
        priority: null
      },
      {
        done: false,
        priority: '(A)'
      }
    ]
    serializeTest(tasks, [tasks[2], tasks[0], tasks[1]])
  })
  it('by priority and done', function () {
    const tasks = [
      {
        done: false,
        priority: '(W)'
      },
      {
        done: true,
        priority: '(A)'
      },
      {
        done: false,
        priority: '(C)'
      }
    ]
    serializeTest(tasks, [tasks[2], tasks[0], tasks[1]])
  })
  it('by creation date', function () {
    const tasks = [
      {
        done: false,
        priority: null,
        creationDate: new Date('2020-01-23T00:00:00Z')
      },
      {
        done: false,
        priority: null,
        creationDate: new Date('2020-12-23T00:00:00Z')
      },
      {
        done: false,
        priority: null,
        creationDate: new Date('2020-01-07T00:00:00Z')
      }
    ]
    serializeTest(tasks, [tasks[2], tasks[0], tasks[1]])
  })
  it('by creation date - with null', function () {
    const tasks = [
      {
        done: false,
        priority: null,
        creationDate: new Date('2020-01-23T00:00:00Z')
      },
      {
        done: false,
        priority: null,
        creationDate: null
      },
      {
        done: false,
        priority: null,
        creationDate: new Date('2020-01-07T00:00:00Z')
      }
    ]
    serializeTest(tasks, [tasks[2], tasks[0], tasks[1]])
  })
  it('by done, priority and creation date', function () {
    const tasks = [
      {
        done: true,
        priority: null,
        creationDate: new Date('2020-01-23T00:00:00Z')
      },
      {
        done: false,
        priority: null,
        creationDate: new Date('2020-12-23T00:00:00Z')
      },
      {
        done: false,
        priority: '(A)',
        creationDate: new Date('2020-01-07T00:00:00Z')
      }
    ]
    serializeTest(tasks, [tasks[2], tasks[1], tasks[0]])
  })
  it('by completion date', function () {
    const tasks = [
      {
        done: true,
        priority: null,
        completionDate: new Date('2020-01-23T00:00:00Z')
      },
      {
        done: true,
        priority: null,
        completionDate: new Date('2020-12-23T00:00:00Z')
      },
      {
        done: true,
        priority: null,
        completionDate: new Date('2020-01-07T00:00:00Z')
      }
    ]
    serializeTest(tasks, [tasks[2], tasks[0], tasks[1]])
  })
})
