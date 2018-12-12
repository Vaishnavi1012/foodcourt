
export function orderListItem(item,deleteOrderListItem){
  return `
  <li id="${item.id}"><h3>${item.name}</h3> <button onclick="app.deleteOrderListItem('${item.id}')" >x</button><span> $${item.price}</span></li>
  `
  }