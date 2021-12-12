import { UPLOAD_INIT, UPLOAD_PROGRESS, UPLOAD_END } from '../actions/uploadProgress';

export default function uploadProgress(state = [], action) {
  switch (action.type) {
    case UPLOAD_INIT:
      return state.concat([{ fileId: action.fileId, percentage: 0 }]);
    case UPLOAD_PROGRESS:
      return state.map((upload) => (upload.fileId === action.fileId
        ? { fileId: upload.fileId, percentage: action.percentage }
        : upload));
    case UPLOAD_END:
      return state.filter((upload) => upload.fileId !== action.fileId);
    default:
      return state;
  }
}
