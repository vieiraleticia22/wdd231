

document.querySelectorAll(".modal-link").forEach(link => {
    link.addEventListener("click", event => {
        event.preventDefault();

        const modalId = link.getAttribute("href");
        const modal = document.querySelector(modalId);

        if (modal) {
            modal.showModal();
        }
    });
});


document.querySelectorAll(".close-modal").forEach(button => {
    button.addEventListener("click", () => {
        const modal = button.closest("dialog");
        modal.close();
    });
});




const timestampField = document.querySelector("#timestamp");

if (timestampField) {
    timestampField.value = new Date().toISOString();
}
