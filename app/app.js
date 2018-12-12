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
      orderitems:[],
      totalArr:[],
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
    this.setState({ tableitems: [ ...tableitems ], menuitems: [ ...menuitems ] })
    this.setorderState( { orderitems: [ ...this.orderState.orderitems ],totalArr:[...this.orderState.totalArr],orderTotal:0})
  }

  selectTable(tableId){
    document.querySelector('#tableid').textContent = tableId
  }

  addFoodList(menuId,name,price){
    // console.log(menuId+name+price)
    let orderItem = {
      id: +new Date(),
      menuId : menuId,
      name : name,
      price :price
    }
    
    let num = parseInt(orderItem.price)
    this.orderState.totalArr = [...this.orderState.totalArr,num]

    // console.log(this.orderState.totalArr)

    this.orderState.orderTotal = this.orderState.totalArr.reduce((a,b) => a + b, 0);

    // console.log(this.orderState.orderTotal);

    this.setorderState( { orderitems: [ ...this.orderState.orderitems, orderItem ],totalArr:[...this.orderState.totalArr],orderTotal:this.orderState.orderTotal})
    
  }

  deleteOrderListItem(orderIdToDelete){
    console.log(orderIdToDelete)
    console.log(this.orderState.totalArr)

    let priceToDelete = this.orderState.orderitems.find(orderList => orderList.id == orderIdToDelete).price
    console.log(priceToDelete)
    let priceIndex = ''

    for (var i = 0; i < this.orderState.orderitems.length; i++) {   
      if (this.orderState.orderitems[i]['id'] == orderIdToDelete) {
      priceIndex =i;
      }
    }
    console.log(priceIndex) 
    this.orderState.totalArr.splice(priceIndex, 1)

    console.log(this.orderState.totalArr)
    this.orderState.orderitems.splice(priceIndex, 1)

    this.orderState.orderTotal = this.orderState.totalArr.reduce((a,b) => a + b, 0);

    let orderList = this.orderState.orderitems.filter( e => e.id !== parseInt(orderIdToDelete))
    // console.log(orderList)

    this.setorderState({ orderitems: [...orderList],totalArr:[...this.orderState.totalArr],orderTotal:this.orderState.orderTotal })
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