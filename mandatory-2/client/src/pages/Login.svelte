<script>
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

    function handleSignup() {
        if (signupPasswordOne !== signupPasswordTwo) {
            passwordAlert = 'Passwords do not match';
            return;
        }
        passwordAlert = '';
        // TODO: POST to /register
    }

    function handleLogin() {
        // TODO: POST to /login
    }
</script>

{#if !showingSignup}
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
                <a href="#">Forgot password?</a><br>
            </div>
        </div>
    </div>
{:else}
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
{/if}
