import { baseUrl, headers } from "./constants";

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

// FUNCTIONALITY FROM PROJECT 13 ----------------------------->
// class Api {
//   constructor({ baseUrl, headers }) {
//     this._url = baseUrl;

//     this._headers = headers;
//   }

//   _customFetch = (url, headers) => {
//     console.log(url);
//     return fetch(url, headers).then((res) =>
//       res.ok ? res.json() : Promise.reject(`Error: ${res.status}`)
//     );
//   };

//   // receiving user cards ---------------------------------------------->

//   getInitialCards() {
//     return fetch(`${this._url}/cards`, {
//       headers: this._headers,
//       // headers: {
//       //   authorization: `Bearer ${localStorage.getItem("jwt")}`,
//       // },
//     }).then((res) => this._customFetch(res));
//   }

//   // receiving user information ---------------------------------------------->

//   getUserData() {
//     return this._customFetch(`${this._url}/users/me`, {
//       headers: this._headers,
//       // headers: {
//       //   authorization: `Bearer ${localStorage.getItem("jwt")}`,
//       // },
//     }).then((res) => this._customFetch(res));
//   }

//   // When the user logs in or logs out, we update the user token in the request header
//   updatedAuthUserToken = (token) => {
//     this.headers = { ...this._headers, authorization: `Bearer ${token}` };
//   };

//   //edit profile info with PATCH method ---------------------------------------------->

//   editUserData({ name, about }) {
//     return this._customFetch(`${this._url}/users/me`, {
//       headers: this._headers,

//       method: "PATCH",

//       body: JSON.stringify({
//         name: name,

//         about: about,
//       }),
//     });
//   }

//   // adding card to server with POST method ---------------------------------------------->

//   addCard({ name, link }) {
//     return this._customFetch(`${this._url}/cards`, {
//       headers: this._headers,

//       method: "POST",

//       body: JSON.stringify({
//         name: name,

//         link: link,
//       }),
//     });
//   }

//   // delete a card with DELETE method ---------------------------------------------->

//   deleteCard(cardId) {
//     return this._customFetch(`${this._url}/cards/${cardId}`, {
//       headers: this._headers,

//       method: "DELETE",
//     });
//   }

//   // edit profile avatar with PATCH method ---------------------------------------------->

//   editAvatar(avatar) {
//     return this._customFetch(`${this._url}/users/me/avatar`, {
//       headers: this._headers,

//       method: "PATCH",

//       body: JSON.stringify({ avatar: avatar }),
//     });
//   }

//   // method to change likes status (like and dislike)

//   changeLikeCardStatus(cardId, isLiked) {
//     return isLiked
//       ? this._customFetch(`${this._url}/cards/likes/${cardId}`, {
//           headers: this._headers,

//           method: "DELETE",
//         })
//       : this._customFetch(`${this._url}/cards/likes/${cardId}`, {
//           headers: this._headers,

//           method: "PUT",
//         });
//   }
// }

// Instead of exporting the class itself, we export the newly created instance

const api = new Api({
  baseUrl: "http://localhost:3001",

  headers: {
    authorization: `Bearer ${localStorage.getItem("jwt")}`,
    "Content-Type": "application/json",
  },
});

export { api };
