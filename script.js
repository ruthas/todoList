/* eslint-disable no-undef */
const addItems = $('.add-items')
const itemsList = $('.to-do-list')
const items = JSON.parse(localStorage.getItem('items')) || []

function addItem (e) {
  e.preventDefault()

  const itemName = $('[name=item]').val()
  const dueDate = $('[name=duedate]').val()

  const item = {
    text: itemName,
    date: dueDate,
    done: false
  }

  items.push(item)

  PopulateListWithItems(itemsList, items)

  localStorage.setItem('items', JSON.stringify(items))

  this.reset()
}

function toggleDone (e) {
  if (!e.target.matches('input')) return
  const el = e.target
  const index = el.dataset.index
  items[index].done = !items[index].done
  localStorage.setItem('items', JSON.stringify(items))
  PopulateListWithItems(items, itemsList)
}

// function PopulateListWithItems (itemsList, items = []) {
//   itemsList.innerHTML = items.map((item, i) => {
//     return `
//         <li>
//           <input type="checkbox" data-index=${i} id="item${i}" ${item.done ? 'checked' : ''} />
//           <label for="item${i}">${item.text}<br/>Due: ${item.date}</label>
//         </li>
//       `
//   }).join('')
// }

function PopulateListWithItems () {
  var taskTemplate = $('#task-template').html()
  var compileTaskTemplate = Handlebars.compile(taskTemplate)
  var html = compileTaskTemplate({
    items: items
  })

  $('#task-container').empty().append(html)
}

addItems.on('submit', addItem)
itemsList.on('click', toggleDone)
PopulateListWithItems()

var titleTemplate = $('title-template').html()
var titleTemplateC = Handlebars.compile(titleTemplate)

var context = { title: 'TO DO LIST' }
var html = titleTemplateC(context)

$('#title-container').empty().append(html)
