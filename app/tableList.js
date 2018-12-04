import { tableListItem } from './tableListItem.js'
export function tableList(items,selectTable){
  return `
  <ul>
    ${items.map(item => tableListItem(item,selectTable)).join('')}
    </ul>
  `
}
