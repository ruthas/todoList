/* eslint-disable no-undef */
const addItems = document.querySelector(".add-items");
const itemsList = document.querySelector(".to-do-list");
const items = JSON.parse(localStorage.getItem("items")) || [];

function addItem(e) {
	e.preventDefault(); 

	const itemName = this.querySelector("[name=item]").value;
	const dueDate = this.querySelector("[name=duedate]").value;
	
	const item = {
		text: itemName,
		date: dueDate,
		done: false,
	};

	items.push(item);

	PopulateListWithItems(itemsList, items);

	localStorage.setItem("items", JSON.stringify(items)); 

	this.reset();
}

function toggleDone(e) {
	if (!e.target.matches("input")) return; // skip this unless it's an input
	const el = e.target;
	const index = el.dataset.index;
	items[index].done = !items[index].done;
	localStorage.setItem("items", JSON.stringify(items));
	PopulateListWithItems(items, itemsList);
}


function PopulateListWithItems(itemsList, items = []) {
	itemsList.innerHTML = items.map((item, i) => {
		return `
        <li>
          <input type="checkbox" data-index=${i} id="item${i}" ${item.done ? "checked" : ""} />
          <label for="item${i}">${item.text}<br/>Due: ${item.date}</label>
        </li>
      `;
	}).join("");
}

addItems.addEventListener("submit", addItem);
itemsList.addEventListener("click", toggleDone);
PopulateListWithItems(itemsList, items);


var source = document.getElementById("tasks-template").innerHTML;
var template = Handlebars.compile(source);

var context = {title: "TO DO LIST"};
var html = template(context);

$("#title-template").html(html);