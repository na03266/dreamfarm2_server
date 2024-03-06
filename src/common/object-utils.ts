export function areObjectsEqual<T>(obj1: Partial<T>, obj2: Partial<T>): boolean {
  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);

  // 먼저 키의 수가 동일한지 확인합니다.
  if (keys1.length !== keys2.length) {
    return false;
  }

  // obj1의 모든 키에 대해 값이 동일한지 확인합니다.
  for (const key of keys1) {
    if (obj1[key] !== obj2[key]) {
      return false;
    }
  }

  // 모든 키에 대해 값이 같다면, 두 객체는 동일합니다.
  return true;
}
