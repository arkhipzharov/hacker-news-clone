import ItemData from '@/ts/interfaces/api-data';

export default function isItemDataInvalid(isReverse = false) {
  return (data: ItemData | null) => {
    if (isReverse) {
      return !!(data !== null && !data.deleted && !data.dead);
    }
    return !!(data === null || data.deleted || data.dead);
  };
}
