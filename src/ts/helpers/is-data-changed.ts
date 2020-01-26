import ItemData from '@/ts/interfaces/api-data';

export default function isDataChanged(itemsData: ItemData[]) {
  return itemsData.length > 0;
}
