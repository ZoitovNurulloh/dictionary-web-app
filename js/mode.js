const dropdownBtn = document.querySelector(".dropdown__inner--js");
const dropdownMenu = document.querySelector(".dropdown__menu");
const dropdownItem = document.querySelectorAll(".dropdown__item--js");
const dropdownText = document.querySelector(".dropdown__button--js");
const body = document.querySelector("body")
const btnTogglerTheme = document.querySelector(".header__button");


btnTogglerTheme.addEventListener("click", () => {
  document.body.classList.toggle("dark");
})

dropdownBtn.addEventListener("click", () => {
  dropdownMenu.classList.toggle("dropdown__menu--db");
});

dropdownItem.forEach((item) => {
  item.addEventListener("click", () => {
    const itemText = item.textContent;
    dropdownText.textContent = itemText;
    dropdownMenu.classList.remove("dropdown__menu--db");
    body.style.fontFamily = item.getAttribute("data-font");
  })
});