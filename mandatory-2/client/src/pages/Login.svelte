<script>
    import { handleLogin, handleSignup, handlePasswordRecovery } from "../util/authService.svelte.js";

    let view = $state('login');

    let usernameInput = $state('');
    let passwordInput = $state('');

    let signupUsername = $state('');
    let signupPasswordOne = $state('');
    let signupPasswordTwo = $state('');
    let signupEmail = $state('');

    function showSignup() { view = 'signup'; }
    function showLogin() { view = 'login'; }
    function showPasswordRecovery() { view = 'recovery'; }
    
</script>
<svelte:head>
    <title>{view === 'recovery' ? 'Recover Password' : view === 'signup' ? 'Sign Up' : 'Login'} | R&C Fan Club</title>
</svelte:head>
<div class="page-bg login-bg">
<h1>Ratchet & Clank™ Fan Club</h1>
{#if view === 'login'}
<div class="login-wrapper">
     <div class="login-div">
        <div class="form-div">
            <h2>LOGIN</h2>
            <div class="input-div">
                <input type="text" placeholder="Username" bind:value={usernameInput} required>
                <input type="password" placeholder="Password" bind:value={passwordInput} required>
            </div>
            <button class="button-1" type="button" onclick={() => handleLogin(usernameInput, passwordInput)}>Login</button>
            <div>
                <button class="button-2" type="button" onclick={showSignup}>Sign up</button><br>
            </div>
            <a href="#" onclick={(e) => { e.preventDefault(); showPasswordRecovery(); }}>Forgot password?</a>
        </div>
    </div>
</div>

{:else if view === 'signup'}
<div class="signup-wrapper">
    <div class="signup-div">
        <div class="form-div">
            <h2>SIGN UP</h2>
            <div class="input-div">
                <input type="email" placeholder="Email" bind:value={signupEmail} required>
                <input type="text" placeholder="Username" bind:value={signupUsername} required>
                <input type="password" placeholder="Password" bind:value={signupPasswordOne} required>
                <input type="password" placeholder="Repeat Password" bind:value={signupPasswordTwo} required>
            </div>
            <button class="button-1" type="button" onclick={() => handleSignup(signupEmail, signupUsername, signupPasswordOne, signupPasswordTwo, showLogin)}>Create Account</button>
            <div>
                <button class="button-2" type="button" onclick={showLogin}>Back to Login</button>
            </div>
        </div>
    </div>
</div>

{:else if view === 'recovery'}
<div class="signup-wrapper">
    <div class="signup-div">
        <div class="form-div">
            <h2>RECOVER ACCOUNT</h2>
            <div class="input-div">
                <input type="text" placeholder="Email" bind:value={signupEmail} required>
            </div>
            <button class="button-1" type="button" onclick={() => handlePasswordRecovery(signupEmail, showLogin)}>Send reset link </button>
            <div>
                <button class="button-2" type="button" onclick={showLogin}>Back to Login</button>
            </div>
        </div>
    </div>
</div>
{/if}
<footer>
    Ratchet & Clank is a registered trademark of Sony Interactive Entertainment LLC. 
    This is an unofficial fan site and is not affiliated with or endorsed by Sony Interactive Entertainment.
</footer>
</div>
