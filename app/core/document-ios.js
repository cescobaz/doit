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
    console.log('loadFromContentsOfType AAAAAAAAAAAAAA')
    const stringContent = NSString.alloc().initWithDataEncoding(contents, NSUTF8StringEncoding)
    console.log('loadFromContentsOfType EEEEEEEEEEND init')
    console.log('loadFromContentsOfType', typeName, contents.length)
    console.log('loadFromContentsOfType', contents)
    console.log('loadFromContentsOfType', stringContent)
    console.log('loadFromContentsOfType', JSON.parseLineLine(JSON.decode(stringContent)))
    const tasks = this.todotxt
    return stringContent
  }
}, {
  name: 'Document'
})

module.exports = Document
