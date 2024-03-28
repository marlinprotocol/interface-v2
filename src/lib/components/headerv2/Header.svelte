<script lang="ts">
	import { page } from '$app/stores';
	import HeaderConnectWallet from '$lib/components/headerv2/sub-components/HeaderConnectWallet.svelte';
	import HeaderLinksGroup from '$lib/components/headerv2/sub-components/HeaderLinksGroup.svelte';
	import HeaderLogo from '$lib/components/headerv2/sub-components/HeaderLogo.svelte';
</script>

<div>
	<div class="nav-bg top-0 flex h-20 w-full items-center justify-end">
		<div class="pr-4">
			<HeaderConnectWallet />
		</div>
	</div>

	<div class="nav-bg fixed left-0 z-10 h-screen w-72"></div>
</div>
