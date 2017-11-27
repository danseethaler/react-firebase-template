import React, { Component } from 'react';
import loadImage from 'blueimp-load-image';

import Avatar from './Avatar';
import { storageRef } from '../config/firebase';

class AvatarPicker extends Component {
  getExt = str => {
    const extIndex = str.lastIndexOf('.') + 1;
    if (!extIndex) return false;
    return str.substr(extIndex).toLowerCase();
  };

  convertAndUpload = (size, options, cb) => {
    const { id, basename } = this.props;
    const file = document.getElementById(`image-upload-input-${id}`).files[0];
    const fileName = `${basename}.${this.getExt(file.name)}`;

    loadImage(
      file,
      img => {
        if (!img || img.type === 'error' || !img.toDataURL) {
          return cb(new Error('Error converting image.'));
        }

        const dataUrl = img.toDataURL('image/png');
        var imgRef = storageRef.child(`images/${size}/${fileName}`);

        imgRef
          .putString(dataUrl, 'data_url')
          .then(({ downloadURL: imageURL }) => {
            cb(null, {
              size,
              imageURL,
            });
          })
          .catch(err => {
            throw err;
          });
      },
      options
    );
  };

  handleFiles = e => {
    const { handler } = this.props;

    this.convertAndUpload(
      'full',
      {
        maxWidth: 1200,
        maxHeight: 1200,
        orientation: true,
      },
      handler
    );

    this.convertAndUpload(
      'thumb',
      {
        maxWidth: 300,
        maxHeight: 300,
        orientation: true,
      },
      handler
    );
  };

  render() {
    const { altText, imageURL, id } = this.props;

    return (
      <div>
        <label htmlFor={`image-upload-input-${id}`}>
          <Avatar text={altText} imageURL={imageURL} big />
        </label>

        <input
          id={`image-upload-input-${id}`}
          style={{
            opacity: 0,
            position: 'absolute',
            zIndex: -1,
          }}
          type="file"
          accept="image/*"
          onChange={this.handleFiles}
        />
      </div>
    );
  }
}

export default AvatarPicker;
