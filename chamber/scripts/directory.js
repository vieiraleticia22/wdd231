// Get the members container
const membersContainer = document.querySelector("#members-container");

// Get the view buttons
const gridButton = document.querySelector("#grid");
const listButton = document.querySelector("#list");

// Fetch and display members
async function getMembers() {
    try {
        const response = await fetch("data/members.json");

        if (!response.ok) {
            throw new Error("Could not load members data.");
        }

        const data = await response.json();

        displayMembers(data.members);

    } catch (error) {
        console.error("Error loading members:", error);
        membersContainer.innerHTML = "<p>Unable to load business members.</p>";
    }
}

// Create and display member cards
function displayMembers(members) {

    membersContainer.innerHTML = "";

    members.forEach((member) => {

        const card = document.createElement("section");
        card.classList.add("member-card");

        const name = document.createElement("h2");
        name.textContent = member.name;

        const image = document.createElement("img");
        image.src = `images/${member.image}`;
        image.alt = `${member.name} business`;
        image.loading = "lazy";

        const address = document.createElement("p");
        address.textContent = member.address;

        const phone = document.createElement("p");
        phone.textContent = member.phone;

        const website = document.createElement("a");
        website.href = member.website;
        website.textContent = "Visit Website";
        website.target = "_blank";
        website.rel = "noopener noreferrer";

        const membership = document.createElement("p");

        const levels = {
            1: "Member",
            2: "Silver Member",
            3: "Gold Member"
        };

        membership.textContent = `Membership: ${levels[member.membership]}`;

        const description = document.createElement("p");
        description.textContent = member.description;

        card.appendChild(name);
        card.appendChild(image);
        card.appendChild(address);
        card.appendChild(phone);
        card.appendChild(website);
        card.appendChild(membership);
        card.appendChild(description);

        membersContainer.appendChild(card);
    });
}

// Change to grid view
gridButton.addEventListener("click", () => {
    membersContainer.classList.add("grid");
    membersContainer.classList.remove("list");
});

// Change to list view
listButton.addEventListener("click", () => {
    membersContainer.classList.add("list");
    membersContainer.classList.remove("grid");
});

// Start loading members
getMembers();