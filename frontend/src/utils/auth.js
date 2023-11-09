class Auth {
  constructor({ baseUrl, headers }) {
    this.baseUrl = baseUrl;
    this.headers = headers;
  }

  processResponse(res) {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(`An error just occurred: ${res.status}`);
    }
  }

  // registration
  register(credentials) {
    return fetch(`${this.baseUrl}/signup`, {
      method: "POST",
      headers: this.headers,
      body: JSON.stringify(credentials),
    })
      .then(this.processResponse)
      .then((data) => {
        return fetch(`${this.baseUrl}/signin`, {
          method: "POST",
          headers: this.headers,
          body: JSON.stringify(credentials),
        })
          .then(this.processResponse)
          .then((res) => {
            localStorage.setItem("jwt", res.token);

            return data;
          });
      });
  }

  // login
  login(data) {
    return fetch(`${this.baseUrl}/signin`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then(this.processResponse)
      .then((data) => {
        localStorage.setItem("jwt", data.token);
        return this.checkToken(data.token);
      });
  }

  // check token
  checkToken(token) {
    //console.log("hello user");
    return fetch(`${this.baseUrl}/users/me`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }).then(this.processResponse);
  }
}

// const BASE_URL = "https://34.127.118.187:3002"; // IP OF REMOTE SERVER

//const BASE_URL = "http://localhost:3001";
// process.env.NODE_ENV === "production"
//   ? "http://34.168.206.18"
//   : "http://localhost:3001";

export const auth = new Auth({
  //baseUrl: "https://register.nomoreparties.co",
  baseUrl: "http://localhost:3001",
  headers: {
    "Content-Type": "application/json",
  },
});
