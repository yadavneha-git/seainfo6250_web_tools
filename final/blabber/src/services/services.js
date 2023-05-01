//Check for session
export function fetchSession() {
  return fetch('/api/v1/session', {
    method: 'GET'
  })
    .catch(() => Promise.reject({ error: 'networkError' }))
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      return response.json()
        .catch(error => Promise.reject({ error }))
        .then(err => Promise.reject(err));
    });
}

//Fetch for login
export function fetchLogin(username) {
  return fetch('/api/v1/session', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username }),
  })
    .catch(() => Promise.reject({ error: 'networkError' }))
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      return response.json()
        .catch(error => Promise.reject({ error }))
        .then(err => Promise.reject(err));
    });
}

//logout
export function fetchLogout() {
  return fetch('/api/v1/session', {
    method: 'DELETE'
  })
    .catch(() => Promise.reject({ error: 'networkError' }))
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      return response.json()
        .catch(error => Promise.reject({ error }))
        .then(err => Promise.reject(err));
    });
}

// Fetch user home page feed
export function fetchFeed() {
  return fetch('/api/v1/feeds', {
    method: 'GET'
  })
    .catch(() => Promise.reject({ error: 'networkError' }))
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      return response.json()
        .catch(error => Promise.reject({ error }))
        .then(err => Promise.reject(err));
    });
}

//fetch search
export function fetchSearchUser(searchText) {
  return fetch(`/api/v1/users/?contains=${searchText}`, {
    method: 'GET',
  })
    .catch(() => Promise.reject({ error: 'networkError' }))
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      return response.json()
        .catch(error => Promise.reject({ error }))
        .then(err => Promise.reject(err));
    })
}

//fetch for add followee
export function fetchAddFollowee(followee) {
  return fetch('/api/v1/followees', {
    method: 'POST',
    headers: new Headers({
      'Content-Type': 'application/json',
    }),
    body: JSON.stringify({ followee }),
  })
    .catch(() => Promise.reject({ error: 'networkError' }))
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      return response.json()
        .catch(error => Promise.reject({ error }))
        .then(err => Promise.reject(err));
    })
}

// fetch followees
export function fetchFollowees() {
  return fetch('/api/v1/followees', {
    method: 'GET'
  })
    .catch(() => Promise.reject({ error: 'networkError' }))
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      return response.json()
        .catch(error => Promise.reject({ error }))
        .then(err => Promise.reject(err));
    });
}

//fetch for delete followee
export function fetchDeleteFollowee(id) {
  return fetch(`/api/v1/followees/${id}`, {
    method: 'DELETE',
  })
    .catch(() => Promise.reject({ error: 'networkError' }))
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      return response.json()
        .catch(error => Promise.reject({ error }))
        .then(err => Promise.reject(err));
    })
}

//fetch for follower
export function fetchAddFollower(followee) {
  return fetch('/api/v1/followers', {
    method: 'POST',
    headers: new Headers({
      'Content-Type': 'application/json',
    }),
    body: JSON.stringify({ followee }),
  })
    .catch(() => Promise.reject({ error: 'networkError' }))
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      return response.json()
        .catch(error => Promise.reject({ error }))
        .then(err => Promise.reject(err));
    })
    .catch(error => Promise.reject({ error }));
}

//fetch for delete follower
export function fetchDeleteFollower(followee) {
  return fetch(`/api/v1/followers/${followee}`, {
    method: 'DELETE',
  })
    .catch(() => Promise.reject({ error: 'networkError' }))
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      return response.json()
        .catch(error => Promise.reject({ error }))
        .then(err => Promise.reject(err));
    })
}

//fetch for add Post
export function fetchAddPost(post) {
  return fetch('/api/v1/posts', {
    method: 'POST',
    headers: new Headers({
      'Content-Type': 'application/json',
    }),
    body: JSON.stringify({ post }),
  })
    .catch(() => Promise.reject({ error: 'networkError' }))
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      return response.json()
        .catch(error => Promise.reject({ error }))
        .then(err => Promise.reject(err));
    });
}

export function fetchDeletePost(id) {
  return fetch(`/api/v1/posts/${id}`, {
    method: 'DELETE',
  })
    .catch(() => Promise.reject({ error: 'networkError' }))
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      return response.json()
        .catch(error => Promise.reject({ error }))
        .then(err => Promise.reject(err));
    })
}

//fetch feed for user profile
export function fetchProfileFeed() {
  return fetch('/api/v1/profileFeeds', {
    method: 'GET',
  })
    .catch(() => Promise.reject({ error: 'networkError' }))
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      return response.json()
        .catch(error => Promise.reject({ error }))
        .then(err => Promise.reject(err));
    });
}

// fetch for add reply
export function fetchAddReply(postId, username, reply) {
  return fetch('/api/v1/replies', {
    method: 'POST',
    headers: new Headers({
      'Content-Type': 'application/json',
    }),
    body: JSON.stringify({ postId, username, reply }),
  })
    .catch(() => Promise.reject({ error: 'networkError' }))
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      return response.json()
        .catch(error => Promise.reject({ error }))
        .then(err => Promise.reject(err));
    });
}
