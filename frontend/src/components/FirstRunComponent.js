/* eslint-disable jsx-a11y/click-events-have-key-events */
import * as React from 'react';
import { BsBucket } from 'react-icons/bs';

import ModalHeader from './ModalHeader';
import SubmitButton from './SubmitButton';

export default function FirstRunComponent({ setModalOpen }) {
  function handleGithubClick() {
    window.open('https://github.com/MisterPea/s3-ui', '_blank');
  }

  return (
    <div className="modal-wrapper demo-modal">
      <ModalHeader text="Notes on this Project" Icon={BsBucket} />
      <p className="demo-text">
        This particular instance of S3-UI is set up as a demonstration site.
        So, feel free to add/delete buckets as well as add/delete, upload/download files;
        play around. This space will be periodically cleaned, so if you happen to upload
        something, it may not be here when you return. You can check out the source code
        on
        {' '}
        <strong><span role="button" tabIndex={0} onClick={handleGithubClick}>Github</span></strong>
        {' '}
        and see what improvements are in the works.
      </p>
      <SubmitButton text="Let's Go!" longer="true" clickHandle={() => setModalOpen((s) => !s)} />
    </div>
  );
}
