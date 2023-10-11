<script lang="ts">
	import HeaderConnectWallet from '$lib/components/header/sub-components/HeaderConnectWallet.svelte';
	import HeaderLinksGroup from '$lib/components/header/sub-components/HeaderLinksGroup.svelte';
	import HeaderLogo from '$lib/components/header/sub-components/HeaderLogo.svelte';
</script>

<div
	class="sm:navbar sm:py-7 py-[32px] flex sm:justify-normal justify-between lg:px-0 sm:px-4 px-4 min-h-16 border-b border-black/[0.07]"
>
	<div class="sm:navbar-start width-full justify-start items-center flex">
		<div class="dropdown">
			<button
				class="btn btn-sm btn-ghost lg:hidden mr-2 focus:bg-base-content/10 focus:ring-2 focus:ring-offset-2 focus:ring-black"
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

			<ul class="menu menu-md dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
				<HeaderLinksGroup />
			</ul>
		</div>
		<HeaderLogo />
	</div>
	<div class="navbar-center hidden lg:flex z-10">
		<ul class="menu menu-horizontal">
			<HeaderLinksGroup />
		</ul>
	</div>
	<div class="sm:navbar-end width-auto">
		<HeaderConnectWallet />
	</div>
</div>
