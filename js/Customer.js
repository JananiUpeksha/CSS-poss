var customers = [];
var recordIndex = undefined;

function loadTable() {
    $('#customerTableBody').empty();
    customers.map((item, index) => {
        let record = `<tr>
        <td class="cus-id-value">${item.id}</td>
        <td class="cus-name-value">${item.name}</td>
        <td class="cus-address-value">${item.address}</td>
        <td class="cus-contact-value">${item.contact}</td>
        </tr>`;

        $('#customerTableBody').append(record);

    });
}

$('#saveCustomer').on( "click", function (){
    var cusId = $('#idCustomer').val();
    var cusName = $('#nameCustomer').val();
    var cusAddress = $('#addressCustomer').val();
    var cusContact = $('#contactCustomer').val();

    console.log("Id: " , cusId);
    console.log("Name: " , cusName);
    console.log("Contact: " , cusContact);
    console.log("address: " , cusAddress);

    let customer = {
        id: cusId,
        name: cusName,
        address: cusAddress,
        contact: cusContact
    }

    customers.push(customer);
    console.log(customers);
    loadTable();
    $('#customer-reset').click();
    clearCardInputs();
});

$('#customerTableBody').on('click', 'tr', function () {
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

$('#updateCustomer').on("click", function () {
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
        loadTable();
        $('#customer-reset').click(); // Reset card inputs
        clearCardInputs(); // Clear remaining data from input fields
    } else {
        console.error("No customer selected for update or invalid index.");
    }
});

$('#deleteCustomer').on("click", function () {
    // Check if recordIndex is defined and within the range of customers array
    if (recordIndex !== undefined && recordIndex >= 0 && recordIndex < customers.length) {
        customers.splice(recordIndex, 1); // Remove the customer at the specified index
        loadTable(); // Reload the table with updated data
        $('#customer-reset').click(); // Reset card inputs
        clearCardInputs(); // Clear remaining data from input fields
    } else {
        console.error("No customer selected for deletion or invalid index.");
    }
});

// Function to clear remaining data from input fields
function clearCardInputs() {
    $('#Cid').val('');
    $('#Cname').val('');
    $('#Caddress').val('');
    $('#Ccontact').val('');
    $('#idCustomer').val('');
    $('#nameCustomer').val('');
    $('#addressCustomer').val('');
    $('#contactCustomer').val('');
}
// Call initialize function when the page loads
$(document).ready(function() {
    loadCustomer();
});

function loadCustomer() {
    $('#selectCustomer').empty(); // Clear existing options

    // Add a default option
    $('#selectCustomer').append($('<option>', {
        value: '',
        text: 'Select Customer'
    }));

    // Iterate over customers array and add options for each customer
    customers.forEach(function(customer, index) {
        $('#selectCustomer').append($('<option>', {
            value: index, // Use index as value
            text: customer.name // Display customer name
        }));
    });
}




