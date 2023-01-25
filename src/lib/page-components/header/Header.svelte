<script lang="ts">
	import Divider from '$lib/components/divider/Divider.svelte';
	import HeaderConnectWallet from './sub-components/HeaderConnectWallet.svelte';
	import HeaderLinksGroup from './sub-components/HeaderLinksGroup.svelte';
	import HeaderLogo from './sub-components/HeaderLogo.svelte';

	//styles for header component
	const styles = {
		wrapper: 'text-center py-5 header flex gap-2 justify-between flex-wrap',
		rightItems: 'flex gap-10 items-center'
	};
</script>

<div>
	<header class={styles.wrapper}>
		<HeaderLogo />
		<div class={styles.rightItems}>
			<HeaderLinksGroup />
			<HeaderConnectWallet />
		</div>
	</header>
	<Divider margin="my-0" height="h-1" />
</div>

<style>
	.header {
		width: 90%;
		margin: 0 auto;
		border-color: 'grey-600';
	}
</style>
