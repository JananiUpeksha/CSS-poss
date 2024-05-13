import ItemModel from "../Model/ItemModel.js";
import {items} from "../DB/db.js"
/*var items = [];*/
var itemIndex = undefined; // Rename recordIndex to itemIndex

function loadTable() {
    $('#itemTableBody').empty();
    items.forEach(function(item, index) {
        let record = `<tr>
        <td class="item-id-value">${item.id}</td>
        <td class="item-name-value">${item.name}</td>
        <td class="item-price-value">${item.price}</td>
        <td class="item-quantity-value">${item.quantity}</td>
        </tr>`;

        $('#itemTableBody').append(record);
    });
}

$('#saveItem').on("click", function (){
    var itemId = $('#mid').val();
    var itemName = $('#mname').val();
    var itemPrice = $('#mprice').val();
    var itemQuantity = $('#mquantity').val();

    console.log("Id: " , itemId);
    console.log("Name: " , itemName);
    console.log("Price: " , itemPrice);
    console.log("Quantity: " , itemQuantity);

    // Validate item inputs
    if (!validateItemInputs(itemId, itemName, itemPrice)) {
        console.error("Invalid item details. Please check and try again.");
        return; // Exit function if validation fails
    }

   /* let item = {
        id: itemId,
        name: itemName,
        price: itemPrice,
        quantity: itemQuantity
    }*/
    let item = new ItemModel(itemId,itemName,itemPrice,itemQuantity);

    items.push(item);
    console.log(items);
    loadTable();
    clearItemInputs();
});

$('#itemTableBody').on('click', 'tr', function () {
    itemIndex = $(this).index(); // Assign itemIndex when a table row is clicked
    console.log("itemIndex:", itemIndex);

    let id = $(this).find(".item-id-value").text();
    let name = $(this).find(".item-name-value").text();
    let price = $(this).find(".item-price-value").text();
    let quantity = $(this).find(".item-quantity-value").text();

    $('#iid').val(id);
    $('#iname').val(name);
    $('#iprice').val(price);
    $('#iquntity').val(quantity);
});

$('#update').on("click", function () {
    var itemId = $('#iid').val();
    var itemName = $('#iname').val();
    var itemPrice = $('#iprice').val();
    var itemQuantity = $('#iquntity').val();

    // Validate item inputs
    if (!validateItemInputs(itemId, itemName, itemPrice)) {
        console.error("Invalid item details. Please check and try again.");
        return; // Exit function if validation fails
    }

    if (itemIndex !== undefined && itemIndex >= 0 && itemIndex < items.length) {
        let itemObject = items[itemIndex];

        itemObject.id = itemId;
        itemObject.name = itemName;
        itemObject.price = itemPrice;
        itemObject.quantity = itemQuantity;

        loadTable();
        clearItemInputs();
    } else {
        console.error("No item selected for update or invalid index.");
    }
});

$('#delete').on("click", function () {
    if (itemIndex !== undefined && itemIndex >= 0 && itemIndex < items.length) {
        items.splice(itemIndex, 1);
        loadTable();
        clearItemInputs();
    } else {
        console.error("No item selected for deletion or invalid index.");
    }
});

function clearItemInputs() {
    $('#iid').val('');
    $('#iname').val('');
    $('#iprice').val('');
    $('#iquntity').val('');
    $('#mid').val('');
    $('#mname').val('');
    $('#mprice').val('');
    $('#mquantity').val(''); // Fix the typo here ('mquntity' should be 'mquantity')
}

// Function to populate the select box with item names
function populateSelect() {
    empty(selectItem); // Clear existing options
    items.forEach(function(item) {
        var itemName = item.name; // Extract item name
        addOption(itemName, selectItem); // Add option to select
    });
}

// Event listener for when the select box is clicked
$('#selectItem').on('click', function() {
    populateSelect(); // Populate the select box with item names
});

// Create a new MutationObserver
var observer = new MutationObserver(function(mutationsList) {
    for(var mutation of mutationsList) {
        if (mutation.type === 'childList') {
            populateSelect(); // If there are changes in the item table, repopulate the select box
            break; // Exit the loop after the first mutation
        }
    }
});

// Start observing the item table for changes
observer.observe(document.getElementById('itemTableBody'), { childList: true });

function empty(select) {
    select.innerHTML = '';
}

function addOption(val, select) {
    var option = document.createElement('option');
    option.value = val;
    option.innerHTML = val;
    select.appendChild(option);
}

// Event listener for when the select box value changes
// Event listener for when the select box value changes
$('#selectItem').on('change', function() {
    var selectedName = $(this).val(); // Get the selected item name from the dropdown

    if (selectedName !== "Search Item") {
        // Find the index of the selected item in the items array
        itemIndex = items.findIndex(function(item) {
            return item.name === selectedName;
        });

        if (itemIndex !== -1) {
            // If the item index is found, update the input fields with its data
            var selectedItem = items[itemIndex];
            $('#iid').val(selectedItem.id);
            $('#iname').val(selectedItem.name);
            $('#iprice').val(selectedItem.price);
            $('#iquntity').val(selectedItem.quantity);
        } else {
            // If no item with the selected name is found, clear the input fields
            clearItemInputs();
        }
    } else {
        // If "Search Item" option is selected, clear the input fields
        clearItemInputs();
    }
});
//-------------------------------------------------------------------------------
// Function to validate item ID
function validateItemId(itemId) {
    return itemId.match(/^I00\d+$/);
}

// Function to validate item name
function validateItemName(itemName) {
    return itemName.length >= 5;
}

// Function to validate item price
function validateItemPrice(itemPrice) {
    return itemPrice.endsWith(".00");
}
// Function to validate item inputs (ID, name, price)
function validateItemInputs(itemId, itemName, itemPrice) {
    return (
        validateItemId(itemId) &&
        validateItemName(itemName) &&
        validateItemPrice(itemPrice)
    );
}
