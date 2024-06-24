document.addEventListener('DOMContentLoaded', loadItems);
document.getElementById('add-item-btn').addEventListener('click', addItem);

function loadItems() {
    const items = JSON.parse(localStorage.getItem('shoppingList')) || [];
    items.forEach(item => addItemToDOM(item));
}

function addItem() {
    const itemInput = document.getElementById('item-input');
    const descInput = document.getElementById('desc-input');
    const itemText = itemInput.value.trim();
    const descText = descInput.value.trim();
    if (itemText === '') return;

    const item = { text: itemText, description: descText };
    addItemToDOM(item);
    saveItem(item);
    itemInput.value = '';
    descInput.value = '';
}

function addItemToDOM(item) {
    const listItem = document.createElement('li');
    listItem.className = 'list-group-item d-flex justify-content-between align-items-center t3';

    const itemContent = document.createElement('div');
    const itemText = document.createElement('span');
    const itemDescription = document.createElement('small');

    itemText.textContent = item.text;
    itemDescription.textContent = item.description ? ` - ${item.description}` : '';
    itemDescription.className = 'text-muted';

    itemContent.appendChild(itemText);
    itemContent.appendChild(itemDescription);

    const editButton = document.createElement('button');
    editButton.className = 'btn btn-warning btn-sm mr-2';
    editButton.textContent = 'Editar';
    editButton.onclick = () => {
        const newItemText = prompt('Editar item:', item.text);
        const newDescText = prompt('Editar descrição:', item.description);
        if (newItemText !== null && newItemText.trim() !== '') {
            item.text = newItemText.trim();
            item.description = newDescText.trim();
            itemText.textContent = item.text;
            itemDescription.textContent = item.description ? ` - ${item.description}` : '';
            updateItem(item);
        }
    };

    const deleteButton = document.createElement('button');
    deleteButton.className = 'btn btn-danger btn-sm b1';
    deleteButton.textContent = 'Remover';
    deleteButton.onclick = () => {
        listItem.remove();
        removeItem(item);
    };

    listItem.appendChild(itemContent);
    listItem.appendChild(editButton);
    listItem.appendChild(deleteButton);
    document.getElementById('shopping-list').appendChild(listItem);
}

function saveItem(item) {
    const items = JSON.parse(localStorage.getItem('shoppingList')) || [];
    items.push(item);
    localStorage.setItem('shoppingList', JSON.stringify(items));
}

function updateItem(updatedItem) {
    const items = JSON.parse(localStorage.getItem('shoppingList')) || [];
    const itemIndex = items.findIndex(item => item.text === updatedItem.text);
    if (itemIndex > -1) {
        items[itemIndex] = updatedItem;
        localStorage.setItem('shoppingList', JSON.stringify(items));
    }
}

function removeItem(item) {
    const items = JSON.parse(localStorage.getItem('shoppingList')) || [];
    const filteredItems = items.filter(i => i.text !== item.text);
    localStorage.setItem('shoppingList', JSON.stringify(filteredItems));
}