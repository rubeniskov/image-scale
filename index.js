'use strict'

var pool = require('ndarray-scratch'),
    wrap = require('ndarray-warp');

module.exports = ndarrayScale

function ndarrayScale() {
    var i, input, output, scale

    if (arguments.length === 2) {
        // With allocation (output not specified):
        input = arguments[0]
        scale = arguments[1]
    } else if (arguments.length === 3) {
        // Without allocation (output specified):
        output = arguments[0]
        input = arguments[1]
        scale = arguments[2]
    }

    if (!Array.isArray(scale)) {
        throw new Error('second argument of tile must be an array of repetition counts for each dimension')
    }

    // Calculate the output dimensions:
    var inputShape = input.shape.slice(0)
    var newShape = inputShape.slice(0)
    var newDim = Math.max(newShape.length, scale.length)

    for (i = 0; i < newDim; i++) {
        // Assume unspecified dimensions has length 1:
        inputShape[i] = inputShape[i] === undefined ? 1 : inputShape[i]

        // Unspecified scale have shape 1:
        scale[i] = scale[i] === undefined ? 1 : scale[i]

        // Calculate the new total shape:
        newShape[i] = ~~((newShape[i] === undefined ? 1 : newShape[i]) * scale[i])

        // Disallow zero:
        if (newShape[i] === 0) {
            throw new Error('Number of tiles must be greater than zero')
        }
    }
    if (!output) {
        output = pool.zeros(newShape, input.dtype);
    }
    wrap(output, input, function(out, inp) {
          out[0] = inp[0] / (output.shape[0] / input.shape[0]);
          out[1] = inp[1] / (output.shape[1] / input.shape[1]);
          out[2] = inp[2];
        });

    return output;
}
