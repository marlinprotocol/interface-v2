<script>
	import WalletAuth from '../wallet-auth/WalletAuth.svelte';

	export let allowedNetworks = [];
	$: navbarOpen = false;
	function toggleNavbar() {
		navbarOpen = !navbarOpen;
	}
</script>

<nav class="mx-[5%] py-6 border-b border-black/10">
	<div class="flex flex-wrap items-center justify-between">
		<a href="https://www.marlin.org/" class="flex items-center">
			<img src="/images/marlin-logo.svg" alt="Marlin Logo" />
		</a>
		<div class="flex justify-end items-center">
			<ul class="flex items-center space-x-4 mr-6 font-[poppins] text-sm text-black font-semibold">
				<li class="px-4 cursor-pointer">Govern</li>
				<li class="px-4 cursor-pointer">Flowmint</li>
				<li class="px-4 cursor-pointer">Relay</li>
			</ul>
			<WalletAuth {allowedNetworks} />
		</div>
	</div>
</nav>

<!-- <nav class="navbar navbar-expand-lg navbar-light main-header custom-padding">
	<a class="navbar-brand" href="http://www.marlin.org">
		<img src="/images/marlin-logo.svg" alt="marlin logo" />
	</a>
	<button class="navbar-toggler" type="button" on:click={toggleNavbar}>
		<span class="navbar-toggler-icon" />
	</button>

	<div class:collapse={!navbarOpen} class="navbar-collapse justify-content-end">
		<ul class="navbar-nav ml-auto justify-content-end">
			<li class="nav-item">
				<a class="nav-link font-size-14" href="https://app.marlin.org/relay/operator">Operators</a>
			</li>
			<li class="nav-item">
				<a class="nav-link font-size-14" href="https://app.marlin.org/relay/operator/register"
					>Register</a
				>
			</li>
			<li class="nav-item">
				<a class="nav-link font-size-14" href="https://app.marlin.org/relay/stash">Delegate</a>
			</li>
		</ul>
		<WalletAuth allowedNetworks={allowedNetworks}/>
	</div>
</nav> -->
