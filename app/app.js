/*import { addElementForm } from './addElementForm.js'  not necessary*/
import { tableList } from './tableList.js'
import { menuList } from './menuList.js'
import { orderList } from './orderList.js'


export class App {
  constructor(id){
    this.rootElement = document.getElementById(id)
    this.currentTableId = 0
    this.state = {
      tableitems: [],
      menuitems:[]
    }
    this.orderState = {
      orderitems:[],
      orderTotal:0
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

    this.currentTableId= localStorage.getItem("currentTableId") || 0
    
    //displays exact values when last browser is closed
    //start where you left
    if(typeof this.currentTableId == 'string'){
      this.selectTable(this.currentTableId)
    }
    this.setState({ tableitems: [ ...tableitems ], menuitems: [ ...menuitems ] })
  }

  selectTable(tableId){
    document.querySelector('#tableid').textContent = tableId
    this.currentTableId = tableId
    localStorage.setItem("currentTableId",tableId)

    this.orderState.orderitems = JSON.parse(localStorage.getItem(tableId)) || []

    let currentTotalId = 'totalFor_'+tableId
    this.orderState.orderTotal = localStorage.getItem(currentTotalId) || 0

    this.setorderState( { orderitems: [ ...this.orderState.orderitems ],orderTotal:this.orderState.orderTotal})
  }

  addFoodList(menuId,name,price){
    if(!typeof this.currentTableId == 'string' || this.currentTableId == 0){
      alert('Please select a table first!!')
      return false
    }
    let orderItem = {
      id: +new Date(),
      menuId : menuId,
      name : name,
      price :price
    }

    this.orderState.orderTotal = parseInt(this.orderState.orderTotal) + parseInt(orderItem.price)

    this.setorderState( { orderitems: [ ...this.orderState.orderitems, orderItem ],orderTotal:this.orderState.orderTotal})

    let orderJsonString = JSON.stringify([...this.orderState.orderitems])

    let currentTotalId = 'totalFor_'+this.currentTableId

    localStorage.setItem(this.currentTableId,orderJsonString)
    localStorage.setItem(currentTotalId,this.orderState.orderTotal)
  }

  deleteOrderListItem(orderIdToDelete){
    let priceToDelete = this.orderState.orderitems.find(orderList => orderList.id == orderIdToDelete).price

    this.orderState.orderTotal = this.orderState.orderTotal - priceToDelete

    this.orderState.orderitems = this.orderState.orderitems.filter( e => e.id !== parseInt(orderIdToDelete))

    this.setorderState({ orderitems: [...this.orderState.orderitems],orderTotal:this.orderState.orderTotal })

    let orderJsonString = JSON.stringify([...this.orderState.orderitems])
    let currentTotalId = 'totalFor_'+this.currentTableId

    localStorage.setItem(this.currentTableId ,orderJsonString)
    localStorage.setItem(currentTotalId,this.orderState.orderTotal)
  }

  refresh(){
    this.rootElement.querySelector("#table").children[1].innerHTML = tableList(this.state.tableitems,this.selectTable)
    this.rootElement.querySelector("#menu").innerHTML = menuList(this.state.menuitems,this.addFoodList)
  }

  orderRefresh(){
    document.querySelector("#orderList").innerHTML = orderList(this.orderState.orderitems,this.deleteOrderListItem)
    this.rootElement.querySelector("#total").children[1].innerHTML = '$'+ this.orderState.orderTotal
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
              ${orderList(this.orderState.orderitems,this.deleteOrderListItem)}
              </div>
              <ul>
                <li id="total">
                  <h3>Total </h3>
                  <h3>$${this.orderState.orderTotal}</h3>
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