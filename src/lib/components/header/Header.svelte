<script lang="ts">
	import HeaderConnectWallet from './sub-components/HeaderConnectWallet.svelte';
	import HeaderLinksGroup from './sub-components/HeaderLinksGroup.svelte';
	import HeaderLogo from './sub-components/HeaderLogo.svelte';

	//styles for header component
	const styles = {
		desktopWrapper:
			'text-center py-[1.8rem] header flex gap-2 justify-between flex-wrap items-center',
		mobileWrapper:
			'text-center py-[1.8rem] header flex gap-2 justify-between flex-wrap items-center',
		rightItems: 'flex gap-10 items-center'
	};
</script>

<div>
	<header class={`header-desktop ${styles.desktopWrapper}`}>
		<HeaderLogo />
		<div class={styles.rightItems}>
			<HeaderLinksGroup />
			<HeaderConnectWallet />
		</div>
	</header>
</div>

<style>
	.header-desktop {
		border-color: 'grey-600';
		border-bottom: 1px solid rgba(0, 0, 0, 0.07);
	}
</style>
