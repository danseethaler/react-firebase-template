'use strict';

const spawn = require('child-process-promise').spawn;

exports.orientImage = function(filePath) {
  // Get Metadata from image.
  return spawn('identify', ['-verbose', filePath], {
    capture: ['stdout', 'stderr'],
  }).then(({ stdout }) => {
    const metadata = imageMagickOutputToObject(stdout);

    console.log('metadata', metadata);

    console.log('Orientation:', metadata.Orientation);

    // Rotate the image
    switch (metadata.Orientation) {
      case 'BottomRight':
        console.log('Rotating Image 180 degrees');
        return spawn('convert', [filePath, '-rotate', '180', filePath]);

      case 'RightTop':
        console.log('Rotating Image 90 degrees');
        return spawn('convert', [filePath, '-rotate', '90', filePath]);

      case 'LeftBottom':
        console.log('Rotating Image -90 degrees');
        return spawn('convert', [filePath, '-rotate', '-90', filePath]);

      default:
        console.log('Rotating Image 0 degrees');
        return spawn('convert', [filePath, '-rotate', '0', filePath]);
    }
  });
};

/**
 * Convert the output of ImageMagick's `identify -verbose` command to a JavaScript Object.
 */
function imageMagickOutputToObject(output) {
  let previousLineIndent = 0;
  const lines = output.match(/[^\r\n]+/g);
  lines.shift(); // Remove First line
  lines.forEach((line, index) => {
    const currentIdent = line.search(/\S/);
    line = line.trim();
    if (line.endsWith(':')) {
      lines[index] = makeKeyFirebaseCompatible(`"${line.replace(':', '":{')}`);
    } else {
      const split = line.replace('"', '\\"').split(': ');
      split[0] = makeKeyFirebaseCompatible(split[0]);
      lines[index] = `"${split.join('":"')}",`;
    }
    if (currentIdent < previousLineIndent) {
      lines[index - 1] = lines[index - 1].substring(
        0,
        lines[index - 1].length - 1
      );
      lines[index] =
        new Array(1 + (previousLineIndent - currentIdent) / 2).join('}') +
        ',' +
        lines[index];
    }
    previousLineIndent = currentIdent;
  });
  output = lines.join('');
  output = '{' + output.substring(0, output.length - 1) + '}'; // remove trailing comma.
  output = JSON.parse(output);
  return output;
}

/**
 * Makes sure the given string does not contain characters that can't be used as Firebase
 * Realtime Database keys such as '.' and replaces them by '*'.
 */
function makeKeyFirebaseCompatible(key) {
  return key.replace(/\./g, '*');
}
