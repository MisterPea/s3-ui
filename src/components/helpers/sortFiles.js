export default function sortFiles(files) {
  if (files) {
    return files.sort((a, b) => {
      if (a.type === b.type) {
        return a.name.toLowerCase() < b.name.toLowerCase() ? -1 : 1;
      }
      return a.type < b.type ? -1 : 1;
    });
  }
  return files;
}
