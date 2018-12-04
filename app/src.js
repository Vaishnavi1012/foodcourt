import { App } from './app.js'

async function view(Component, element){
  let app = new Component(element)
  app.render()
  await app.componentDidMount()
  window.app = app
}

view(App, 'root')



// var list = document.querySelector('ul');
// var input = document.querySelector('input');
// var button = document.querySelector('button');

// button.onclick = function() {
// var myItem = input.value;
// input.value = '';

// var listItem = document.createElement('li');
// var listText = document.createElement('span');
// var listBtn = document.createElement('button');

// listItem.appendChild(listText);
// listText.textContent = myItem;
// listItem.appendChild(listBtn);
// listBtn.textContent = 'Delete';
// list.appendChild(listItem);

// listBtn.onclick = function(e) {
//   list.removeChild(listItem);
// }

// input.focus()
// }