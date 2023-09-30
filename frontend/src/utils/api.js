import { baseUrl, headers } from "./constants";

class Api {
  constructor({ baseUrl, headers }) {
    this._url = baseUrl;
    this._headers = headers;
  }

  _customFetch = (url, headers) => {
    return fetch(url, headers).then((res) =>
      res.ok ? res.json() : Promise.reject(`Error: ${res.status}`)
    );
  };

  // When the user logs in or logs out, we update the user token in the request header
  updatedAuthUserToken = (token) => {
    this.headers = { ...this.headers, authorization: `Bearer ${token}` };
  };

  // receiving user cards ---------------------------------------------->
  getInitialCards() {
    return this._customFetch(`${this._url}/cards`, {
      headers: this._headers,
    });
  }

  // receiving user information ---------------------------------------------->
  getUserData() {
    return this._customFetch(`${this._url}/users/me`, {
      headers: this._headers,
    });
  }

  //edit profile info with PATCH method ---------------------------------------------->
  editUserData({ name, about }) {
    return this._customFetch(`${this._url}/users/me`, {
      headers: this._headers,
      method: "PATCH",
      body: JSON.stringify({
        name: name,
        about: about,
      }),
    });
  }

  // adding card to server with POST method ---------------------------------------------->
  addCard({ name, link }) {
    return this._customFetch(`${this._url}/cards`, {
      headers: this._headers,
      method: "POST",
      body: JSON.stringify({
        name: name,
        link: link,
      }),
    });
  }

  // delete a card with DELETE method ---------------------------------------------->
  deleteCard(cardId) {
    return this._customFetch(`${this._url}/cards/${cardId}`, {
      headers: this._headers,
      method: "DELETE",
    });
  }

  // edit profile avatar with PATCH method ---------------------------------------------->
  editAvatar(avatar) {
    return this._customFetch(`${this._url}/users/me/avatar`, {
      headers: this._headers,
      method: "PATCH",
      body: JSON.stringify({ avatar: avatar }),
    });
  }

  // method to change likes status (like and dislike)
  changeLikeCardStatus(cardId, isLiked) {
    return isLiked
      ? this._customFetch(`${this._url}/cards/likes/${cardId}`, {
          headers: this._headers,
          method: "DELETE",
        })
      : this._customFetch(`${this._url}/cards/likes/${cardId}`, {
          headers: this._headers,
          method: "PUT",
        });
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
