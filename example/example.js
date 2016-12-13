var imshow = require('ndarray-imshow');
var baboon = require('baboon-image');
var scale = require('../');

require('save-pixels')(scale(baboon, [0.5, 0.5]), "png").pipe(require('fs').createWriteStream('./test.png'))
