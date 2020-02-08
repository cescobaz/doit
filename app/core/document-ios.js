const TodoTXT = require('./todotxt')

const Document = UIDocument.extend({
  initWithFileURL (url) {
    console.log('initWithFileURL', url, this, this.super)
    this.todotxt = new TodoTXT()
    return super.initWithFileURL(url)
  },
  contentsForType (type) {
    console.log('contentsForType', type)
    return 'ciao contenturto file'.dataUsingEncoding(NSUTF8StringEncoding)
  },
  loadFromContentsOfTypeError (contents, typeName) {
    const stringContent = NSString.alloc().initWithDataEncoding(contents, NSUTF8StringEncoding).toString()
    const tasks = this.todotxt.parse(stringContent)
    this.tasks = tasks
    return true
  }
}, {
  name: 'Document'
})

module.exports = Document
