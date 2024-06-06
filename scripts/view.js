import * as model from "./model.js";
import * as helper from "./helper.js";

class View {
  #parentEL = document.querySelector(".output");

  render(data) {
    if (!this.#parentEL) {
      console.error("Parent element not found");
      return;
    }
    this.#clear();
    data.forEach((mov) => {
      const markup = this.#generateMarkup(mov);
      this.#parentEL.insertAdjacentHTML("afterbegin", markup);
    });
  }

  #clear() {
    this.#parentEL.innerHTML = "";
  }

  #generateMarkup(mov) {
    return `
      <div class="output_container">
        <p class="link">${mov.original}</p>
        <div class="two_items">
          <p class="output">${mov.short}</p>
          <button class="copybutton">Copy</button>
        </div>
      </div>
    `;
  }

  bindCopyButton(callback) {
    this.#parentEL.addEventListener("click", (e) => {
      const button = e.target.closest(".copybutton");
      if (!button) return;
      const outputElement = button.previousElementSibling;
      const textToCopy = outputElement.textContent;
      navigator.clipboard
        .writeText(textToCopy)
        .then(() => {
          button.textContent = "Copied!";
          button.classList.add("copied");
          setTimeout(() => {
            button.textContent = "Copy";
            button.classList.remove("copied");
          }, 2000);
        })
        .catch((err) => {
          console.error("Failed to copy:", err);
        });
    });
  }

  handleTextInput(callback) {
    document.querySelector(".shortenit").addEventListener("click", () => {
      const value = this.#getInputValue();
      this.#clearInput();
      const apiLink = this.#APICallLink(value);
      callback(apiLink, value);
    });
  }

  #clearInput() {
    document.querySelector(".linkbox").value = "";
  }

  #getInputValue() {
    return document.querySelector(".linkbox").value.trim();
  }

  #APICallLink(inputValue) {
    return `https://ulvis.net/api.php?url=${inputValue}&custom=${helper.randomString()}&private=1`;
  }

  dropdown() {
    const dropdown = document.querySelector(".dropdown");
    const navbar = document.querySelector(".navbar");

    if (dropdown && navbar) {
      console.log("Dropdown and Navbar elements found"); // Kontrol için
      dropdown.addEventListener("click", function () {
        console.log("Dropdown clicked"); // Kontrol için
        navbar.classList.toggle("hidden");
      });
    } else {
      console.error("Dropdown or Navbar element not found");
    }
  }
}

export default new View();
