export async function fetchGet (endpoint) {
  try {
    const response = await fetch(`${import.meta.env.VITE_BASE_URL}${endpoint}`, {
      credentials: 'include'
    });
    return await response.json();
  } catch (error) {
    console.log(error);
  } // TODO create a user friendly TOAST error message and a developer API friendly error message
}

export async function fetchPost (endpoint, body) {
  try {
    const response = await fetch(`${import.meta.env.VITE_BASE_URL}${endpoint}`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    });
    return await response.json();
  } catch (error) {
    console.log(error);
  }
}
