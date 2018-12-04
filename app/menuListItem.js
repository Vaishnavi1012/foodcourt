
export function menuListItem(item){
  return `
  <li id="${item.id}"><img src="${item.menuimg}" height="64" width="64"><p>${item.name}</p><span></span></li>
  `
  }
