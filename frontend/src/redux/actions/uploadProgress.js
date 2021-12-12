export const UPLOAD_INIT = 'UPLOAD_INIT';
export const UPLOAD_PROGRESS = 'UPLOAD_PROGRESS';
export const UPLOAD_END = 'UPLOAD_END';

/**
 * Action creator to initiate a new uploadProgress element
 * @param {string} fileId Upload id for the file, derived from getUploadId() in file.js action
 * @return {Object} Returns action type of UPLOAD_INIT, the fileId, and a zero percentage
 */
export function uploadInit(fileId) {
  return {
    type: UPLOAD_INIT,
    fileId,
    percentage: 0,
  };
}

export function uploadProgress(fileId, percentage) {
  return {
    type: UPLOAD_PROGRESS,
    fileId,
    percentage,
  };
}

/**
 * Action creator to end an upload progress for an element
 * @param {string} fileId Upload id that has completed or is to be terminated
 * @return {Object} Returns action type of UPLOAD_END and the fileId
 */
export function uploadEnd(fileId) {
  return {
    type: UPLOAD_END,
    fileId,
  };
}
