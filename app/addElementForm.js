export function addElementForm(addFunc){
  return `
  <label for="item">Enter a new item:</label>
      <input type="text" name="item" id="item">
      <button onclick="app.${addFunc.name}()">Add item</button>
  `
}