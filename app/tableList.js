import { tableListItem } from './tableListItem.js'
export function tableList(items){
  return `
  <ul>
    ${items.map(item => tableListItem(item)).join('')}
    </ul>
  `
}
