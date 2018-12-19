
export function orderListItem(item,deleteOrderListItem){
	var price = item.price*item.qty

		return `
  <li id="${item.id}" data-id="${item.itemId}" data-qty="${item.qty}">
  <h3>${item.name}
  x${item.qty}
  <span class="order_cross" onclick="app.deleteOrderListItem('${item.id}','${item.qty}')"><img src="img/RedCross.jpg" width="16" /></span>
  <span class="order_price">$${price}</span> </h3>
  </li>
  `
  }

