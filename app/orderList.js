import { orderListItem } from './orderListItem.js'
export function orderList(items,deleteOrderListItem){
	console.log('orderlist'+items)
  return `
  <ul>
    ${items.map(item => orderListItem(item,deleteOrderListItem)).join('')}
    </ul>
  `
}
