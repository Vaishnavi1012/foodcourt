/*import { addElementForm } from './addElementForm.js'  not necessary*/
import { tableList } from './tableList.js'
import { menuList } from './menuList.js'


export class App {
  constructor(id){
    this.rootElement = document.getElementById(id)
    this.state = {
      tableitems: [],
      menuitems:[]
    }
  }

  setState(state){
    this.state = state;
    this.refresh()
  }

  async componentDidMount(){
    let tableData = await fetch('./app/tableitems.json')
    let tableitems = await tableData.json()
    let menuData = await fetch('./app/menuitems.json')
    let menuitems = await menuData.json()
    this.setState({ tableitems: [ ...tableitems ], menuitems: [ ...menuitems ] })

  }

  selectTable(tableId){
    document.querySelector('#tableid').textContent = tableId
  }

  addFoodList(menuId,name,price){
    // console.log(menuId+name+price)

    // var foodList = document.createElement('ul')
    var foodItem = document.createElement('li')
    var foodText = document.createElement('h3')
    var foodBtn = document.createElement('button')
    var foodPrice = document.createElement('span')


    foodText.textContent = name;
    foodItem.appendChild(foodText);
    foodBtn.textContent = '<i class="fa fa-times"></i>';
    foodItem.appendChild(foodBtn);
    foodPrice.textContent = price;
    foodItem.appendChild(foodPrice);
    
    // foodList.appendChild(foodItem);
    console.log(foodItem)
    document.querySelector('#intro').appendChild = foodItem
  }

  /* not necessary
  addToList() {
    let item = {
      id: +new Date()
    }
    item.name = document.getElementById('item').value
    this.setState( { items: [ ...this.state.items, item ] })
  }

  
  deleteFromList(idToDelete) {
    let newList = this.state.items.filter( e => e.id !== parseInt(idToDelete))
    this.setState({ items: [...newList] })
  }
  */

  refresh(){
    /*this.rootElement.children[2][3].innerHTML = tableList(this.state.tableitems)*/
    /*console.log(this.rootElement)*/
    this.rootElement.querySelector("#table").children[1].innerHTML = tableList(this.state.tableitems,this.selectTable)
    this.rootElement.querySelector("#menu").innerHTML = menuList(this.state.menuitems,this.addFoodList)
  
  }

  render() {
    this.rootElement.innerHTML = `
    <h1>Foodcourt</h1>
    <hr>
    <div class="row">
      <div class="span4">
      <div id="table" class="clearfix">
          <h2 id="tableHeading">Tables</h2>
          <div class="tablelisting">
            ${tableList(this.state.tableitems,this.selectTable)}
          </div>
      </div>
      </div>
      <div class="span8">
        <div id="order">
        <h2>Select a table on left</h2>
        <div class="row">
          <div class="span2">
            <div id="menu">
              ${menuList(this.state.menuitems,this.addFoodList)}
            </div>            
          </div>
          <div class="span6">
            <div id="details">
              <h2 id="tableNumber">Table <span id="tableid">0</span></h2>
              <ul id="intro">
                <li id="default">
                  <h3>Click a food to add it</h3>
                </li>
              </ul>
              
              <ul>
                <li id="total">
                  <h3>Total <span></span></h3>
                </li>
              </ul> 
            </div>
          </div> 
        </div>
      </div>
    </div>
    `
  }
}