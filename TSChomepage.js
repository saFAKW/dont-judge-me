// Access to buttons in HTML
const level1 = document.getElementById("difLev1");
const level2 = document.getElementById("difLev2");
const level3 = document.getElementById("difLev3");

//switches to the level the user chooses
function change_page(type){
    if (type === 1){
        window.location.href = "Level1.html";
    }
    else if (type === 2){
        window.location.href = "Level2.html";
    }
    else if (type === 3){
        window.location.href = "Level3.html";
    }
}

// Attach event listeners to each button for page changing
level1.addEventListener("click", () => {
  change_page(1);
});
level2.addEventListener("click", () => {
  change_page(2);
});
level3.addEventListener("click", () => {
  change_page(3);
});
