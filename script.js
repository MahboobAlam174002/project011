// Initialize 100 car slots and 500 bike slots
let carSlots = [];
let bikeSlots = [];

for (let i = 1; i <= 100; i++) {
    carSlots.push({ slotNumber: i, available: true, passKey: null });
}

for (let i = 1; i <= 500; i++) {
    bikeSlots.push({ slotNumber: i, available: true, passKey: null });
}

document.addEventListener("DOMContentLoaded", function () {
    const slotForm = document.getElementById("slot-form");
    const vehicleTypeSelect = document.getElementById("vehicle-type");
    const slotsContainer = document.getElementById("slots-container");
    const passKeyInput = document.getElementById("pass-key");
    const freeSlotForm = document.getElementById("free-slot-form");
    const freeSlotSelect = document.getElementById("free-slot");
    const dashboardSection = document.getElementById("dashboard-section");
    const userBookings = document.getElementById("user-bookings");
    const logoutBtn = document.getElementById("logout-btn");

    // Proceed to booking section from welcome page
    document.getElementById("proceed-btn").addEventListener("click", function () {
        document.getElementById("welcome-section").style.display = "none";
        document.getElementById("booking-section").style.display = "block";
    });

    // Generate a 4-digit pass key
    function generatePassKey() {
        return Math.floor(1000 + Math.random() * 9000);
    }

    // Update slot buttons based on availability
    function updateSlots(vehicleType) {
        slotsContainer.innerHTML = ''; // Clear previous slots

        let slots = vehicleType === 'car' ? carSlots : bikeSlots;
        slots.forEach(slot => {
            const button = document.createElement('button');
            button.textContent = slot.slotNumber;
            button.className = `slot-button ${slot.available ? 'available' : 'booked'}`;
            button.disabled = !slot.available;
            button.addEventListener('click', function () {
                passKeyInput.value = generatePassKey(); // Auto-generate pass key
                slotForm.slot.value = slot.slotNumber;
            });
            slotsContainer.appendChild(button);
        });
    }

    // Handle vehicle type change
    vehicleTypeSelect.addEventListener("change", function () {
        updateSlots(vehicleTypeSelect.value);
    });

    // Book a slot
    slotForm.addEventListener("submit", function (e) {
        e.preventDefault();
        const vehicleType = vehicleTypeSelect.value;
        const slotNumber = parseInt(slotForm.slot.value);
        const passKey = passKeyInput.value;

        let slot;
        if (vehicleType === 'car') {
            slot = carSlots.find(slot => slot.slotNumber === slotNumber);
        } else {
            slot = bikeSlots.find(slot => slot.slotNumber === slotNumber);
        }

        if (slot && slot.available) {
            slot.available = false;
            slot.passKey = passKey;
            alert(`Slot ${slotNumber} booked successfully with pass key: ${passKey}`);
            updateSlots(vehicleType);
        } else {
            alert('Slot is no longer available.');
        }
    });

    // Free up a slot
    freeSlotForm.addEventListener("submit", function (e) {
        e.preventDefault();
        const slotNumber = parseInt(freeSlotSelect.value);
        const passKey = document.getElementById("pass-key-confirm").value;

        let slot;
        if (vehicleTypeSelect.value === 'car') {
            slot = carSlots.find(slot => slot.slotNumber === slotNumber);
        } else {
            slot = bikeSlots.find(slot => slot.slotNumber === slotNumber);
        }

        if (slot && slot.passKey === passKey) {
            slot.available = true;
            slot.passKey = null;
            alert(`Slot ${slotNumber} has been freed.`);
            updateSlots(vehicleTypeSelect.value);
        } else {
            alert('Invalid pass key or slot number.');
        }
    });

    // Show user dashboard
    function showDashboard() {
        document.getElementById("booking-section").style.display = "none";
        dashboardSection.style.display = "block";
        // Fetch and display user bookings
        userBookings.innerHTML = "<p>Your bookings will appear here.</p>";
    }

    // Logout
    logoutBtn.addEventListener("click", function () {
        dashboardSection.style.display = "none";
        document.getElementById("welcome-section").style.display = "flex";
    });
});