import Page from "../page.js";
import HtmlTemplate from ".../src/static/index.html"

export default class LoginPage extends Page {
  constructor(app) {
    super(app, HtmlTemplate);
  }

  async init() {
    await super.init();
    this._title = "Login";

    const LoginButton = document.getElementById("LoginButton");

    LoginButton.addEventListener("click", () => {
      // get the username and password input values
      const username = document.getElementById("username").value;
      const password = document.getElementById("password").value;

      // do something with the username and password data
      console.log("Username:", username);
      console.log("Password:", password);
    });

    const form = document.querySelector("form");

    form.addEventListener("submit", (event) => {
      event.preventDefault();

      // get the username and password input values
      const username = document.getElementById("username").value;
      const password = document.getElementById("password").value;

      // send the data to the server
      fetch("/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      })
        .then((response) => {
          // handle the response from the server
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    });
  }
}

