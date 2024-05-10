import {customers} from "../DB/db";
import {items} from "../DB/db";


// Function to generate the next Order ID
function generateNextOrderId(currentId) {
    var num = parseInt(currentId.slice(2)) + 1; // Extract the numeric part and increment
    var nextId = "Or" + ("000" + num).slice(-3); // Format the incremented number with leading zeros
    return nextId;
}

// Set the current date in the "Order Date" input field
function setCurrentDate() {
    var currentDate = new Date(); // Create a new Date object with the current date and time
    var formattedDate = currentDate.toISOString().slice(0, 10); // Format date as YYYY-MM-DD
    document.getElementById('orderDate').value = formattedDate; // Set the value of the input field
}

// Set the initial Order ID and current date when the page loads
document.addEventListener('DOMContentLoaded', function() {
    setCurrentDate(); // Set current date
    var currentOrderId = "Or001"; // Get the current Order ID from your data source
    var nextOrderId = generateNextOrderId(currentOrderId);
    console.log(nextOrderId); // Output: Or002
});


//-----------------------------------------------------------------