import { addElementForm } from './addElementForm.js' /* not necessary*/
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
    //this.setState({ tableitems: [ ...tableitems ] })

    let menuData = await fetch('./app/menuitems.json')
    let menuitems = await menuData.json()
    console.log(menuitems)
    this.setState({ tableitems: [ ...tableitems ], menuitems: [ ...menuitems ] })

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
    this.rootElement.querySelector("#table").children[1].innerHTML = tableList(this.state.tableitems)
    this.rootElement.querySelector("#menu").innerHTML = menuList(this.state.menuitems)
  
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
            ${tableList(this.state.tableitems)}
          </div>
      </div>
      </div>
      <div class="span8">
        <div id="order">
        <h2>Select a table on left</h2>
        <div class="row">
          <div class="span2">
            <div id="menu">
              ${menuList(this.state.menuitems)}
            </div>            
          </div>  
        </div>
      </div>
    </div>
    `
  }
}