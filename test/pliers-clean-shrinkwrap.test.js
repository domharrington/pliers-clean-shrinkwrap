var createPliers = require('pliers').bind(null, { cwd: __dirname, logLevel: 'error' })
  , cleanShrinkwrap = require('..')
  , fs = require('fs')
  , assert = require('assert')
  , shrinkWrapPath = __dirname + '/npm-shrinkwrap.json'

describe('pliers-clean-shrinkwrap', function () {

  beforeEach(function (done) {
    fs.unlinkSync(shrinkWrapPath)
    fs.createReadStream(__dirname + '/fixture.npm-shrinkwrap.json')
    .pipe(fs.createWriteStream(shrinkWrapPath))
    .on('finish', done)
  })

  it('should strip resolve paths', function (done) {
    var pliers = createPliers()
    cleanShrinkwrap(pliers)(function() {
      var shrinkWrap = JSON.parse(fs.readFileSync(shrinkWrapPath))
      shrinkWrap.dependencies.lodash.should.not.have.property('resolved')
      done()
    })
  })

  it('should not strip resolve paths for git based modules', function (done) {
    var pliers = createPliers()
    cleanShrinkwrap(pliers)(function() {
      var shrinkWrap = JSON.parse(fs.readFileSync(shrinkWrapPath))
      shrinkWrap.dependencies['git-package'].should.have.property('resolved')
      shrinkWrap.dependencies['git-protocol-package'].should.have.property('resolved')
      shrinkWrap.dependencies['github-shorthand-url'].should.have.property('resolved')
      done()
    })
  })

  it('should not throw if the package name is `from`', function () {
    var pliers = createPliers()
    assert.doesNotThrow(function () {
      cleanShrinkwrap(pliers)(function() {})
    }, /Object #<Object> has no method 'match'/)
  })
})
