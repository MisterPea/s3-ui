import * as React from 'react';
import propTypes from 'prop-types';
import {
  Zip, Image, Code, PDF, Default, Media, Font,
} from '../graphic_elements/Icons';

export default function FileIcon({ name }) {
  const extension = name.split('.');
  switch (extension[extension.length - 1]) {
    case 'jpeg':
    case 'jpg':
    case 'gif':
    case 'tiff':
    case 'tif':
    case 'png':
    case 'svg':
    case 'ico':
      return <Image />;
    case 'html':
    case 'htm':
    case 'js':
    case 'json':
    case 'css':
    case 'sass':
    case 'scss':
    case 'py':
    case 'php':
    case 'sh':
    case 'xml':
    case 'md':
      return <Code />;
    case 'pdf':
    case 'ps':
      return <PDF />;
    case 'zip':
    case 'pkg':
    case 'gz':
    case 'rar':
      return <Zip />;
    case 'mp3':
    case 'mp4':
    case 'aiff':
    case 'mpeg':
    case 'ogg':
    case 'wav':
      return <Media />;
    case 'ttf':
    case 'woff':
    case 'otf':
    case 'eot':
    case 'fnt':
      return <Font />;
    default:
      return <Default />;
  }
}

FileIcon.defaultProps = {
  name: '',
};

FileIcon.propTypes = {
  name: propTypes.string,
};
