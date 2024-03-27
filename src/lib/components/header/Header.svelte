<script lang="ts">
	import { page } from '$app/stores';
	import HeaderConnectWallet from '$lib/components/header/sub-components/HeaderConnectWallet.svelte';
	import HeaderLinksGroup from '$lib/components/header/sub-components/HeaderLinksGroup.svelte';
	import HeaderLogo from '$lib/components/header/sub-components/HeaderLogo.svelte';
</script>

<div
	class="min-h-16 flex justify-between border-b border-black/[0.07] px-4 py-[32px] sm:navbar sm:justify-normal sm:px-4 sm:py-7 lg:px-0"
	id="v1-header"
>
	<div class="width-full flex items-center justify-start sm:navbar-start">
		<div class="dropdown">
			<button
				class="btn btn-ghost btn-sm mr-2 focus:bg-base-content/10 focus:ring-2 focus:ring-black focus:ring-offset-2 lg:hidden"
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					class="h-5 w-5"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
					><path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M4 6h16M4 12h16M4 18h16"
					/></svg
				>
			</button>

			<ul class="menu dropdown-content rounded-box menu-md z-[1] mt-3 w-52 bg-base-100 p-2 shadow">
				<HeaderLinksGroup activeLink={$page.url.pathname} />
			</ul>
		</div>
		<HeaderLogo />
	</div>
	<div class="navbar-center z-10 hidden lg:flex">
		<ul class="menu menu-horizontal">
			<HeaderLinksGroup activeLink={$page.url.pathname} />
		</ul>
	</div>
	<div class="width-auto sm:navbar-end">
		<HeaderConnectWallet />
	</div>
</div>
