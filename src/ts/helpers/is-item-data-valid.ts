import ItemData from '@/ts/interfaces/api-data';

export default function isItemDataValid(data: ItemData | null | undefined) {
  return !!(data && !data.deleted && !data.dead);
}
