export function authGood(user) {
  return {
    type: "AUTH_GOOD",
    user
  };
}

export function signup(email, password, name, surname) {
  return {
    type: "SIGNUP_REQUESTED",
    email,
    password,
    name,
    surname
  };
}

export function finishSignup() {
  return {
    type: "SIGNUP_FINISHED"
  };
}

export function login(email, password, next) {
  return {
    type: "LOGIN_REQUESTED",
    email,
    password,
    next
  };
}

export function finishLogin() {
  return {
    type: "LOGIN_FINISHED"
  };
}

export function logout() {
  return {
    type: "LOGOUT_REQUESTED"
  };
}

export function updateuser(token, _id, image) {
  return {
    type: "UPDATEUSER_REQUESTED",
    token,
    _id,
    image
  };
}

export function toLogin() {
  return {
    type: "TO_LOGIN"
  };
}
