
export function tableListItem(item,selectTable){
  return `
  <li onclick="app.selectTable('${item.id}')" ><span>${item.id}</span></li>
  `
  }