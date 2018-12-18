
export function orderListItem(item,deleteOrderListItem){
	var price = item.price*item.qty

		return `
  <li id="${item.id}" data-id="${item.itemId}" data-qty="${item.qty}"><span>${item.name}</span> <button onclick="app.deleteOrderListItem('${item.id}','${item.qty}')" >x</button><span> $ ${price}</span></li>
  `
  }