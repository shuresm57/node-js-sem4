<script>
    import { handleResetPassword } from '../util/authService.svelte.js';
    import Footer from '../components/Footer.svelte';

    const token = new URLSearchParams(window.location.search).get('token');

    let passwordOne = $state('');
    let passwordTwo = $state('');
</script>

<svelte:head>
    <title>Reset Password | R&C Fan Club</title>
</svelte:head>

<div class="page-bg login-bg">
    <h1>Ratchet & Clank™ Fan Club</h1>
    <div class="login-div">
        <div class="form-div">
            <h2>RESET PASSWORD</h2>
            <div class="input-div">
                <input type="password" placeholder="New Password" bind:value={passwordOne} required>
                <input type="password" placeholder="Repeat Password" bind:value={passwordTwo} required>
            </div>
            <button class="button-1" type="button" onclick={() => handleResetPassword(token, passwordOne, passwordTwo)}>Reset Password</button>
        </div>
    </div>
    <Footer />
</div>
