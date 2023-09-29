class Auth {
  constructor({ baseUrl, headers }) {
    this.baseUrl = baseUrl;
    this.headers = headers;
  }

  _customFetch(url, options) {
    return fetch(url, options)
      .then(this.processResponse)
      .catch((error) => {
        return Promise.reject(`An error has occurred: ${error}`);
      });
  }

  processResponse(res) {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(`An error has occurred: ${res.status}`);
    }
  }

  // registration
  register(credentials) {
    const signUpUrl = `${this.baseUrl}/signup`;
    const signInUrl = `${this.baseUrl}/signin`;

    const signUpOptions = {
      method: "POST",
      headers: this.headers,
      body: JSON.stringify(credentials),
    };

    return this._customFetch(signUpUrl, signUpOptions).then((data) => {
      const signInOptions = {
        method: "POST",
        headers: this.headers,
        body: JSON.stringify(credentials),
      };

      return this._customFetch(signInUrl, signInOptions).then((res) => {
        localStorage.setItem("jwt", res.token);
        return data;
      });
    });
  }

  // login
  login(data) {
    const signInUrl = `${this.baseUrl}/signin`;

    const signInOptions = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };

    return this._customFetch(signInUrl, signInOptions).then((data) => {
      localStorage.setItem("jwt", data.token);
      return this.checkToken(data.token);
    });
  }

  // check token
  checkToken(token) {
    const userUrl = `${this.baseUrl}/users/me`;

    const userOptions = {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    return this._customFetch(userUrl, userOptions);
  }
}

export const auth = new Auth({
  baseUrl: "https://register.nomoreparties.co",
  headers: {
    "Content-Type": "application/json",
  },
});
