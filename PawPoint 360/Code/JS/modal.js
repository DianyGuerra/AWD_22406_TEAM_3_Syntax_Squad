
document.getElementById("openServices").addEventListener("click", function (e) {
e.preventDefault();
document.getElementById("servicesModalOverlay").style.display = "block";
});

document.querySelector(".custom-modal-close").onclick = () => {
document.getElementById("servicesModalOverlay").style.display = "none";
};

window.onclick = (e) => {
if (e.target.id === "servicesModalOverlay") {
    e.target.style.display = "none";
}
};

