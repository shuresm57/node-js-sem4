<script>
    import { toast } from 'svelte-sonner';
    import { fetchPost, fetchGet } from "../util/fetchUtil";

    let showingSignup = $state(false);
    let passwordAlert = $state('');

    let usernameInput = $state('');
    let passwordInput = $state('');
    let signupUsername = $state('');
    let signupPasswordOne = $state('');
    let signupPasswordTwo = $state('');

    function showSignup() {
        showingSignup = true;
    }

    function showLogin() {
        showingSignup = false;
        passwordAlert = '';
    }

    async function handleSignup() {
        if (signupPasswordOne !== signupPasswordTwo) {
            toast.error('Passwords must match');
            return;
        }
        passwordAlert = '';
        const response = await fetchPost('/api/register', {
            username: signupUsername,
            password: signupPasswordOne
        });
        if (!response) {
            toast.error('Could not reach server');
            return;
        }
        const message = await response.text();
        if (response.ok) {
            toast.success(message);
            showLogin();
        } else {
            toast.error(message);
        }
    }

    async function handleLogin() {
        const response = await fetchPost('/api/login', {
            username: usernameInput,
            password: passwordInput
        });
        if (!response) {
            toast.error('Could not reach server');
            return;
        }
        const message = await response.text();
        if (response.ok) {
            toast.success(message);
        } else {
            toast.error(message);
        }
    }
</script>

{#if !showingSignup}
<div class="login-wrapper">
     <div class="login-div">
        <div class="form-div">
            <h2>LOGIN</h2>
            <div class="input-div">
                <input type="text" placeholder="Username" bind:value={usernameInput} required>
                <input type="password" placeholder="Password" bind:value={passwordInput} required>
            </div>
            <button class="button-1" type="button" onclick={handleLogin}>Login</button>
            <div>
                <button class="button-2" type="button" onclick={showSignup}>Create Account</button><br>
            </div>
        </div>
    </div>
</div>
   
{:else}
<div class="signup-wrapper">
    <div class="signup-div">
        <div class="form-div">
            <h2>SIGN UP</h2>
            <div class="input-div">
                <input type="text" placeholder="Username" bind:value={signupUsername} required>
                <input type="password" placeholder="Password" bind:value={signupPasswordOne} required>
                <input type="password" placeholder="Repeat Password" bind:value={signupPasswordTwo} required>
                <p id="password-alert">{passwordAlert}</p>
            </div>
            <button class="button-1" type="button" onclick={handleSignup}>Sign Up</button>
            <div>
                <button class="button-2" type="button" onclick={showLogin}>Back to Login</button>
            </div>
        </div>
    </div>
</div>
{/if}

<style>
    :global(body) {
    background: url("/login-background.png") no-repeat center center !important;
    background-size: cover !important;
    min-height: 100vh;
    overflow: hidden;
    }
</style>