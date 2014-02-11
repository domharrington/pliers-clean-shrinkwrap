# pliers-clean-shrinkwrap

Strips out 'resolved' from npmshrinkwraps

## Installation

      npm install pliers-clean-shrinkwrap

## Usage

This will expose a new pliers task.

```js
// within a pliers.js
module.exports = function (pliers) {

  require('pliers-clean-shrinkwrap')(pliers)

}
```

Then from the cli

```
pliers cleanShrinkwrap
```

Will clean the npmshrinkwrap.json in the current directory.


## Credits
[Paul Serby](https://github.com/serby/) follow me on twitter [@serby](http://twitter.com/serby)

## Licence
Licensed under the [New BSD License](http://opensource.org/licenses/bsd-license.php)
