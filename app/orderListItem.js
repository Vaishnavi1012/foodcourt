
export function orderListItem(item,deleteOrderListItem){
	console.log(item.id)
  return `
  <li id="${item.id}"><h3>${item.name}</h3> <button onclick="app.deleteOrderListItem('${item.id}')" >x</button><span>${item.price}</span></li>
  `
  }