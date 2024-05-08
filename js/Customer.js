var customers = [];
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

    let customer = {
        id: cusId,
        name: cusName,
        address: cusAddress,
        contact: cusContact
    }

    customers.push(customer);
    console.log(customers);
    loadCustomerTable();
    $('#closeCustomer').click(); // Close the modal
    clearCustomerInputs();
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

$('#updateCustomer').on("click", function() {
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

var selectCustomer = document.getElementById('selectCustomer');

// Function to populate the select box with customer names
function populateSelect() {
    empty(selectCustomer); // Clear existing options
    customers.forEach(function(customer) {
        var customerName = customer.name; // Extract customer name
        addOption(customerName, selectCustomer); // Add option to select
    });
}

// Event listener for when the select box is clicked
$('#selectCustomer').on('click', function() {
    populateSelect(); // Populate the select box with customer names
});

// Create a new MutationObserver
var observer = new MutationObserver(function(mutationsList) {
    for(var mutation of mutationsList) {
        if (mutation.type === 'childList') {
            populateSelect(); // If there are changes in the customer table, repopulate the select box
            break; // Exit the loop after the first mutation
        }
    }
});

// Start observing the customer table for changes
observer.observe(document.getElementById('customerTableBody'), { childList: true });

function empty(select) {
    select.innerHTML = '';
}

function addOption(val, select) {
    var option = document.createElement('option');
    option.value = val;
    option.innerHTML = val;
    select.appendChild(option);
}


//----------data drop down eken select klma anith ewta set wenna

$('#selectCustomer').on('change', function() {
    var selectedName = $(this).val(); // Get the selected customer name from the dropdown

    if (selectedName !== "Search Customer") {
        // Find the customer object with the selected name
        var selectedCustomer = customers.find(function(customer) {
            return customer.name === selectedName;
        });

        if (selectedCustomer) {
            // If a customer with the selected name is found, update the input fields with their data
            $('#Cid').val(selectedCustomer.id);
            $('#Cname').val(selectedCustomer.name);
            $('#Caddress').val(selectedCustomer.address);
            $('#Ccontact').val(selectedCustomer.contact);
        } else {
            // If no customer with the selected name is found, clear the input fields
            clearCustomerInputs();
        }
    } else {
        // If "Search Customer" option is selected, clear the input fields
        clearCustomerInputs();
    }
});

