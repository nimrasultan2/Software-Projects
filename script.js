
const PIZZA_PRICE = 1500;
const STORAGE_KEY = "rushCrustDemoOrders";

const carNames = {
    car1: "Delivery Car 1",
    car2: "Delivery Car 2"
};

const views = [
    "home",
    "customer",
    "confirmation",
    "owner",
    "driver",
    "social"
];

let orders = loadOrders();
let nextOrderNumber = orders.reduce(function (highest, order) {
    return Math.max(highest, Number(order.id) || 0);
}, 0) + 1;

let selectedPizza = "Chicken Tikka";

// Load saved demo orders
function loadOrders() {
    try {
        const savedOrders = localStorage.getItem(STORAGE_KEY);
        return savedOrders ? JSON.parse(savedOrders) : [];
    } catch (error) {
        return [];
    }
}

// Save orders in this browser
function saveOrders() {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(orders));
    } catch (error) {
        console.warn("Orders could not be saved in this browser.");
    }
}

// Safely display customer-entered text
function escapeHTML(value) {
    return String(value).replace(/[&<>"']/g, function (character) {
        const replacements = {
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            '"': "&quot;",
            "'": "&#039;"
        };

        return replacements[character];
    });
}

// Switch between website modules
function showView(viewName) {
    if (!views.includes(viewName)) {
        viewName = "home";
    }

    views.forEach(function (view) {
        const element = document.getElementById(view + "-view");

        if (element) {
            element.hidden = view !== viewName;
        }
    });

    const footer = document.getElementById("site-footer");

    if (footer) {
        footer.hidden = view !== "home";
    }

    document.querySelectorAll(".nav-links a[data-view]").forEach(
        function (link) {
            link.classList.toggle(
                "active",
                link.dataset.view === viewName
            );
        }
    );

    if (viewName === "owner") {
        renderOwnerDashboard();
    }

    if (viewName === "driver") {
        renderDriverDashboard();
    }

    window.scrollTo({ top: 0, behavior: "smooth" });
}

// Select a pizza from the menu
function selectPizza(pizzaName) {
    selectedPizza = pizzaName;

    const pizzaSelect = document.getElementById("pizza");

    if (pizzaSelect) {
        pizzaSelect.value = pizzaName;
    }

    showView("customer");
}

// Get an order's current status
function getOrderStatus(order) {
    if (order.status === "Delivered") {
        return "Delivered";
    }

    return order.car ? "Assigned" : "Pending";
}

// Check whether a car has another active delivery
function isCarBusy(car, excludedOrderId) {
    return orders.some(function (order) {
        return order.id !== excludedOrderId &&
            order.car === car &&
            order.status !== "Delivered";
    });
}

// Recommend an available car based on address keywords
function assignBestDriver(order) {
    const address = order.address.toLowerCase();

    const car1Keywords = [
        "saddar",
        "committee chowk",
        "murree road",
        "waris khan"
    ];

    const car2Keywords = [
        "bahria",
        "dha",
        "scheme 3",
        "peshawar road"
    ];

    const availableCars = ["car1", "car2"].filter(function (car) {
        return !isCarBusy(car, order.id);
    });

    if (availableCars.length === 0) {
        return "";
    }

    if (
        car1Keywords.some(function (keyword) {
            return address.includes(keyword);
        }) &&
        availableCars.includes("car1")
    ) {
        return "car1";
    }

    if (
        car2Keywords.some(function (keyword) {
            return address.includes(keyword);
        }) &&
        availableCars.includes("car2")
    ) {
        return "car2";
    }

    return availableCars[0];
}

// Assign or unassign a delivery car
function assignCar(orderId, car) {
    const order = orders.find(function (item) {
        return item.id === Number(orderId);
    });

    if (!order || order.status === "Delivered") {
        return;
    }

    if (car === "") {
        order.car = "";
        saveOrders();
        renderOwnerDashboard();
        renderDriverDashboard();
        return;
    }

    if (!carNames[car]) {
        return;
    }

    if (isCarBusy(car, order.id)) {
        alert(carNames[car] + " already has an active delivery.");
        renderOwnerDashboard();
        return;
    }

    order.car = car;

    saveOrders();
    renderOwnerDashboard();
    renderDriverDashboard();
}

// Apply the suggested car
function useSuggestion(orderId) {
    const order = orders.find(function (item) {
        return item.id === Number(orderId);
    });

    if (!order) {
        return;
    }

    const suggestedCar = assignBestDriver(order);

    if (!suggestedCar) {
        alert("Both cars already have active deliveries.");
        return;
    }

    assignCar(order.id, suggestedCar);
}

// Update car availability on the Owner dashboard
function updateCarStatuses() {
    ["car1", "car2"].forEach(function (car) {
        const activeOrder = orders.find(function (order) {
            return order.car === car &&
                order.status !== "Delivered";
        });

        const number = car === "car1" ? "1" : "2";
        const statusElement = document.getElementById(
            "car-" + number + "-status"
        );

        if (!statusElement) {
            return;
        }

        const card = statusElement.closest(".car-card");

        if (activeOrder) {
            statusElement.textContent =
                "Delivering " + activeOrder.code;

            if (card) {
                card.classList.add("busy");
            }
        } else {
            statusElement.textContent = "Available";

            if (card) {
                card.classList.remove("busy");
            }
        }
    });
}

// Render the Owner dashboard
function renderOwnerDashboard() {
    const totalElement = document.getElementById("total-orders");
    const pendingElement = document.getElementById("pending-orders");
    const deliveredElement = document.getElementById("delivered-orders");
    const ownerOrders = document.getElementById("owner-orders");

    if (!ownerOrders) {
        return;
    }

    const delivered = orders.filter(function (order) {
        return order.status === "Delivered";
    }).length;

    // Pending means any order that has not been delivered.
    const pending = orders.length - delivered;

    if (totalElement) {
        totalElement.textContent = orders.length;
    }

    if (pendingElement) {
        pendingElement.textContent = pending;
    }

    if (deliveredElement) {
        deliveredElement.textContent = delivered;
    }

    if (orders.length === 0) {
        ownerOrders.innerHTML = `
            <div class="empty-state">
                <h3>No orders yet</h3>
                <p>Place a demo order from the Menu module to see it here.</p>
            </div>
        `;
    } else {
        ownerOrders.innerHTML = orders.slice().reverse().map(
            function (order) {
                const status = getOrderStatus(order);
                const suggestion = order.status === "Delivered"
                    ? ""
                    : assignBestDriver(order);

                const carOptions = ["car1", "car2"].map(
                    function (car) {
                        const busy = isCarBusy(car, order.id);
                        const disabled = busy && order.car !== car;

                        return `
                            <option
                                value="${car}"
                                ${order.car === car ? "selected" : ""}
                                ${disabled ? "disabled" : ""}
                            >
                                ${carNames[car]}${disabled ? " (Busy)" : ""}
                            </option>
                        `;
                    }
                ).join("");

                return `
                    <article class="order-card">
                        <div class="order-card-top">
                            <div>
                                <p class="order-id">
                                    ${escapeHTML(order.code)}
                                </p>
                                <h3>${escapeHTML(order.pizza)}</h3>
                            </div>

                            <span class="status-pill ${status.toLowerCase()}">
                                ${status}
                            </span>
                        </div>

                        <div class="order-details">
                            <div>
                                <strong>Customer</strong>
                                ${escapeHTML(order.name)}
                            </div>

                            <div>
                                <strong>Phone</strong>
                                ${escapeHTML(order.phone)}
                            </div>

                            <div>
                                <strong>Delivery address</strong>
                                ${escapeHTML(order.address)}
                            </div>

                            <div>
                                <strong>Order total</strong>
                                Rs. ${Number(order.price).toLocaleString("en-PK")}
                            </div>

                            <div>
                                <strong>Assigned car</strong>
                                ${order.car ? carNames[order.car] : "Not assigned"}
                            </div>

                            <div>
                                <strong>Placed at</strong>
                                ${escapeHTML(order.createdAt)}
                            </div>
                        </div>

                        ${
                            order.status !== "Delivered"
                                ? `
                                    <div class="order-actions">
                                        <select
                                            aria-label="Assign car for ${escapeHTML(order.code)}"
                                            onchange="assignCar(${order.id}, this.value)"
                                        >
                                            <option value="">
                                                ${order.car ? "Unassign car" : "Choose a car"}
                                            </option>
                                            ${carOptions}
                                        </select>

                                        <button
                                            class="small-button"
                                            onclick="useSuggestion(${order.id})"
                                            ${suggestion ? "" : "disabled"}
                                        >
                                            Suggest a car
                                        </button>
                                    </div>
                                `
                                : ""
                        }
                    </article>
                `;
            }
        ).join("");
    }

    updateCarStatuses();
}

// Render the Driver dashboard
function renderDriverDashboard() {
    const driverOrders = document.getElementById("driver-orders");

    if (!driverOrders) {
        return;
    }

    const assignedOrders = orders.filter(function (order) {
        return order.car && order.status !== "Delivered";
    });

    if (assignedOrders.length === 0) {
        const completedCount = orders.filter(function (order) {
            return order.status === "Delivered" && order.car;
        }).length;

        driverOrders.innerHTML = `
            <div class="empty-state">
                <h3>${completedCount ? "All caught up" : "No deliveries assigned"}</h3>
                <p>${
                    completedCount
                        ? "Your assigned deliveries have been completed."
                        : "Assign a car to an order in the Owner module first."
                }</p>
            </div>
        `;

        return;
    }

    driverOrders.innerHTML = assignedOrders.map(function (order) {
        const mapsUrl =
            "https://www.google.com/maps/search/?api=1&query=" +
            encodeURIComponent(order.address + ", Rawalpindi, Pakistan");

        return `
            <article class="order-card">
                <div class="order-card-top">
                    <div>
                        <p class="order-id">${escapeHTML(order.code)}</p>
                        <h3>${escapeHTML(order.pizza)}</h3>
                    </div>

                    <span class="status-pill assigned">Assigned</span>
                </div>

                <div class="order-details">
                    <div>
                        <strong>Customer</strong>
                        ${escapeHTML(order.name)}
                    </div>

                    <div>
                        <strong>Phone</strong>
                        ${escapeHTML(order.phone)}
                    </div>

                    <div>
                        <strong>Your car</strong>
                        ${carNames[order.car]}
                    </div>

                    <div>
                        <strong>Delivery address</strong>
                        ${escapeHTML(order.address)}
                    </div>
                </div>

                <div class="order-actions">
                    <a
                        class="small-button"
                        href="${mapsUrl}"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Open Google Maps ↗
                    </a>

                    <button
                        class="small-button"
                        onclick="markDelivered(${order.id})"
                    >
                        Mark Delivered ✓
                    </button>
                </div>
            </article>
        `;
    }).join("");
}

// Mark an assigned order as delivered
function markDelivered(orderId) {
    const order = orders.find(function (item) {
        return item.id === Number(orderId);
    });

    if (!order || !order.car || order.status === "Delivered") {
        return;
    }

    order.status = "Delivered";

    saveOrders();
    renderOwnerDashboard();
    renderDriverDashboard();

    alert(order.code + " marked as delivered. The car is now available.");
}

// Create a customer order
function setupOrderForm() {
    const orderForm = document.getElementById("order-form");

    if (!orderForm) {
        return;
    }

    orderForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const pizza = document.getElementById("pizza").value;
        const name = document.getElementById("customer-name").value.trim();
        const phone = document.getElementById("customer-phone").value.trim();
        const address = document.getElementById("customer-address").value.trim();

        if (!name || !phone || !address) {
            alert("Please complete all the order details.");
            return;
        }

        const order = {
            id: nextOrderNumber,
            code: "RC-" + String(nextOrderNumber).padStart(3, "0"),
            pizza: pizza,
            name: name,
            phone: phone,
            address: address,
            price: PIZZA_PRICE,
            car: "",
            status: "Pending",
            createdAt: new Date().toLocaleString()
        };

        orders.push(order);
        nextOrderNumber++;

        saveOrders();

        document.getElementById("confirmation-message").textContent =
            "Thanks, " + name + ". Your demo order has been received.";

        document.getElementById("confirmation-details").innerHTML = `
            <p><strong>Order:</strong> ${escapeHTML(order.code)}</p>
            <p><strong>Pizza:</strong> ${escapeHTML(order.pizza)}</p>
            <p><strong>Total:</strong> Rs. ${PIZZA_PRICE.toLocaleString("en-PK")}</p>
            <p><strong>Status:</strong> Pending owner assignment</p>
        `;

        orderForm.reset();
        selectedPizza = "Chicken Tikka";
        document.getElementById("pizza").value = selectedPizza;

        renderOwnerDashboard();
        renderDriverDashboard();
        showView("confirmation");
    });
}

// RushCrust Assistant
function setupChat() {
    const chatToggle = document.getElementById("chat-toggle");
    const chatPanel = document.getElementById("chat-panel");
    const chatClose = document.getElementById("chat-close");
    const chatForm = document.getElementById("chat-form");
    const chatInput = document.getElementById("chat-input");
    const chatMessages = document.getElementById("chat-messages");
    const chatIcon = document.getElementById("chat-toggle-icon");

    if (!chatToggle || !chatPanel || !chatClose ||
        !chatForm || !chatInput || !chatMessages) {
        return;
    }

    function toggleChat(open) {
        chatPanel.hidden = !open;
        chatToggle.setAttribute("aria-expanded", String(open));

        if (chatIcon) {
            chatIcon.textContent = open ? "×" : "✳";
        }

        if (open) {
            chatInput.focus();
        }
    }

    function addChatMessage(message, sender) {
        const messageElement = document.createElement("div");
        messageElement.className = "chat-message " + sender + "-message";
        messageElement.textContent = message;
        chatMessages.appendChild(messageElement);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    function getRushReply(question) {
        const text = question.toLowerCase().trim();

        if (/\b(hi|hello|hey|salam|assalam)\b/.test(text)) {
            return "Hey! Welcome to RushCrust. 🍕 What can I help you with?";
        }

        if (/\b(menu|pizza|pizzas|flavour|flavor|options)\b/.test(text)) {
            return "We serve Chicken Tikka, Chicken Fajita, and Classic Cheese. Each costs Rs. 1,500.";
        }

        if (/\b(price|prices|cost|rupees|how much|rate)\b/.test(text)) {
            return "Every pizza on our demo menu costs Rs. 1,500.";
        }

        if (/\b(order|ordering|buy|purchase|checkout|place)\b/.test(text)) {
            return "Open Menu, choose a pizza, enter your details, and place your demo order. It will appear in the Owner module.";
        }

        if (/\b(address|area|location|rawalpindi|deliver to)\b/.test(text)) {
            return "This demo is designed around Rawalpindi. Enter your delivery address when ordering.";
        }

        if (/\b(delivery|driver|car|route|maps|navigation)\b/.test(text)) {
            return "Place an order, assign a car in Owner, then open Driver to view and complete the delivery.";
        }

        if (/\b(owner|manage|dashboard|assign|pending|incoming)\b/.test(text)) {
            return "The Owner module shows orders and car availability. You can assign a car manually or use Suggest a car.";
        }

        if (/\b(social|instagram|post|poster|campaign)\b/.test(text)) {
            return "Open the Social module to preview the RushCrust promotional post.";
        }

        if (/\b(payment|pay|online payment|cash|card)\b/.test(text)) {
            return "This is a front-end demo. It does not process payments or collect real payment details.";
        }

        if (/\b(ai|artificial intelligence|are you real)\b/.test(text)) {
            return "I'm the RushCrust demo assistant. I use prepared answers and keyword matching, not a live AI model.";
        }

        if (/\b(thanks|thank you|shukriya)\b/.test(text)) {
            return "You're welcome! 🍕";
        }

        return "Ask me about our menu, prices, ordering, delivery, Owner dashboard, or Driver module.";
    }

    function sendChatMessage(message) {
        const cleanMessage = message.trim();

        if (!cleanMessage) {
            return;
        }

        addChatMessage(cleanMessage, "user");

        window.setTimeout(function () {
            addChatMessage(getRushReply(cleanMessage), "bot");
        }, 200);
    }

    chatToggle.addEventListener("click", function () {
        toggleChat(chatPanel.hidden);
    });

    chatClose.addEventListener("click", function () {
        toggleChat(false);
    });

    chatForm.addEventListener("submit", function (event) {
        event.preventDefault();
        sendChatMessage(chatInput.value);
        chatInput.value = "";
    });

    document.querySelectorAll(".chat-suggestions button").forEach(
        function (button) {
            button.addEventListener("click", function () {
                sendChatMessage(button.dataset.question || button.textContent);
            });
        }
    );
}

// Start the website
document.addEventListener("DOMContentLoaded", function () {
    setupOrderForm();
    setupChat();

    renderOwnerDashboard();
    renderDriverDashboard();
    showView("home");
});
