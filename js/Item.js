
    var items = [];
    var recordIndex = undefined;

    function loadTable() {
        $('#itemTableBody').empty();
        items.map((item, index) => {
            let record = `<tr>
            <td class="item-id-value">${item.id}</td>
            <td class="item-name-value">${item.name}</td>
            <td class="item-price-value">${item.price}</td>
            <td class="item-quantity-value">${item.quantity}</td>
            </tr>`;

            $('#itemTableBody').append(record);
        });
    }

    $('#saveItem').on( "click", function (){
        var itemId = $('#mid').val();
        var itemName = $('#mname').val();
        var itemPrice = $('#mprice').val();
        var itemQuantity = $('#mquantity').val();

        console.log("Id: " , itemId);
        console.log("Name: " , itemName);
        console.log("Price: " , itemPrice);
        console.log("Quantity: " , itemQuantity);

        let item = {
            id: itemId,
            name: itemName,
            price: itemPrice,
            quantity: itemQuantity
        }

        items.push(item);
        console.log(items);
        loadTable();
        clearCardInputs();
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
        $('#mquntity').val('');
    }
