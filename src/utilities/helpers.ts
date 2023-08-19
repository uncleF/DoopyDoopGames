export function transformNameToClassNameComponent(name: string): string {
  return name
    .replace(/^./, name[0].toLowerCase())
    .replace(/\s/g, '');
}

export function findFileExtension(filename: string): string | null {
  const extension = filename.split('.').pop();
  if (extension) {
    return extension;
  }
  return null;
}

export function generateImageMIMEType(image: string): string {
  const extension = findFileExtension(image);
  switch (extension) {
    case 'jpg':
    case 'jpeg':
      return 'image/jpeg';
    case 'png':
      return 'image/png';
    case 'gif':
      return 'image/gif';
    case 'svg':
      return 'image/svg+xml';
    case 'webp':
      return 'image/webp';
    default:
      return '';
  }
}
