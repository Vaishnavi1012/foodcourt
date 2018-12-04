
export function menuListItem(item){
  return `
  <li id="${item.id}" data-price="${item.price}"><img src="${item.menuimg}" height="64" width="64"><p>${item.name}</p><span></span></li>
  `
  }
