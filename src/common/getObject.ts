export function convertIdToObject<T>(id: string, entity: new () => T): T {
  const obj = new entity();
  (obj as any).id = id;

  return obj;
}
