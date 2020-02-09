const TodoTXT = require('./todotxt')

const Document = UIDocument.extend({
  initWithFileURL (url) {
    this.todotxt = new TodoTXT()
    return super.initWithFileURL(url)
  },
  contentsForType (type) {
    console.log('contentsForType SAVINGGGG??', type)
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

const todotxtBookmarkDataKey = 'todotxtBookmarkData'
function storeBookmark (url) {
  console.log('storeBookmark')
  const data = url.bookmarkDataWithOptionsIncludingResourceValuesForKeysRelativeToURLError(
    NSURLBookmarkCreationOptions.NSURLBookmarkCreationWithSecurityScope, [], null)
  NSUserDefaults.standardUserDefaults.setObjectForKey(data, todotxtBookmarkDataKey)
}

function loadBookmark () {
  const data = NSUserDefaults.standardUserDefaults.dataForKey(todotxtBookmarkDataKey)
  if (!data) {
    return null
  }
  const isStale = new interop.Reference(interop.types.bool)
  const url = NSURL.URLByResolvingBookmarkDataOptionsRelativeToURLBookmarkDataIsStaleError(
    data,
    NSURLBookmarkCreationOptions.NSURLBookmarkCreationWithSecurityScope,
    null, isStale)
  console.log('[INFO] isStale', isStale.value)
  if (isStale.value) {
    console.log('[WARNING] isStale == true, I will re-store and re-load bookmark', isStale.value)
    storeBookmark(url)
    return loadBookmark()
  }
  return url
}

function loadDocument (documentLoaded) {
  const url = loadBookmark()
  loadDocumentWithURL(url, documentLoaded)
}

function loadDocumentWithURL (url, documentLoaded) {
  if (!url) {
    return documentLoaded(null)
  }
  const document = Document.alloc().initWithFileURL(url)
  document.openWithCompletionHandler(success => {
    if (!success) {
      documentLoaded(null)
    }
    storeBookmark(url)
    documentLoaded(document)
  })
}

module.exports = { loadDocumentWithURL, loadDocument }
