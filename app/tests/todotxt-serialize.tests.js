const TodoTXT = require('../core/todotxt')
const todotxt = new TodoTXT()
const { assert } = require('chai')

function serializeTest (input, expectedOutput) {
  const output = todotxt.serialize(input)
  assert.deepEqual(output, expectedOutput, JSON.stringify(output))
}

describe('todotxt serialize', function () {
  it('one complete task', function () {
    const tasks = [
      {
        done: done,
        priority: '(B)',
        completionDate: new Date('2020-02-28T00:00:00Z'),
        creationDate: new Date('2020-02-28T00:00:00Z'),
        description: 'Buy some food @food +health',
        projects: ['+health'],
        contexts: ['@food'],
        extraMetadata: {}
      }
    ]
    const expectedText = 'x (B) 2020-02-28 2020-02-01 Buy some food @food +health'
    serializeTest(tasks, expectedText)
  })
  it('two tasks, one done, one with priority', function () {
    const tasks = [
      {
        done: false,
        priority: null,
        completionDate: null,
        creationDate: null,
        description: 'Buy some food',
        projects: [],
        contexts: [],
        extraMetadata: {}
      },
      {
        done: true,
        priority: '(A)',
        completionDate: null,
        creationDate: null,
        description: 'Buy some wine',
        projects: [],
        contexts: [],
        extraMetadata: {}
      }
    ]
    const expectedText = 'Buy some food\nx (A) Buy some win'
    serializeTest(tasks, expectedText)
  })
})
