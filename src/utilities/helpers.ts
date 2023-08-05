export function transformNameToClassNameComponent(name: string): string {
  return name
    .replace(/^./, name[0].toLowerCase())
    .replace(/\s/g, '');
}