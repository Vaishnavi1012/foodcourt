import { menuListItem } from './menuListItem.js'
export function menuList(items){
  return `
  <ul>
    ${items.map(item => menuListItem(item)).join('')}
    </ul>
  `
}
