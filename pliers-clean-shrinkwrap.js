var fs = require('fs')
  , join = require('path').join

module.exports = function (pliers) {

  pliers('cleanShrinkwrap', function () {

    if (!pliers.version) {
      pliers.logger.error('You need pliers >=0.3.4 to use this plugin')
      done(1)
    }

    var shrinkwrapPath = join(pliers.cwd , '/npm-shrinkwrap.json')
      , shrinkwrap = require(shrinkwrapPath)

    function replacer(key, val) {
      if (key === 'resolved' && this.from && this.version) {
        pliers.logger.debug('Removing', val)
        return undefined
      } else {
        return val
      }
    }

    fs.writeFileSync(shrinkwrapPath, JSON.stringify(shrinkwrap, replacer, 2))
  })
}