
export function menuListItem(item,addFoodList){
  return `
  <li id="${item.itemId}" onclick="app.addFoodList('${item.itemId}','${item.name}','${item.price}','${item.qty}')" ><img src="${item.menuimg}" height="64" width="64"><p>${item.name}</p></li>
  `
  }
