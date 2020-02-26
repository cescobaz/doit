'use strict'

const todotxt = require('../core/todotxt-presenter')
const { assert } = require('chai')

function projectsTest (input, expectedOutput) {
  const output = todotxt.projects(input)
  assert.deepEqual(output, expectedOutput, JSON.stringify(output))
}

describe('todotxt presenter projects', function () {
  it('no tasks', function () {
    const tasks = []
    projectsTest(tasks, [])
  })
  it('one task with no projects', function () {
    const tasks = [{
    }]
    projectsTest(tasks, [])
  })
  it('one task with projects null', function () {
    const tasks = [{
      projects: null
    }]
    projectsTest(tasks, [])
  })
  it('one task with one projects', function () {
    const tasks = [{
      projects: ['+mytestproject']
    }]
    projectsTest(tasks, ['+mytestproject'])
  })
  it('one task with two projects', function () {
    const tasks = [{
      projects: ['+mytestproject', '+mytestproject2']
    }]
    projectsTest(tasks, ['+mytestproject', '+mytestproject2'])
  })
  it('two task with one projects for each task', function () {
    const tasks = [{
      projects: ['+mytestproject']
    }, {
      projects: ['+mytestproject2']
    }]
    projectsTest(tasks, ['+mytestproject', '+mytestproject2'])
  })
  it('two task, only one with projects', function () {
    const tasks = [{
      projects: ['+mytestproject']
    }, {
      projects: undefined
    }]
    projectsTest(tasks, ['+mytestproject'])
  })
  it('three task with no projects', function () {
    const tasks = [{
      projects: null
    }, {
      projects: undefined
    }, {
      projects: []
    }]
    projectsTest(tasks, [])
  })
  it('three task only one with projects', function () {
    const tasks = [{
      projects: null
    }, {
      projects: undefined
    }, {
      projects: ['+mytestproject', '+mytestproject2']
    }]
    projectsTest(tasks, ['+mytestproject', '+mytestproject2'])
  })
  it('three task with projects', function () {
    const tasks = [{
      projects: ['+project11', '+project12', '+project13']
    }, {
      projects: ['+project21', '+project22']
    }, {
      projects: ['+project31', '+project32']
    }]
    projectsTest(tasks, [
      '+project11', '+project12', '+project13',
      '+project21', '+project22',
      '+project31', '+project32'
    ])
  })
})

function contextsTest (input, expectedOutput) {
  const output = todotxt.contexts(input)
  assert.deepEqual(output, expectedOutput, JSON.stringify(output))
}

describe('todotxt presenter contexts', function () {
  it('three task with contexts', function () {
    const tasks = [{
      contexts: ['+context11', '+context12', '+context13']
    }, {
      contexts: ['+context21', '+context22']
    }, {
      contexts: ['+context31', '+context32']
    }]
    contextsTest(tasks, [
      '+context11', '+context12', '+context13',
      '+context21', '+context22',
      '+context31', '+context32'
    ])
  })
})
