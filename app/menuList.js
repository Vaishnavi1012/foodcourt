import { menuListItem } from './menuListItem.js'
export function menuList(items,addFoodList){
  return `
  <ul>
    ${items.map(item => menuListItem(item,addFoodList)).join('')}
    </ul>
  `
}
