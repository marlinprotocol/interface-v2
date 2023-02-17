<script lang="ts">
	import Divider from '$lib/atoms/divider/Divider.svelte';
	import HeaderConnectWallet from '$lib/page-components/header/sub-components/HeaderConnectWallet.svelte';
	import HeaderLinksGroup from '$lib/page-components/header/sub-components/HeaderLinksGroup.svelte';
	import HeaderLogo from '$lib/page-components/header/sub-components/HeaderLogo.svelte';

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
</div>

<style>
	.header {
		width: 90%;
		margin: 0 auto;
		border-color: 'grey-600';
		border-bottom: 1px solid rgba(0, 0, 0, 0.07);
	}
</style>
