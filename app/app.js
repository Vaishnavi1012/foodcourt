/*import { addElementForm } from './addElementForm.js'  not necessary*/
import { tableList } from './tableList.js'
import { menuList } from './menuList.js'
import { orderList } from './orderList.js'


export class App {
  constructor(id){
    this.rootElement = document.getElementById(id)
    this.currentTableId = 0
    this.currentTotal = 0
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

    let currentTableId = localStorage.getItem("currentTableId")
    
    this.currentTableId = currentTableId

    if(typeof this.currentTableId == 'string'){
      this.selectTable(this.currentTableId)
    }

    this.setState({ tableitems: [ ...tableitems ], menuitems: [ ...menuitems ] })
    // add code to store last selected table when browser is closed 
    // this.setorderState( { orderitems: [ ...this.orderState.orderitems ],orderTotal:currentTotal})
  }

  selectTable(tableId){
    document.querySelector('#tableid').textContent = tableId
    this.currentTableId = tableId
    localStorage.setItem("currentTableId",tableId)

    //get ordered items selected using table id 
    let oldOrderedItem = JSON.parse(localStorage.getItem(tableId))
    console.log(oldOrderedItem)

    let currentTotal = localStorage.getItem('currentTotal')
    this.currentTotal = currentTotal
    
    //this.rootElement.querySelector("#total").children[0].textContent = '$'+ tableTotal

    if(oldOrderedItem){
      this.setorderState( { orderitems: [ ...oldOrderedItem ],orderTotal:this.currentTotal})
    }
  }

  addFoodList(menuId,name,price){
    if(!typeof this.currentTableId == 'string'){
      alert('Please select a table first')
      return false
    }
    let orderItem = {
      id: +new Date(),
      menuId : menuId,
      name : name,
      price :price
    }
    
    let num = parseInt(orderItem.price)

    if(this.currentTotal){
      this.orderState.orderTotal = this.currentTotal
    }
    this.orderState.orderTotal = this.orderState.orderTotal + num
    console.log(this.orderState.orderTotal);

    this.setorderState( { orderitems: [ ...this.orderState.orderitems, orderItem ],orderTotal:this.orderState.orderTotal})

    let orderJsonString = JSON.stringify([...this.orderState.orderitems])

    let tableId = this.currentTableId 
    console.log(this.currentTableId)
    console.log('id'+tableId)

    localStorage.setItem(tableId ,orderJsonString)
    localStorage.setItem('currentTotal',this.orderState.orderTotal)
  }

  deleteOrderListItem(orderIdToDelete){
    let priceToDelete = this.orderState.orderitems.find(orderList => orderList.id == orderIdToDelete).price
    this.orderState.orderTotal = this.orderState.orderTotal - priceToDelete

    let orderList = this.orderState.orderitems.filter( e => e.id !== parseInt(orderIdToDelete))

    this.setorderState({ orderitems: [...orderList],orderTotal:this.orderState.orderTotal })
  }

  refresh(){
    this.rootElement.querySelector("#table").children[1].innerHTML = tableList(this.state.tableitems,this.selectTable)
    this.rootElement.querySelector("#menu").innerHTML = menuList(this.state.menuitems,this.addFoodList)
  }

  orderRefresh(){
    // console.log('order total'+this.orderState.orderTotal)
    document.querySelector("#orderList").innerHTML = orderList(this.orderState.orderitems,this.deleteOrderListItem)
    this.rootElement.querySelector("#total").children[0].innerHTML = '$'+ this.orderState.orderTotal
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
                  <h3>Total <span>${this.orderState.orderTotal}</span></h3>
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