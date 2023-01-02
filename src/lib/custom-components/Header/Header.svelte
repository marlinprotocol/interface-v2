<script>
	import WalletAuth from '$lib/custom-components/WalletAuth/WalletAuth.svelte';

	$: navbarOpen = false;
	function toggleNavbar() {
		navbarOpen = !navbarOpen;
	}
</script>

<nav class="mx-[5%] py-6 border-b-none min-[710px]:border-b min-[710px]:border-black/10">
	<div class="flex flex-wrap items-center justify-between">
		<a href="https://www.marlin.org/" class="flex items-center">
			<img src="/images/marlin-logo.svg" alt="Marlin Logo" />
		</a>
		<div class="flex">
			<!-- hidden for mobile view -->
			<div
				class="hidden min-[710px]:flex justify-end items-center space-x-4 mr-6 font-[poppins] text-sm text-black font-semibold"
			>
				<a href="/" class="px-4 cursor-pointer">Govern</a>
				<a href="/" class="px-4 cursor-pointer">Flowmint</a>
				<a href="/" class="px-4 cursor-pointer">Relay</a>
			</div>

			<WalletAuth />
		</div>
	</div>
	<!-- nav links for mobile view -->
	<div
		class="mobile-nav-bar z-10 flex w-full min-[710px]:hidden fixed items-center justify-around space-x-2 mr-6 font-[poppins] text-sm text-black font-semibold bottom-0 left-0 bg-gray-50 border-t py-2 border-gray-200"
	>
		<a
			href="/"
			class="px-6 py-2 cursor-pointer rounded-lg bg-transparent transition-colors duration-300 hover:bg-gray-100"
			>Govern</a
		>
		<a
			href="/"
			class="px-6 py-2 cursor-pointer rounded-lg bg-transparent transition-colors duration-300 hover:bg-gray-100"
			>Flowmint</a
		>
		<a
			href="/"
			class="px-6 py-2 cursor-pointer rounded-lg bg-transparent transition-colors duration-300 hover:bg-gray-100"
			>Relay</a
		>
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
