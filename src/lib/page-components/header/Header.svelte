<script>
	import HeaderConnectWallet from './sub-components/HeaderConnectWallet.svelte';
	import HeaderLinksGroup from './sub-components/HeaderLinksGroup.svelte';
	import HeaderLogo from './sub-components/HeaderLogo.svelte';

	//styles for header component
	const styles = {
		wrapper: 'border-b-2 text-center py-5 header flex gap-2 justify-between flex-wrap',
		rightItems: 'flex gap-10 items-center'
	};
</script>

<header class={styles.wrapper}>
	<HeaderLogo />
	<div class={styles.rightItems}>
		<HeaderLinksGroup />
		<HeaderConnectWallet />
	</div>
</header>

<style>
	.header {
		width: 90%;
		margin: 0 auto;
		border-color: 'grey-600';
	}
</style>
