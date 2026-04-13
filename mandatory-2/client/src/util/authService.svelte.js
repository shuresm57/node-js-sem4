import { toast } from 'svelte-sonner';
import { fetchPost, fetchGet } from "./fetchUtil"

export async function handleLogin(username, password) {
    const response = await fetchPost('/api/login', {
        username,
        password
    });
    if (!response) {
        toast.error('Error logging in. Try again later.');
        return;
    }
    const message = await response.text();
    if (response.ok) {
        toast.success(message);
        const check = await fetchGet('/api/home');
        if (check.ok) {
            window.location.href = '/home';
        }
    } else {
        toast.error(message);
    }
}

export async function handleSignup(email, username, passwordOne, passwordTwo, onSuccess) {
    if (passwordOne !== passwordTwo) {
        toast.error('Passwords must match.');
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
        console.log(message)
    }
}

export async function handlePasswordRecovery(email) {

}