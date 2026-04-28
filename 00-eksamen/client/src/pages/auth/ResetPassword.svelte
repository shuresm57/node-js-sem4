<script>
    import { handleResetPassword } from '../../util/authService.svelte.js';
    import Footer from '../../components/Footer.svelte';

    const token = new URLSearchParams(window.location.search).get('token');

    let passwordOne = $state('');
    let passwordTwo = $state('');
</script>

<svelte:head>
    <title>Reset Password</title>
</svelte:head>

<div>
<div>
        <div>
            <h2>RESET PASSWORD</h2>
            <div>
                <input type="password" placeholder="New Password" bind:value={passwordOne} required>
                <input type="password" placeholder="Repeat Password" bind:value={passwordTwo} required>
            </div>
            <button type="button" onclick={() => handleResetPassword(token, passwordOne, passwordTwo)}>Reset Password</button>
        </div>
    </div>
    <Footer />
</div>
