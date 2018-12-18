
export function orderListItem(item,deleteOrderListItem,itemExist){
	if(itemExist){
		return `
  <li id="${item.id}" data-id="${item.itemId} data-qty="${item.qty}"><h3>${item.name}</h3> <button onclick="app.deleteOrderListItem('${item.id}')" >x</button><span> $${item.price}*${item.qty}</span></li>
  `
	}
	else{
		return `
  <li id="${item.id}" data-id="${item.itemId}" data-qty="${item.qty}"><h3>${item.name}</h3> <button onclick="app.deleteOrderListItem('${item.id}')" >x</button><span> $${item.price}</span></li>
  `
	}
  }