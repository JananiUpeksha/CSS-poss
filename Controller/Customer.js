import CustomerModel from "../Model/CustomerModel.js";
import {customers} from "../DB/db.js"
/*var customers = [];*/
var recordIndex = undefined;

function loadCustomerTable() {
    $('#customerTableBody').empty(); // Clear existing table rows
    customers.forEach(function(customer) { // Iterate over each customer in the array
        // Create a table row for each customer and populate it with customer data
        let record = `<tr>
            <td class="cus-id-value">${customer.id}</td>
            <td class="cus-name-value">${customer.name}</td>
            <td class="cus-address-value">${customer.address}</td>
            <td class="cus-contact-value">${customer.contact}</td>
            </tr>`;
        $('#customerTableBody').append(record); // Append the row to the table body
    });
}

$('#saveCustomer').on("click", function() {
    var cusId = $('#idCustomer').val();
    var cusName = $('#nameCustomer').val();
    var cusAddress = $('#addressCustomer').val();
    var cusContact = $('#contactCustomer').val();

    console.log("Id: ", cusId);
    console.log("Name: ", cusName);
    console.log("Contact: ", cusContact);
    console.log("Address: ", cusAddress);
/*

    let customer = {
        id: cusId,
        name: cusName,
        address: cusAddress,
        contact: cusContact
    }
*/

    // Validate customer inputs
    if (!validateCustomerInputs(cusId, cusName, cusAddress, cusContact)) {
        console.error("Invalid customer details. Please check and try again.");
        return; // Exit function if validation fails
    }

    let customer = new CustomerModel(cusId,cusName,cusAddress,cusContact);

    customers.push(customer);
    console.log(customers);
    loadCustomerTable();
    $('#closeCustomer').click(); // Close the modal
    clearCustomerInputs()
});

$('#customerTableBody').on('click', 'tr', function() {
    recordIndex = $(this).index(); // Set recordIndex when a table row is clicked
    console.log("recordIndex:", recordIndex); // Add this line to check recordIndex value

    let id = $(this).find(".cus-id-value").text();
    let name = $(this).find(".cus-name-value").text();
    let address = $(this).find(".cus-address-value").text();
    let contact = $(this).find(".cus-contact-value").text();

    $('#Cid').val(id);
    $('#Cname').val(name);
    $('#Caddress').val(address);
    $('#Ccontact').val(contact);
});

/*$('#updateCustomer').on("click", function() {
    var cusId = $('#Cid').val();
    var cusName = $('#Cname').val();
    var cusAddress = $('#Caddress').val();
    var cusContact = $('#Ccontact').val();

    // Check if recordIndex is defined and within the range of customers array
    if (recordIndex !== undefined && recordIndex >= 0 && recordIndex < customers.length) {
        let customerObject = customers[recordIndex];

        // Update customer object with new values
        customerObject.id = cusId;
        customerObject.name = cusName;
        customerObject.address = cusAddress;
        customerObject.contact = cusContact;

        // Reload the table with updated data
        loadCustomerTable();
        $('#closeCustomer').click(); // Close the modal
        clearCustomerInputs(); // Clear remaining data from input fields
    } else {
        console.error("No customer selected for update or invalid index.");
    }
});*/
$('#updateCustomer').on("click", function() {
    var cusId = $('#Cid').val();
    var cusName = $('#Cname').val();
    var cusAddress = $('#Caddress').val();
    var cusContact = $('#Ccontact').val();

    // Validate customer inputs
    if (!validateCustomerInputs(cusId, cusName, cusAddress, cusContact)) {
        console.error("Invalid customer details. Please check and try again.");
        return; // Exit function if validation fails
    }


    // Check if recordIndex is defined and within the range of customers array
    if (recordIndex !== undefined && recordIndex >= 0 && recordIndex < customers.length) {
        let customerObject = customers[recordIndex];

        // Update customer object with new values
        customerObject.id = cusId;
        customerObject.name = cusName;
        customerObject.address = cusAddress;
        customerObject.contact = cusContact;

        // Reload the table with updated data
        loadCustomerTable();
        $('#closeCustomer').click(); // Close the modal
        clearCustomerInputs(); // Clear remaining data from input fields
    } else {
        console.error("No customer selected for update or invalid index.");
    }
});

$('#deleteCustomer').on("click", function() {
    // Check if recordIndex is defined and within the range of customers array
    if (recordIndex !== undefined && recordIndex >= 0 && recordIndex < customers.length) {
        customers.splice(recordIndex, 1); // Remove the customer at the specified index
        loadCustomerTable(); // Reload the table with updated data
        clearCustomerInputs(); // Clear remaining data from input fields
    } else {
        console.error("No customer selected for deletion or invalid index.");
    }
});

// Function to clear remaining data from customer input fields
// Function to clear remaining data from customer input fields
function clearCustomerInputs() {
    $('#Cid').val('');
    $('#Cname').val('');
    $('#Caddress').val('');
    $('#Ccontact').val('');
    $('#idCustomer').val('');
    $('#nameCustomer').val('');
    $('#addressCustomer').val('');
    $('#contactCustomer').val('');
}
// Function to clear options of a select box
function clearSelectOptions(selectElement) {
    $(selectElement).empty(); // Clear all child elements of the select box
}

// Function to populate the select box with customer names
function populateCustomerSelect() {
    clearSelectOptions('#selectCustomer'); // Clear existing options
    customers.forEach(function(customer) {
        var customerName = customer.name; // Extract customer name
        addOption(customerName, '#selectCustomer'); // Add option to select
    });
}
// Function to add an option to a select box
function addOption(text, selectElement) {
    $(selectElement).append($('<option>', {
        value: text,
        text: text
    }));
}


// Event listener for when the select box is clicked
$('#selectCustomer').on('click', function() {
    populateCustomerSelect(); // Populate the select box with customer names
});

// Event listener for when the select box value changes
$('#selectCustomer').on('change', function() {
    var selectedName = $(this).val(); // Get the selected customer name from the dropdown

    if (selectedName !== "Search Customer") {
        // Find the index of the selected customer in the customers array
        var selectedCustomer = customers.find(function(customer) {
            return customer.name === selectedName;
        });

        if (selectedCustomer) {
            // If the customer is found, update the input fields with its data
            $('#Cid').val(selectedCustomer.id);
            $('#Cname').val(selectedCustomer.name);
            $('#Caddress').val(selectedCustomer.address);
            $('#Ccontact').val(selectedCustomer.contact);

            // Update recordIndex to the index of the selected customer in the array
            recordIndex = customers.indexOf(selectedCustomer);
        } else {
            // If no customer with the selected name is found, clear the input fields
            clearCustomerInputs();
        }
    } else {
        // If "Search Customer" option is selected, clear the input fields
        clearCustomerInputs();
    }
});

// Function to validate customer ID
function validateCustomerId(cusId) {
    return cusId.match(/^C00\d+$/);
}

// Function to validate customer name
function validateCustomerName(cusName) {
    return cusName.length >= 5;
}

// Function to validate customer address
function validateCustomerAddress(cusAddress) {
    // Address validation (example: at least 10 characters)
    return cusAddress.length >= 5;
}

// Function to validate customer contact
function validateCustomerContact(cusContact) {
    return /^\d{10}$/.test(cusContact); // Ensure exactly 10 digits
}

// Function to validate customer inputs (ID, name, address, contact)
function validateCustomerInputs(cusId, cusName, cusAddress, cusContact) {
    return (
        validateCustomerId(cusId) &&
        validateCustomerName(cusName) &&
        validateCustomerAddress(cusAddress) &&
        validateCustomerContact(cusContact)
    );
}


