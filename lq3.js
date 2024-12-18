// Bus Seat Reservation System

const MAX_CAPACITY = 30;
const BUS_NAMES = ["Cubao", "Baguio", "Pasay"];

// User authentication data
const users = {
    ticket_person: { username: "admin", password: "password123" }
};

// Bus class to manage seat reservations
class Bus {
    constructor(name) {
        this.name = name;
        this.seats = Array(MAX_CAPACITY).fill("AVAILABLE"); // Initialize all seats as available
    }

    displayPassengers() {
        console.log(`\nBus Name: ${this.name}`);
        this.seats.forEach((seat, index) => {
            console.log(`Seat ${index + 1}: ${seat}`);
        });
    }

    addReservation(seatNumber, customerName) {
        if (this.seats[seatNumber] === "AVAILABLE") {
            this.seats[seatNumber] = customerName;
            console.log(`Reservation successful for ${customerName} at Seat ${seatNumber + 1}.`);
        } else {
            console.log("Seat is already taken!");
        }
    }

    removeReservation(seatNumber) {
        if (this.seats[seatNumber] !== "AVAILABLE") {
            const customerName = this.seats[seatNumber];
            this.seats[seatNumber] = "AVAILABLE";
            console.log(`Reservation for ${customerName} at Seat ${seatNumber + 1} has been removed.`);
        } else {
            console.log("No reservation found at this seat!");
        }
    }
}

// Function to authenticate the ticket person
function authenticate() {
    const username = prompt("Enter username: ");
    const password = prompt("Enter password: ");
    return users.ticket_person.username === username && users.ticket_person.password === password;
}

// Ticket person operations
function ticketPersonOperations(buses) {
    while (true) {
        console.log("\nOptions: LOGOUT, VIEW, MANAGE");
        const choice = prompt("Choose an option: ").toUpperCase();

        if (choice === "LOGOUT") {
            break;
        } else if (choice === "VIEW") {
            buses.forEach(bus => bus.displayPassengers());
            prompt("Press Enter to continue...");
        } else if (choice === "MANAGE") {
            manageBuses(buses);
        } else {
            console.log("Invalid option!");
        }
    }
}

// Manage bus reservations
function manageBuses(buses) {
    while (true) {
        console.log("\nAvailable Buses:");
        buses.forEach((bus, index) => console.log(`${index + 1}. ${bus.name}`));

        const busChoice = parseInt(prompt("Select a bus to manage (1-3): ")) - 1;

        if (busChoice >= 0 && busChoice < buses.length) {
            const bus = buses[busChoice];
            while (true) {
                const action = prompt("\nOptions: ADD, REMOVE, CANCEL").toUpperCase();

                if (action === "ADD") {
                    addReservation(bus);
                } else if (action === "REMOVE") {
                    removeReservation(bus);
                } else if (action === "CANCEL") {
                    break;
                } else {
                    console.log("Invalid option!");
                }
            }
        } else {
            console.log("Invalid bus selection!");
        }
    }
}

// Add a reservation
function addReservation(bus) {
    bus.displayPassengers();
    const seatNumber = parseInt(prompt("Enter seat number to reserve (1-30): ")) - 1;

    if (seatNumber >= 0 && seatNumber < MAX_CAPACITY) {
        const customerName = prompt("Enter customer name: ");
        bus.addReservation(seatNumber, customerName);
    } else {
        console.log("Invalid seat number!");
    }
}

// Remove a reservation
function removeReservation(bus) {
    bus.displayPassengers();
    const seatNumber = parseInt(prompt("Enter seat number to remove reservation (1-30): ")) - 1;

    if (seatNumber >= 0 && seatNumber < MAX_CAPACITY) {
        const confirm = prompt(`Are you sure you want to remove the reservation at Seat ${seatNumber + 1}? (yes/no) `).toLowerCase();
        if (confirm === 'yes') {
            bus.removeReservation(seatNumber);
        }
    } else {
        console.log("Invalid seat number!");
    }
}

// Customer operations
function customerOperations(buses) {
    while (true) {
        console.log("\nAvailable Buses:");
        buses.forEach((bus, index) => console.log(`${index + 1}. ${bus.name}`));

        const action = prompt("Choose an option: RESERVE, CANCEL RESERVATION, CANCEL: ").toUpperCase();

        if (action === "CANCEL") {
            break;
        } else if (action === "RESERVE") {
            reserveSeat(buses);
        } else if (action === "CANCEL RESERVATION") {
            cancelReservation(buses);
        } else {
            console.log("Invalid option!");
        }
    }
}

// Reserve a seat as a customer
function reserveSeat(buses) {
    const busChoice = parseInt(prompt("Select a bus (1-3): ")) - 1;

    if (busChoice >= 0 && busChoice < buses.length) {
        const bus = buses[busChoice];

        // Check availability
        if (bus.seats.every(seat => seat !== "AVAILABLE")) {
            console.log("Bus is fully booked!");
            return;
        }

        bus.displayPassengers();

        const seatNumber = parseInt(prompt("Enter seat number to reserve (1-30): ")) - 1;

        if (seatNumber >= 0 && seatNumber < MAX_CAPACITY && bus.seats[seatNumber] === "AVAILABLE") {
            const customerName = prompt("Enter your name: ");
            bus.addReservation(seatNumber, customerName);
        } else {
            console.log("Invalid or occupied seat!");
        }
    } else {
        console.log("Invalid bus selection!");
    }
}

// Cancel a customer's reservation
function cancelReservation(buses) {
    const customerName = prompt("Enter your name: ");

    for (const bus of buses) {
        const seatIndex = bus.seats.indexOf(customerName);
        
        if (seatIndex !== -1) { // Reservation found
            const confirm = prompt(`Are you sure you want to cancel your reservation at Seat ${seatIndex + 1} on Bus ${bus.name}? (yes/no) `).toLowerCase();
            
            if (confirm === 'yes') {
                bus.removeReservation(seatIndex);
                return;
            }
        }
    }

    console.log("Reservation not found.");
}

// Main function to run the program
function main() {
    const buses = BUS_NAMES.map(name => new Bus(name)); // Initialize buses

    while (true) {
        const userType = prompt("\nAre you a TICKET PERSON or CUSTOMER? ").toUpperCase();

        if (userType === "TICKET PERSON") {
            if (authenticate()) {
                ticketPersonOperations(buses);
            } else {
                console.log("Authentication failed!");
            }
        
        } else if (userType === "CUSTOMER") {
            customerOperations(buses);
        
        } else {
            console.log("Invalid user type!");
        }
    }
}

// Start the program
main();
