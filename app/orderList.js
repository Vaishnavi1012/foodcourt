import { orderListItem } from './orderListItem.js'
export function orderList(items,deleteOrderListItem,itemExist){
  return `
  <ul>
    ${items.map(item => orderListItem(item,deleteOrderListItem)).join('')}
    </ul>
  `
}