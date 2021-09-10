export const LOADER_ENABLED = 'LOADER_ENABLED';
export const LOADER_DISABLED = 'LOADER_DISABLED';

export function showLoader() {
  return {
    type: LOADER_ENABLED,
  };
}

export function hideLoader() {
  return {
    type: LOADER_DISABLED,
  };
}