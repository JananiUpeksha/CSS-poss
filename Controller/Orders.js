import { customers } from "../DB/db.js";
import { items } from "../DB/db.js";
import {orders} from "../DB/db.js";
console.log("hiiiiiiiiiiiiiiiiiiii")

// Function to generate the next Order ID
function generateNextOrderId(currentId) {
    var num = parseInt(currentId.slice(2)) + 1; // Extract the numeric part and increment
    var nextId = "ORDER" + ("000" + num).slice(-3); // Format the incremented number with leading zeros
    return nextId;
}

// Function to format the date as "YYYY-MM-DD"
function formatDate(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

// Get the current date
const currentDate = new Date();

// Set the value of the "Order Date" input field to the current date
$('#orderDate').val(formatDate(currentDate));

// Function to populate the select box with customer names
function populateCustomerSelect() {
    $('#selectNameOrders').empty(); // Clear existing options
    customers.forEach(function(customer) {
        $('#selectNameOrders').append($('<option>', {
            value: customer.name,
            text: customer.name
        }));
    });
}
$('#selectNameOrders').on('click', function() {
    populateCustomerSelect(); // Populate the select box with customer names
});

function populateCustomerData(selectedName) {
    // Find the selected customer object from the customers array
    const selectedCustomer = customers.find(customer => customer.name === selectedName);

    if (selectedCustomer) {
        // Populate the input fields with the selected customer's data
        $('#cusnameOrders').val(selectedCustomer.name);
        $('#cusIdOrders').val(selectedCustomer.id);
        $('#cusContactOrders').val(selectedCustomer.contact);
    } else {
        // Clear the input fields if no customer is selected
        $('#cusnameOrders').val('');
        $('#cusIdOrders').val('');
        $('#cusContactOrders').val('');
    }
}

// Event listener for when the select box value changes
$('#selectNameOrders').on('change', function() {
    var selectedName = $(this).val(); // Get the selected customer name from the dropdown
    populateCustomerData(selectedName); // Populate the input fields with customer data
});

//-------------------------------ITEMS----------------------------------------
function populateItemSelect() {
    $('#selectNameitem').empty(); // Clear existing options
    items.forEach(function(item) {
        $('#selectNameitem').append($('<option>', {
            value: item.name,
            text: item.name
        }));
    });
}

// Event listener for when the select box is clicked
$('#selectNameitem').on('click', function() {
    populateItemSelect(); // Populate the select box with item names
});

// Function to populate the input fields with item data when an item is selected
function populateItemData(selectedName) {
    // Find the selected item object from the items array
    const selectedItem = items.find(item => item.name === selectedName);

    if (selectedItem) {
        // Populate the input fields with the selected item's data
        $('#orderItemName').val(selectedItem.name);
        $('#orderItemId').val(selectedItem.id);
        $('#orderItemQTYhand').val(selectedItem.quantity);//MODEL EKEN ENA NAMA DENNE
        $('#orderItemPrice').val(selectedItem.price);
    } else {
        // Clear the input fields if no item is selected
        $('#orderItemName').val('');
        $('#orderItemId').val('');
        $('#orderItemQTYhand').val('');
        $('#orderItemPrice').val('');
    }
}

// Event listener for when the select box value changes
$('#selectNameitem').on('change', function() {
    var selectedName = $(this).val(); // Get the selected item name from the dropdown
    populateItemData(selectedName); // Populate the input fields with item data
});

/*--------------------------orders-----------------------------------------------*/
// Function to add item to the order table
/*
function addItemToOrder() {
    const orderQTY = parseInt($('#orderQTY').val(), 10);
    const orderItemName = $('#orderItemName').val();
    const orderItemId = $('#orderItemId').val();
    const orderItemQTYhand = parseInt($('#orderItemQTYhand').val(), 10);
    const orderItemPrice = parseFloat($('#orderItemPrice').val());

    if (orderQTY > orderItemQTYhand) {
        alert('Out of quantity');
        return;
    }

    const total = orderQTY * orderItemPrice;
    // Check if the item is already in the order table
    const existingRow = $(`#orderTableBody tr[data-item-id="${orderItemId}"]`);
    if (existingRow.length > 0) {
        alert('This item is already in the cart');
        return;
    }

    // Update table
    $('#orderTableBody').append(`
        <tr>
            <td>${orderItemId}</td>
            <td>${orderItemName}</td>
            <td>${orderItemQTYhand}</td>
            <td>${orderItemPrice}</td>
            <td>${orderQTY}</td>
            <td>${total.toFixed(2)}</td>
        </tr>
    `);

    // Update subtotal
    const currentSubtotal = parseFloat($('#subtotal1').val()) || 0;
    const newSubtotal = currentSubtotal + orderItemPrice;
    $('#subtotal1').val(newSubtotal.toFixed(2));

    // Update net total
    const currentNetTotal = parseFloat($('#nettotal').val()) || 0;
    const newNetTotal = currentNetTotal + total;
    $('#nettotal').val(newNetTotal.toFixed(2));

    // Clear input fields
    $('#orderQTY').val('');
    $('#orderItemName').val('');
    $('#orderItemId').val('');
    $('#orderItemQTYhand').val('');
    $('#orderItemPrice').val('');
}

// Event listener for Add to Cart button
$('#add').on('click', addItemToOrder);

// Function to populate input fields with data from a selected table row
function populateFieldsFromTableRow(row) {
    const itemId = $(row).data('item-id');
    const itemName = $(row).find('td').eq(1).text();
    const itemQTYhand = $(row).find('td').eq(2).text();
    const itemPrice = $(row).find('td').eq(3).text();
    const itemOrderQTY = $(row).find('td').eq(4).text();

    $('#orderItemId').val(itemId);
    $('#orderItemName').val(itemName);
    $('#orderItemQTYhand').val(itemQTYhand);
    $('#orderItemPrice').val(itemPrice);
    $('#orderQTY').val(itemOrderQTY);
}

// Event listener for table row click
$('#orderTableBody').on('click', 'tr', function() {
    populateFieldsFromTableRow(this);
});*/
// Function to add item to the order table
function addItemToOrder() {
    const orderQTY = parseInt($('#orderQTY').val(), 10);
    const orderItemName = $('#orderItemName').val();
    const orderItemId = $('#orderItemId').val();
    const orderItemQTYhand = parseInt($('#orderItemQTYhand').val(), 10);
    const orderItemPrice = parseFloat($('#orderItemPrice').val());

    if (orderQTY > orderItemQTYhand) {
        alert('Out of quantity');
        return;
    }

    const total = orderQTY * orderItemPrice;
    // Check if the item is already in the order table
    const existingRow = $(`#orderTableBody tr[data-item-id="${orderItemId}"]`);
    if (existingRow.length > 0) {
        alert('This item is already in the cart');
        return;
    }

    // Update table
    $('#orderTableBody').append(`
        <tr data-item-id="${orderItemId}">
            <td>${orderItemId}</td>
            <td>${orderItemName}</td>
            <td>${orderItemQTYhand}</td>
            <td>${orderItemPrice}</td>
            <td>${orderQTY}</td>
            <td>${total.toFixed(2)}</td>
        </tr>
    `);

    // Update subtotal
    const currentSubtotal = parseFloat($('#subtotal1').val()) || 0;
    const newSubtotal = currentSubtotal + orderItemPrice;
    $('#subtotal1').val(newSubtotal.toFixed(2));

    // Update net total
    const currentNetTotal = parseFloat($('#nettotal').val()) || 0;
    const newNetTotal = currentNetTotal + total;
    $('#nettotal').val(newNetTotal.toFixed(2));

    // Update the items array
    const selectedItem = items.find(item => item.id === orderItemId);
    if (selectedItem) {
        selectedItem.quantity -= orderQTY;
    }

    // Clear input fields
    $('#orderQTY').val('');
    $('#orderItemName').val('');
    $('#orderItemId').val('');
    $('#orderItemQTYhand').val('');
    $('#orderItemPrice').val('');
}

// Event listener for Add to Cart button
$('#add').on('click', addItemToOrder);

// Function to populate input fields with data from a selected table row
function populateFieldsFromTableRow(row) {
    const itemId = $(row).data('item-id');
    const itemName = $(row).find('td').eq(1).text();
    const itemQTYhand = $(row).find('td').eq(2).text();
    const itemPrice = $(row).find('td').eq(3).text();
    const itemOrderQTY = $(row).find('td').eq(4).text();

    $('#orderItemId').val(itemId);
    $('#orderItemName').val(itemName);
    $('#orderItemQTYhand').val(itemQTYhand);
    $('#orderItemPrice').val(itemPrice);
    $('#orderQTY').val(itemOrderQTY);

    // Also select the item in the dropdown
    $('#selectNameitem').val(itemName);
}

// Event listener for table row click
$('#orderTableBody').on('click', 'tr', function() {
    populateFieldsFromTableRow(this);
});