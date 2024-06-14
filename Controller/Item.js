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

    if (!validateItemInputs(itemId, itemName, itemPrice)) {
        console.error("Invalid item details. Please check and try again.");
        return;
    }
    let item = new ItemModel(itemId,itemName,itemPrice,itemQuantity);

    items.push(item);
    console.log(items);
    loadTable();
    clearItemInputs();
});

$('#itemTableBody').on('click', 'tr', function () {
    itemIndex = $(this).index();
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

    if (!validateItemInputs(itemId, itemName, itemPrice)) {
        console.error("Invalid item details. Please check and try again.");
        return;
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
    $('#mquantity').val('');
}

function populateSelect() {
    empty(selectItem);
    items.forEach(function(item) {
        var itemName = item.name;
        addOption(itemName, selectItem);
    });
}


$('#selectItem').on('click', function() {
    populateSelect();
});


var observer = new MutationObserver(function(mutationsList) {
    for(var mutation of mutationsList) {
        if (mutation.type === 'childList') {
            populateSelect();
            break;
        }
    }
});

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

$('#selectItem').on('change', function() {
    var selectedName = $(this).val();

    if (selectedName !== "Search Item") {
        itemIndex = items.findIndex(function(item) {
            return item.name === selectedName;
        });

        if (itemIndex !== -1) {
            var selectedItem = items[itemIndex];
            $('#iid').val(selectedItem.id);
            $('#iname').val(selectedItem.name);
            $('#iprice').val(selectedItem.price);
            $('#iquntity').val(selectedItem.quantity);
        } else {
            clearItemInputs();
        }
    } else {
        clearItemInputs();
    }
});
//-------------------------------------------------------------------------------
function validateItemId(itemId) {
    return itemId.match(/^I00\d+$/);
}
function validateItemName(itemName) {
    return itemName.length >= 5;
}
function validateItemPrice(itemPrice) {
    return itemPrice.endsWith(".00");
}
function validateItemInputs(itemId, itemName, itemPrice) {
    return (
        validateItemId(itemId) &&
        validateItemName(itemName) &&
        validateItemPrice(itemPrice)
    );
}
