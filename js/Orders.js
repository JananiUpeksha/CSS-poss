// Function to generate the next Order ID
function generateNextOrderId(currentId) {
    var num = parseInt(currentId.slice(2)) + 1; // Extract the numeric part and increment
    var nextId = "Or" + ("000" + num).slice(-3); // Format the incremented number with leading zeros
    return nextId;
}

// Set the current date in the "Order Date" input field
function setCurrentDate() {
    var currentDate = new Date();
    var formattedDate = currentDate.toISOString().slice(0, 10); // Format date as YYYY-MM-DD
    $('#orderDate').val(formattedDate);
}

// Set the initial Order ID and current date when the page loads
$(document).ready(function() {
    setCurrentDate(); // Set current date
});

// Example usage:
var currentOrderId = "Or001"; // Get the current Order ID from your data source
var nextOrderId = generateNextOrderId(currentOrderId);
console.log(nextOrderId); // Output: Or002


//-----------------------------------------------------------------