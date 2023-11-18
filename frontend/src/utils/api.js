class Api {
  constructor({ baseUrl, headers }) {
    this.baseUrl = baseUrl;
    this.headers = headers;
  }

  _processResponse(res) {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(`An error just occurred: ${res.status}`);
    }
  }

  // When the user logs in or logs out, we update the user token in the request header
  updatedAuthUserToken = (token) => {
    this.headers = { ...this.headers, authorization: `Bearer ${token}` };
  };

  getInitialCards() {
    return fetch(`${this.baseUrl}/cards`, {
      method: "GET",
      headers: this.headers,
    }).then(this._processResponse);
  }

  // receiving user information ---------------------------------------------->
  getUserData() {
    return fetch(`${this.baseUrl}/users/me`, {
      method: "GET",
      headers: this.headers,
    }).then(this._processResponse);
  }

  //edit profile info with PATCH method ---------------------------------------------->
  editUserData({ name, about }) {
    console.log(baseUrl);
    return fetch(`${this.baseUrl}/users/me`, {
      method: "PATCH",
      headers: this.headers,
      body: JSON.stringify({
        name: name,
        about: about,
      }),
    }).then(this._processResponse);
  }

  // edit profile avatar with PATCH method ---------------------------------------------->
  editAvatar(avatar) {
    return fetch(`${this.baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: this.headers,
      body: JSON.stringify({ avatar: avatar }),
    }).then(this._processResponse);
  }

  // adding card to server with POST method ---------------------------------------------->
  addCard({ name, link }) {
    return fetch(`${this.baseUrl}/cards`, {
      method: "POST",
      headers: this.headers,
      body: JSON.stringify({
        name: name,
        link: link,
      }),
    }).then(this._processResponse);
  }

  // delete a card with DELETE method ---------------------------------------------->
  deleteCard(cardId) {
    return fetch(`${this.baseUrl}/cards/${cardId}`, {
      method: "DELETE",
      headers: this.headers,
    }).then(this._processResponse);
  }

  changeLikeCardStatus(cardId, isLiked) {
    const method = isLiked ? "DELETE" : "PUT";

    return fetch(`${this.baseUrl}/cards/${cardId}/likes`, {
      method: method,
      headers: this.headers,
    }).then(this._processResponse);
  }
}

// Instead of exporting the class itself, we export the newly created instance
const api = new Api({
  baseUrl: "https://api.travel-stories.click",

  headers: {
    authorization: `Bearer ${localStorage.getItem("jwt")}`,
    "Content-Type": "application/json",
  },
});

export { api };
