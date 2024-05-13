import { customers } from "../DB/db.js";
import { items } from "../DB/db.js";

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
