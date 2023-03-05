export function hash(str: string): string {
  let _hash: number = 5381;
  let _i = str.length;

  while(_i) {
    _hash =  (_hash * 33) ^ str.charCodeAt(--_i)
  }
  
  return String(_hash >>> 0);
}