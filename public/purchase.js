let suppliers = [];
let items = [];
let purchaseOrders = [];

// Show/Hide Sections
function showSection(sectionId) {
    document.querySelectorAll('.section').forEach(section => {
        section.style.display = 'none';
    });
    document.getElementById(sectionId).style.display = 'block';
}

// Add Supplier
document.getElementById('addSupplierForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const supplier = {
        id: suppliers.length + 1,
        name: document.getElementById('supplierName').value,
        contact: document.getElementById('supplierContact').value,
        email: document.getElementById('supplierEmail').value,
        address: document.getElementById('supplierAddress').value
    };
    suppliers.push(supplier);
    updateSupplierTable();
    updateSupplierSelect();
});

// Add Item
document.getElementById('addItemForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const item = {
        id: items.length + 1,
        name: document.getElementById('itemName').value,
        code: document.getElementById('itemCode').value,
        price: document.getElementById('itemPrice').value,
        stock: document.getElementById('itemStock').value
    };
    items.push(item);
    updateItemTable();
    updateItemSelect();
});

// Create Purchase Order
document.getElementById('createPoForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const po = {
        id: purchaseOrders.length + 1,
        supplier: document.getElementById('supplierSelect').value,
        items: getSelectedItems(),
        totalAmount: calculateTotal()
    };
    purchaseOrders.push(po);
    updatePoTable();
});

// Update Supplier Table
function updateSupplierTable() {
    const supplierTableBody = document.getElementById('supplierTableBody');
    supplierTableBody.innerHTML = '';
    suppliers.forEach(supplier => {
        supplierTableBody.innerHTML += `
            <tr>
                <td>${supplier.id}</td>
                <td>${supplier.name}</td>
                <td>${supplier.contact}</td>
                <td>${supplier.email}</td>
                <td>${supplier.address}</td>
                <td>
                    <button onclick="modifySupplier(${supplier.id})">Modify</button>
                    <button onclick="deleteSupplier(${supplier.id})">Delete</button>
                </td>
            </tr>
        `;
    });
}

// Update Item Table
function updateItemTable() {
    const itemTableBody = document.getElementById('itemTableBody');
    itemTableBody.innerHTML = '';
    items.forEach(item => {
        itemTableBody.innerHTML += `
            <tr>
                <td>${item.id}</td>
                <td>${item.name}</td>
                <td>${item.code}</td>
                <td>${item.price}</td>
                <td>${item.stock}</td>
                <td>
                    <button onclick="modifyItem(${item.id})">Modify</button>
                    <button onclick="deleteItem(${item.id})">Delete</button>
                </td>
            </tr>
        `;
    });
}

// Update Purchase Order Table
function updatePoTable() {
    const poTableBody = document.getElementById('poTableBody');
    poTableBody.innerHTML = '';
    purchaseOrders.forEach(po => {
        poTableBody.innerHTML += `
            <tr>
                <td>${po.id}</td>
                <td>${po.supplier}</td>
                <td>${formatItems(po.items)}</td>
                <td>${po.totalAmount}</td>
                <td>
                    <button onclick="viewPo(${po.id})">View</button>
                    <button onclick="deletePo(${po.id})">Delete</button>
                </td>
            </tr>
        `;
    });
}

// Helper functions
function updateSupplierSelect() {
    const supplierSelect = document.getElementById('supplierSelect');
    supplierSelect.innerHTML = '<option value="">--Select Supplier--</option>';
    suppliers.forEach(supplier => {
        supplierSelect.innerHTML += `<option value="${supplier.name}">${supplier.name}</option>`;
    });
}

// Helper functions continued
function updateItemSelect() {
    const itemSelectContainer = document.getElementById('itemSelectContainer');
    itemSelectContainer.innerHTML = '';
    items.forEach(item => {
        itemSelectContainer.innerHTML += `
            <div>
                <input type="checkbox" id="item-${item.id}" value="${item.id}" />
                <label for="item-${item.id}">${item.name} - ${item.price} each</label>
            </div>
        `;
    });
}

function getSelectedItems() {
    const selectedItems = [];
    items.forEach(item => {
        const checkbox = document.getElementById(`item-${item.id}`);
        if (checkbox.checked) {
            selectedItems.push({
                id: item.id,
                name: item.name,
                price: item.price,
                quantity: 1 // Default quantity to 1 for simplicity
            });
        }
    });
    return selectedItems;
}

function calculateTotal() {
    const selectedItems = getSelectedItems();
    return selectedItems.reduce((total, item) => total + (item.price * item.quantity), 0);
}

function formatItems(items) {
    return items.map(item => `${item.name} (Qty: ${item.quantity})`).join(', ');
}

// Modify, Delete and View functions
function modifySupplier(id) {
    alert(`Modify Supplier with ID: ${id}`);
}

function deleteSupplier(id) {
    suppliers = suppliers.filter(supplier => supplier.id !== id);
    updateSupplierTable();
}

function modifyItem(id) {
    alert(`Modify Item with ID: ${id}`);
}

function deleteItem(id) {
    items = items.filter(item => item.id !== id);
    updateItemTable();
}

function viewPo(id) {
    alert(`View Purchase Order with ID: ${id}`);
}

function deletePo(id) {
    purchaseOrders = purchaseOrders.filter(po => po.id !== id);
    updatePoTable();
}

