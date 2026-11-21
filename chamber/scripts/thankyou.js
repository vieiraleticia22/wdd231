
// Get form information from the URL

const params = new URLSearchParams(window.location.search);

const firstName = params.get("firstName");
const lastName = params.get("lastName");
const email = params.get("email");
const phone = params.get("phone");
const organization = params.get("organization");
const timestamp = params.get("timestamp");

// Display application information

const details = document.querySelector("#application-details");

if (details) {
    const information = [
        ["First Name", firstName],
        ["Last Name", lastName],
        ["Email Address", email],
        ["Mobile Phone", phone],
        ["Business / Organization", organization],
        ["Application Date", timestamp ? new Date(timestamp).toLocaleString() : null]
    ];

    details.replaceChildren();

    information.forEach(([label, value]) => {
        const paragraph = document.createElement("p");
        const strong = document.createElement("strong");

        strong.textContent = `${label}: `;
        paragraph.append(strong, document.createTextNode(value || "Not provided"));

        details.appendChild(paragraph);
    });
}
