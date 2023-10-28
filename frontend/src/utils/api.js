import { baseUrl, headers } from "./constants";

class Api {
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

  // When the user logs in or logs out, we update the user token in the request header
  updatedAuthUserToken = (token) => {
    this.headers = { ...this.headers, authorization: `Bearer ${token}` };
  };

  getInitialcards() {
    return fetch(`${this.baseUrl}/cards`, {
      method: "GET",
      headers: this.headers,
    }).then(this.processResponse);
  }

  // receiving user information ---------------------------------------------->
  getUserData() {
    return fetch(`${this.baseUrl}/users/me`, {
      method: "GET",
      headers: this.headers,
    }).then(this.processResponse);
  }

  //edit profile info with PATCH method ---------------------------------------------->
  editUserData({ name, about }) {
    return fetch(`${this.baseUrl}/users/me`, {
      method: "PATCH",
      headers: this.headers,
      body: JSON.stringify({
        name: name,
        about: about,
      }),
    }).then(this.processResponse);
  }

  // edit profile avatar with PATCH method ---------------------------------------------->
  editAvatar(avatar) {
    return fetch(`${this.baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: this.headers,
      body: JSON.stringify({ avatar: avatar }),
    }).then(this.processResponse);
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
    }).then(this.processResponse);
  }

  // delete a card with DELETE method ---------------------------------------------->
  deleteCard(cardId) {
    return fetch(`${this.baseUrl}/cards/${cardId}`, {
      method: "DELETE",
      headers: this.headers,
    }).then(this.processResponse);
  }

  // method to change likes status (like and dislike)
  changeLikeCardStatus(cardId, isLiked) {
    const method = isLiked ? "DELETE" : "PUT";

    return fetch(`${this.baseUrl}/cards/likes/${cardId}`, {
      method: method,
      headers: this.headers,
    }).then(this.processResponse);
  }
}

// Instead of exporting the class itself, we export the newly created instance
const api = new Api({
  baseUrl,
  headers,
  //baseUrl: "https://around.nomoreparties.co/v1/cohort-3-en",
  // headers: {
  //   authorization: "7d6faf2c-0a1b-4234-a80e-36eb1914e77c",
  //   "Content-Type": "application/json",
  // },
});

export { api };
