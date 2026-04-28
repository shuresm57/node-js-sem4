<script>
    import { handleLogin, handleSignup, handlePasswordRecovery } from "../../util/authService.svelte.js";
    import Footer from '../../components/Footer.svelte';

    let view = $state('login');

    let emailInput = $state('');
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
    <title>{view === 'recovery' ? 'Recover Password' : view === 'signup' ? 'Sign Up' : 'Login'}</title>
</svelte:head>

<div class="min-h-screen bg-bg flex flex-col items-center justify-center px-4">
    <h1 class="font-serif text-accent mb-8 text-8xl font-bold tracking-tight tracking-wide">BetterTour</h1>

    <div class="w-full max-w-md bg-surface border border-border rounded-2xl shadow-2xl p-8">

        {#if view === 'login'}
            <h2 class="font-serif text-accent text-2xl font-bold text-center mb-6 tracking-wide">Login</h2>
            <form class="flex flex-col gap-3" onsubmit={(e) => { e.preventDefault(); handleLogin(emailInput, passwordInput); }}>
                <input
                    class="bg-bg border border-border text-text placeholder-muted rounded-lg px-4 py-4 focus:outline-none focus:ring-2 focus:ring-primary"
                    type="email" placeholder="Email" bind:value={emailInput} required
                >
                <input
                    class="bg-bg border border-border text-text placeholder-muted rounded-lg px-4 py-4 focus:outline-none focus:ring-2 focus:ring-primary"
                    type="password" placeholder="Password" bind:value={passwordInput} required
                >
                <button
                    class="mt-2 w-full bg-primary hover:brightness-110 text-text font-bold py-2 rounded-lg transition"
                    type="submit"
                >Login</button>
            </form>
            <div class="mt-4 flex flex-col items-center gap-2 text-sm">
                <button class="text-muted hover:text-highlight transition" type="button" onclick={showSignup}>Don't have an account? Sign up</button>
                <a class="text-muted hover:text-accent transition" href="#" onclick={(e) => { e.preventDefault(); showPasswordRecovery(); }}>Forgot password?</a>
            </div>

        {:else if view === 'signup'}
            <h2 class="text-accent text-2xl font-bold text-center mb-6 tracking-wide">Sign Up</h2>
            <div class="flex flex-col gap-3">
                <input
                    class="bg-bg border border-border text-text placeholder-muted rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                    type="email" placeholder="Email" bind:value={signupEmail} required
                >
                <input
                    class="bg-bg border border-border text-text placeholder-muted rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                    type="text" placeholder="Username" bind:value={signupUsername} required
                >
                <input
                    class="bg-bg border border-border text-text placeholder-muted rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                    type="password" placeholder="Password" bind:value={signupPasswordOne} required
                >
                <input
                    class="bg-bg border border-border text-text placeholder-muted rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                    type="password" placeholder="Repeat Password" bind:value={signupPasswordTwo} required
                >
            </div>
            <button
                class="mt-5 w-full bg-primary hover:brightness-110 text-text font-bold py-2 rounded-lg transition"
                type="button" onclick={() => handleSignup(signupEmail, signupUsername, signupPasswordOne, signupPasswordTwo, showLogin)}
            >Create Account</button>
            <div class="mt-4 flex justify-center text-sm">
                <button class="text-muted hover:text-highlight transition" type="button" onclick={showLogin}>Back to Login</button>
            </div>

        {:else if view === 'recovery'}
            <h2 class="text-accent text-2xl font-bold text-center mb-6 tracking-wide">Recover Account</h2>
            <div class="flex flex-col gap-3">
                <input
                    class="bg-bg border border-border text-text placeholder-muted rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                    type="text" placeholder="Email" bind:value={signupEmail} required
                >
            </div>
            <button
                class="mt-5 w-full bg-primary hover:brightness-110 text-text font-bold py-2 rounded-lg transition"
                type="button" onclick={() => handlePasswordRecovery(signupEmail, showLogin)}
            >Send Reset Link</button>
            <div class="mt-4 flex justify-center text-sm">
                <button class="text-muted hover:text-highlight transition" type="button" onclick={showLogin}>Back to Login</button>
            </div>
        {/if}

    </div>
    <Footer />
</div>
