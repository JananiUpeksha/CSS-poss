import { customers } from "../DB/db.js";
import { items } from "../DB/db.js";
import {orders} from "../DB/db.js";
console.log("hiiiiiiiiiiiiiiiiiiii")

function generateNextOrderId(currentId) {
    var num = parseInt(currentId.slice(5)) + 1; // Extract the numeric part and increment
    var nextId = "ORDER" + ("000" + num).slice(-3); // Format the incremented number with leading zeros
    return nextId;
}

function formatDate(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}
const currentDate = new Date();
$('#orderDate').val(formatDate(currentDate));

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
    populateCustomerSelect();
});

function populateCustomerData(selectedName) {
    const selectedCustomer = customers.find(customer => customer.name === selectedName);

    if (selectedCustomer) {
        $('#cusnameOrders').val(selectedCustomer.name);
        $('#cusIdOrders').val(selectedCustomer.id);
        $('#cusContactOrders').val(selectedCustomer.contact);
    } else {
        $('#cusnameOrders').val('');
        $('#cusIdOrders').val('');
        $('#cusContactOrders').val('');
    }
}

$('#selectNameOrders').on('change', function() {
    var selectedName = $(this).val();
    populateCustomerData(selectedName);
});

//-------------------------------ITEMS----------------------------------------
function populateItemSelect() {
    $('#selectNameitem').empty();
    items.forEach(function(item) {
        $('#selectNameitem').append($('<option>', {
            value: item.name,
            text: item.name
        }));
    });
}

$('#selectNameitem').on('click', function() {
    populateItemSelect();
});

function populateItemData(selectedName) {
    const selectedItem = items.find(item => item.name === selectedName);

    if (selectedItem) {
        $('#orderItemName').val(selectedItem.name);
        $('#orderItemId').val(selectedItem.id);
        $('#orderItemQTYhand').val(selectedItem.quantity);//MODEL EKEN ENA NAMA DENNE
        $('#orderItemPrice').val(selectedItem.price);
    } else {
        $('#orderItemName').val('');
        $('#orderItemId').val('');
        $('#orderItemQTYhand').val('');
        $('#orderItemPrice').val('');
    }
}

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

    $('#orderQTY').val('');
    $('#orderItemName').val('');
    $('#orderItemId').val('');
    $('#orderItemQTYhand').val('');
    $('#orderItemPrice').val('');

}

$('#add').on('click', addItemToOrder);
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
    $('#selectNameitem').val(itemName);
}

$('#orderTableBody').on('click', 'tr', function() {
    populateFieldsFromTableRow(this);
});

function calculateBalance() {
    const netTotal = parseFloat($('#nettotal').val()) || 0;
    let cash = parseFloat($('#cash').val()) || 0;
    let discount = parseFloat($('#discount').val()) || 0;

    // Ensure cash ends with .00
    cash = parseFloat(cash.toFixed(2));
    $('#cash').val(cash.toFixed(2));

    // Remove any '%' symbol before parsing discount
    if ($('#discount').val().includes('%')) {
        discount = parseFloat($('#discount').val().replace('%', '')) || 0;
    }

    // Ensure discount ends with % with no decimal places if it's a whole number
    const formattedDiscount = discount % 1 === 0 ? discount.toFixed(0) + '%' : discount.toFixed(2) + '%';
    $('#discount').val(formattedDiscount);


    const discountAmount = netTotal * (discount / 100);
    const finalTotal = netTotal - discountAmount;
    const balance = cash - finalTotal;
    $('#balance').val(balance.toFixed(2));
    console.log({
        netTotal,
        cash,
        discount,
        discountAmount,
        finalTotal,
        balance
    });
}

$('#purchase').on('click', function() {
    console.log('Place Order button clicked');
    calculateBalance();
});

$('#newOrder').on('click', function() {
    $('#subtotal1').val('');
    $('#cash').val('');
    $('#balance').val('');
    $('#nettotal').val('');
    $('#discount').val('');
    $('#orderTableBody').empty();

    $('#cusnameOrders').val('');
    $('#cusIdOrders').val('');
    $('#cusContactOrders').val('');

    if (orders.length > 0) {
        const newOrderId = generateNextOrderId(orders[orders.length - 1].id);
        $('#orderId').val(newOrderId);
    } else   {
        $('#orderId').val('Or002');
    }
    $('#orderDate').val(formatDate(new Date()));
    populateCustomerSelect();
    populateItemSelect();
});
