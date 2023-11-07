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

// FUNCTIONALITY FROM PROJECT 14 ----------------------------->
// class Auth {
//   constructor({ baseUrl, headers }) {
//     this.baseUrl = baseUrl;

//     this.headers = headers;
//   }

//   _customFetch(url, options) {
//     console.log(`url ${url}`);
//     console.log(options);
//     return fetch(url, options)
//       .then(this.processResponse)

//       .catch((error) => {
//         return Promise.reject(`An error has occurred: ${error}`);
//       });
//   }

//   processResponse(res) {
//     if (res.ok) {
//       return res.json();
//     } else {
//       return Promise.reject(`An error has occurred: ${res.status}`);
//     }
//   }

// registration

// register(credentials) {
//   const signUpUrl = `${this.baseUrl}/signup`;

//   const signInUrl = `${this.baseUrl}/signin`;

//   const signUpOptions = {
//     method: "POST",

//     headers: this.headers,

//     body: JSON.stringify(credentials),
//   };

//   return this._customFetch(signUpUrl, signUpOptions).then((data) => {
//     const signInOptions = {
//       method: "POST",

//       headers: this.headers,

//       body: JSON.stringify(credentials),
//     };

//     return this._customFetch(signInUrl, signInOptions).then((res) => {
//       localStorage.setItem("jwt", res.token);

//       return data;
//     });
//   });
// }

// login

// login(data) {
//   const signInUrl = `${this.baseUrl}/signin`;

//   const signInOptions = {
//     method: "POST",

//     headers: {
//       Accept: "application/json",

//       "Content-Type": "application/json",
//     },

//     body: JSON.stringify(data),
//   };

//   console.log(signInOptions);
//   console.log(signInUrl);

//   return this._customFetch(signInUrl, signInOptions).then((data) => {
//     localStorage.setItem("jwt", data.token);

//     return this.checkToken(data.token);
//   });
// }

// login(data) {
//   return fetch(`${this.baseUrl}/signin`, {
//     method: "POST",
//     headers: {
//       Accept: "application/json",
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(data),
//   })
//     .then(this.processResponse)
//     .then((data) => {
//       console.log(`Before localStorage.setItem ${data.token}`);
//       localStorage.setItem("jwt", data.token);
//       // return this.checkToken(data.token);
//       const res = this.checkToken(data.token);
//       console.log(res);
//       return res;
//     });
// }

// check token

// checkToken(token) {
//   const userUrl = `${this.baseUrl}/users/me`;

//   console.log("checkToken");
//   console.log(token);

//   const userOptions = {
//     method: "GET",

//     headers: {
//       Accept: "application/json",

//       "Content-Type": "application/json",

//       Authorization: `Bearer ${token}`,
//     },
//   };

//   return this._customFetch(userUrl, userOptions);
// }
//}

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
