
export function menuListItem(item,addFoodList){
  return `
  <li id="${item.id}" data-price="${item.price}" onclick="app.addFoodList('${item.id}','${item.name}','${item.price}')" ><img src="${item.menuimg}" height="64" width="64"><p>${item.name}</p></li>
  `
  }
