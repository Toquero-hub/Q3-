// Kiosk Ordering Program

// Sample data for sellers (username: password)
const sellers = {
    "seller1": "password1",
    "seller2": "password2"
};

// Sample data for food products
const categories = {
    "Pasta": [
        { name: "Spaghetti", price: 8.50 },
        { name: "Fettuccine", price: 9.00 },
        { name: "Penne", price: 7.50 }
    ],
    "Desserts": [
        { name: "Cheesecake", price: 4.00 },
        { name: "Brownie", price: 3.50 },
        { name: "Ice Cream", price: 2.50 }
    ],
    "Drinks": [
        { name: "Soda", price: 1.50 },
        { name: "Water", price: 1.00 },
        { name: "Juice", price: 2.00 }
    ]
};

// Cart for customers
let cart = [];

// Function to authenticate seller
function authenticateSeller() {
    const username = prompt("Enter username:");
    const password = prompt("Enter password:");

    if (sellers[username] && sellers[username] === password) {
        return true;
    } else {
        alert("Authentication failed!");
        return false;
    }
}

// Function to add item to a category
function addItem(category) {
    const itemName = prompt("Enter item name:");
    const itemPrice = parseFloat(prompt("Enter item price:"));
    
    categories[category].push({ name: itemName, price: itemPrice });
    alert(`Item '${itemName}' added to category '${category}'.`);
}

// Function to remove item from a category
function removeItem(category) {
    const itemName = prompt("Enter item name to remove:");
    
    const index = categories[category].findIndex(item => item.name === itemName);
    
    if (index !== -1) {
        categories[category].splice(index, 1);
        alert(`Item '${itemName}' removed from category '${category}'.`);
    } else {
        alert(`Item '${itemName}' not found in category '${category}'.`);
    }
}

// Seller menu function
function sellerMenu() {
    while (true) {
        const action = prompt("Choose action: (LOGOUT, ADD, REMOVE)").toUpperCase();
        
        if (action === "LOGOUT") {
            break;
        } else if (action === "ADD" || action === "REMOVE") {
            const category = prompt("Choose category (Pasta, Desserts, Drinks):");
            if (action === "ADD") {
                addItem(category);
                while (prompt("Continue to ADD? (yes/no)").toLowerCase() === 'yes') {
                    addItem(category);
                }
            } else if (action === "REMOVE") {
                removeItem(category);
                while (prompt("Continue to REMOVE? (yes/no)").toLowerCase() === 'yes') {
                    removeItem(category);
                }
            }
        } else {
            alert("Invalid action! Please choose LOGOUT, ADD, or REMOVE.");
        }
    }
}

// Function to display available products
function displayProducts() {
    let productList = "";
    
    for (const category in categories) {
        productList += `\n${category}:\n`;
        categories[category].forEach(item => {
            productList += `- ${item.name}: $${item.price.toFixed(2)}\n`;
        });
    }
    
    alert(productList);
}

// Function for customers to order items
function orderItem() {
    displayProducts();
    
    const category = prompt("Choose a category:");
    const itemName = prompt("Choose an item:");
    const quantity = parseInt(prompt("Enter quantity:"), 10);
    
    const item = categories[category].find(item => item.name === itemName);
    
    if (item) {
        cart.push({ name: item.name, price: item.price, quantity });
        alert(`Added ${quantity} of '${item.name}' to cart.`);
    } else {
        alert(`Item '${itemName}' not found in category '${category}'.`);
    }
}

// Function to print the cart contents
function printCart() {
    if (cart.length === 0) {
        alert("Your cart is empty.");
        return;
    }

    let totalPrice = 0;
    let cartContents = "\nCart Contents:\n";

    // Sorting cart by item name using a simple bubble sort
    for (let i = 0; i < cart.length; i++) {
        for (let j = 0; j < cart.length - i - 1; j++) {
            if (cart[j].name > cart[j + 1].name) {
                [cart[j], cart[j + 1]] = [cart[j + 1], cart[j]];
            }
        }
    }

    cart.forEach(item => {
        const totalItemPrice = item.price * item.quantity;
        totalPrice += totalItemPrice;
        cartContents += `- ${item.name}: $${item.price.toFixed(2)} x ${item.quantity} = $${totalItemPrice.toFixed(2)}\n`;
    });

    cartContents += `Total Price: $${totalPrice.toFixed(2)}`;
    
    alert(cartContents);
}

// Customer menu function
function customerMenu() {
    while (true) {
        const action = prompt("Choose action: (ORDER, CART, CANCEL)").toUpperCase();
        
        if (action === "CANCEL") {
            break;
        } else if (action === "ORDER") {
            orderItem();
        } else if (action === "CART") {
            while (true) {
                const cartAction = prompt("Choose cart action: (PRINT, ADD, REMOVE, CANCEL)").toUpperCase();
                
                if (cartAction === "CANCEL") break;
                else if (cartAction === "PRINT") printCart();
                else if (cartAction === "REMOVE") {
                    const itemName = prompt("Enter the item name to remove from the cart:");
                    cart = cart.filter(item => item.name !== itemName);
                    alert(`Removed '${itemName}' from the cart.`);
                } else {
                    alert("Invalid action! Please choose PRINT, ADD, REMOVE, or CANCEL.");
                }
            }
        } else {
            alert("Invalid action! Please choose ORDER, CART, or CANCEL.");
        }
    }
}

// Main function to run the kiosk program
function main() {
    while (true) {
        const userType = prompt("Are you a SELLER or CUSTOMER?").toUpperCase();
        
        if (userType === "SELLER") {
            if (authenticateSeller()) {
                sellerMenu();
            }
        } else if (userType === "CUSTOMER") {
            customerMenu();
        } else {
            alert("Invalid option! Please choose SELLER or CUSTOMER.");
        }
        
        // Return to the main menu after each session
    }
}

// Start the program
main();
