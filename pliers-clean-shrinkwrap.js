var fs = require('fs')
  , join = require('path').join

module.exports = function (pliers) {

  return function (done) {

    if (!pliers.version) {
      pliers.logger.error('You need pliers >=0.3.4 to use this plugin')
      done(1)
    }

    var shrinkwrapPath = join(pliers.cwd , '/npm-shrinkwrap.json')
      , shrinkwrap = require(shrinkwrapPath)

    function replacer(key, val) {
      if (key === 'resolved' && this.from && this.version && (this.from.indexOf('.git') === -1)) {
        pliers.logger.debug('Removing', val)
        return undefined
      } else {
        return val
      }
    }

    fs.writeFileSync(shrinkwrapPath, JSON.stringify(shrinkwrap, replacer, 2))
    pliers.logger.debug('Writing shrinkwrap to ', shrinkwrapPath)
    done()
  }

}