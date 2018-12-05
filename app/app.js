/*import { addElementForm } from './addElementForm.js'  not necessary*/
import { tableList } from './tableList.js'
import { menuList } from './menuList.js'
import { orderList } from './orderList.js'


export class App {
  constructor(id){
    this.rootElement = document.getElementById(id)
    this.state = {
      tableitems: [],
      menuitems:[]
    }
    this.orderState = {
      orderitems:[]
    }

  }

  setState(state){
    this.state = state;
    this.refresh()
  }
  setorderState(orderState){
    this.orderState = orderState;
    this.orderRefresh()
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
    let item = {
      id: +new Date(),
      menuId : menuId,
      name : name,
      price :price
    }
    //console.log(item)
    this.setorderState( { orderitems: [ ...this.orderState.orderitems, item ] })

  }

  deleteOrderListItem(orderId){
    console.log(orderId)
    let orderList = this.orderState.orderitems.filter( e => e.id !== parseInt(orderId))
    this.setorderState({ orderitems: [...orderList] })
  }
  /* not necessary
  
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
  orderRefresh(){
    console.log('order refresh'+this.orderState.orderitems)
    document.querySelector("#orderList").innerHTML = orderList(this.orderState.orderitems,this.deleteOrderListItem)
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
              <div id="orderList">
              </div>
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