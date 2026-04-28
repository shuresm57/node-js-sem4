# Utility Files

## fetchUtil.js

By creating universal utilitarian fetch metods for GET and POST, we can reuse them across the client application, to reduce the amount of boilerplate code, and also reduce the amount of potential error, since we have a single source of truth.

In the future, I should make sure the catch block returns a boolean, to eradicate the need for `response?.ok` syntax, since it can potentially return a undefined which will then throw a TypeError, causing the call to crash.

Email validity regex nicked from this question on [stackoverflow](https://stackoverflow.com/questions/46155/how-can-i-validate-an-email-address-in-javascript).

## authService.svelte.js

This file holds all service methods for calling the API Server, using the fetch methods for GET and POST in [fetchUtil.js](fetchUtil.js). Whenever a fetch is throwing an error or succeeds, a toast alert message pops up with a relevant message.