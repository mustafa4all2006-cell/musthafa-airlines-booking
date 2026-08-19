// Common JavaScript for all pages

document.addEventListener("DOMContentLoaded", function () {

    // BOOKING PAGE
    const bookingForm = document.getElementById("bookingForm");

    if (bookingForm) {
        const travelDate = document.getElementById("travelDate");
        const today = new Date().toISOString().split("T")[0];
        travelDate.min = today;

        bookingForm.addEventListener("submit", function (event) {
            event.preventDefault();

            const from = document.getElementById("from").value;
            const to = document.getElementById("to").value;
            const date = travelDate.value;
            const passengers = Number(document.getElementById("passengers").value);
            const classType = document.getElementById("classType").value;
            const name = document.getElementById("passengerName").value.trim();
            const email = document.getElementById("passengerEmail").value.trim();

            const message = document.getElementById("bookingMessage");

            if (from === to) {
                message.textContent = "From and To locations cannot be the same.";
                return;
            }

            // Simple sample fare calculation for a college project
            let fare = isInternational(from, to) ? 18999 : 5499;

            if (classType === "Premium Economy") fare *= 1.5;
            if (classType === "Business") fare *= 2.5;

            const totalFare = Math.round(fare * passengers);
            const pnr = "MH" + Math.floor(100000 + Math.random() * 900000);
            const flight = "MH-" + Math.floor(100 + Math.random() * 900);

            document.getElementById("tPNR").textContent = pnr;
            document.getElementById("tName").textContent = name;
            document.getElementById("tRoute").textContent = from + " → " + to;
            document.getElementById("tDate").textContent = formatDate(date);
            document.getElementById("tFlight").textContent = flight;
            document.getElementById("tClass").textContent = classType;
            document.getElementById("tPassengers").textContent = passengers;
            document.getElementById("tFare").textContent = "₹" + totalFare.toLocaleString("en-IN");

            // Store booking in the browser so it can be used later
            localStorage.setItem("lastBooking", JSON.stringify({
                pnr, name, email, from, to, date, passengers, classType, totalFare, flight
            }));

            message.textContent = "Booking successful!";
            document.getElementById("ticket").classList.remove("hidden");

            // Scroll down to the generated ticket
            document.getElementById("ticket").scrollIntoView({behavior:"smooth"});
        });

        document.getElementById("printTicket").addEventListener("click", function () {
            window.print();
        });
    }

    // FLIGHT SEARCH PAGE
    const searchBox = document.getElementById("flightSearch");
    const typeBox = document.getElementById("flightType");

    if (searchBox && typeBox) {
        function filterFlights() {
            const search = searchBox.value.toLowerCase();
            const type = typeBox.value;
            const flights = document.querySelectorAll(".flight-card");

            flights.forEach(function (flight) {
                const matchesText = flight.dataset.search.includes(search);
                const matchesType = type === "all" || flight.dataset.type === type;
                flight.style.display = matchesText && matchesType ? "grid" : "none";
            });
        }

        searchBox.addEventListener("input", filterFlights);
        typeBox.addEventListener("change", filterFlights);
    }

    // CONTACT PAGE
    const contactForm = document.getElementById("contactForm");

    if (contactForm) {
        contactForm.addEventListener("submit", function (event) {
            event.preventDefault();
            const name = document.getElementById("contactName").value;
            alert("Thank you, " + name + "! Your message has been sent successfully.");
            contactForm.reset();
        });
    }
});

function isInternational(from, to) {
    const internationalPlaces = ["Dubai", "Singapore", "London"];
    return internationalPlaces.includes(from) || internationalPlaces.includes(to);
}

function formatDate(dateString) {
    const date = new Date(dateString + "T00:00:00");
    return date.toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric"
    });
}
