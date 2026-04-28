import { toast } from 'svelte-sonner';
import { fetchPost, fetchGet } from './fetchUtil.js';
import { userStore } from '../stores/userStore.svelte.js';

export async function handleSignup (email, username, passwordOne, passwordTwo, onSuccess) {
  if (!passwordMatchChecker(passwordOne, passwordTwo)) {
    return;
  }
  if (!emailValidityChecker(email)) {
    return;
  }

  const [userAvailable, emailAvailable] = await Promise.all([
    checkIfUserExists(username),
    checkIfEmailExists(email)
  ]);

  if (!userAvailable) {
    toast.error('Username already taken.');
    return;
  }
  if (!emailAvailable) {
    toast.error('Email already in use.');
    return;
  }

  const response = await fetchPost('/api/register', {
    email,
    username,
    password: passwordOne
  });

  if (!response) {
    toast.error('Error signing up. Try again later.');
    return;
  }

  const message = await response.text();
  if (response.ok) {
    toast.success('User created successfully!');
    onSuccess();
  } else {
    toast.error('Error signing up. Try again later.');
  }
}

export async function handleLogin (email, password) {
  const response = await fetchPost('/api/login', { email, password });
  if (!response) {
    toast.error('Error logging in. Try again later.');
    return;
  }
  const message = await response.text();
  if (response.ok) {
    userStore.user = { email };
    toast.success(message);
    window.location.href = '/home';
  } else {
    toast.error(message);
  }
}

export async function handleLogout () {
  const response = await fetchPost('/api/logout', {});
  if (response?.ok) {
    userStore.user = null;
    window.location.href = '/';
  } else {
    toast.error('Logout failed. Try again.');
  }
}

export async function handlePasswordRecovery (email, onSuccess) {
  const emailAvailable = await checkIfEmailExists(email);
  if (emailAvailable) {
    toast.error('No user with that email was found.');
    return;
  }
  const response = await fetchPost('/api/request-reset', { email });

  if (!response) {
    toast.error('An error has occured. Please try again later.');
    return;
  }
  if (response.ok) {
    toast.success('Reset link sent.');
    onSuccess();
  }
}

export async function handleResetPassword (token, passwordOne, passwordTwo) {
  if (!passwordMatchChecker(passwordOne, passwordTwo)) {
    return;
  }
  const response = await fetchPost('/api/reset-password', { token, newPassword: passwordOne });
  if (!response) {
    toast.error('An error has occurred. Please try again later.');
    return;
  }
  const message = await response.text();
  if (response.ok) {
    toast.success(message);
    window.location.href = '/';
  } else {
    toast.error(message);
  }
}

//= ===================
// HELPER FUNCTIONS ||
//= ===================

function passwordMatchChecker (passwordOne, passwordTwo) {
  if (passwordOne !== passwordTwo) {
    toast.error('Passwords must match.');
    return false;
  }
  return true;
}

function emailValidityChecker (email) {
  const isValid = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i.test(email);
  if (!isValid) {
    toast.error('Email is invalid.');
    return false;
  }
  return true;
}

async function checkIfUserExists (username) {
  const response = await fetchGet(`/api/users/${username}`);
  if (response?.status === 200) {
    return false;
  }
  return true;
}

async function checkIfEmailExists (email) {
  const response = await fetchGet(`/api/emails/${email}`);
  if (response?.status === 200) {
    return false;
  }
  return true;
}
