import CustomerModel from "../Model/CustomerModel.js";
import {customers} from "../DB/db.js"
/*var customers = [];*/
var recordIndex = undefined;

function loadCustomerTable() {
    $('#customerTableBody').empty();
    customers.forEach(function(customer) {
        let record = `<tr>
            <td class="cus-id-value">${customer.id}</td>
            <td class="cus-name-value">${customer.name}</td>
            <td class="cus-address-value">${customer.address}</td>
            <td class="cus-contact-value">${customer.contact}</td>
            </tr>`;
        $('#customerTableBody').append(record);
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

    if (!validateCustomerInputs(cusId, cusName, cusAddress, cusContact)) {
        console.error("Invalid customer details. Please check and try again.");
        return;
    }

    let customer = new CustomerModel(cusId,cusName,cusAddress,cusContact);

    customers.push(customer);
    console.log(customers);
    loadCustomerTable();
    $('#closeCustomer').click();
    clearCustomerInputs()
});

$('#customerTableBody').on('click', 'tr', function() {
    recordIndex = $(this).index();
    console.log("recordIndex:", recordIndex);

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

    if (!validateCustomerInputs(cusId, cusName, cusAddress, cusContact)) {
        console.error("Invalid customer details. Please check and try again.");
        return;
    }

    if (recordIndex !== undefined && recordIndex >= 0 && recordIndex < customers.length) {
        let customerObject = customers[recordIndex];

        customerObject.id = cusId;
        customerObject.name = cusName;
        customerObject.address = cusAddress;
        customerObject.contact = cusContact;

        loadCustomerTable();
        $('#closeCustomer').click();
        clearCustomerInputs();
    } else {
        console.error("No customer selected for update or invalid index.");
    }
});

$('#deleteCustomer').on("click", function() {
    if (recordIndex !== undefined && recordIndex >= 0 && recordIndex < customers.length) {
        customers.splice(recordIndex, 1);
        loadCustomerTable();
        clearCustomerInputs();
    } else {
        console.error("No customer selected for deletion or invalid index.");
    }
});

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
function clearSelectOptions(selectElement) {
    $(selectElement).empty();
}

function populateCustomerSelect() {
    clearSelectOptions('#selectCustomer');
    customers.forEach(function(customer) {
        var customerName = customer.name;
        addOption(customerName, '#selectCustomer');
    });
}

function addOption(text, selectElement) {
    $(selectElement).append($('<option>', {
        value: text,
        text: text
    }));
}

$('#selectCustomer').on('click', function() {
    populateCustomerSelect(); // Populate the select box with customer names
});

$('#selectCustomer').on('change', function() {
    var selectedName = $(this).val(); // Get the selected customer name from the dropdown

    if (selectedName !== "Search Customer") {
        var selectedCustomer = customers.find(function(customer) {
            return customer.name === selectedName;
        });

        if (selectedCustomer) {
            $('#Cid').val(selectedCustomer.id);
            $('#Cname').val(selectedCustomer.name);
            $('#Caddress').val(selectedCustomer.address);
            $('#Ccontact').val(selectedCustomer.contact);
            recordIndex = customers.indexOf(selectedCustomer);
        } else {
            clearCustomerInputs();
        }
    } else {
        clearCustomerInputs();
    }
});

function validateCustomerId(cusId) {
    return cusId.match(/^C00\d+$/);
}

function validateCustomerName(cusName) {
    return cusName.length >= 5;
}

function validateCustomerAddress(cusAddress) {
    return cusAddress.length >= 5;
}

function validateCustomerContact(cusContact) {
    return /^\d{10}$/.test(cusContact);
}
function validateCustomerInputs(cusId, cusName, cusAddress, cusContact) {
    return (
        validateCustomerId(cusId) &&
        validateCustomerName(cusName) &&
        validateCustomerAddress(cusAddress) &&
        validateCustomerContact(cusContact)
    );
}



