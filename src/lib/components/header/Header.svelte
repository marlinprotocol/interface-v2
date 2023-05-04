<script lang="ts">
	import HeaderConnectWallet from './sub-components/HeaderConnectWallet.svelte';
	import HeaderLinksGroup from './sub-components/HeaderLinksGroup.svelte';
	import HeaderLogo from './sub-components/HeaderLogo.svelte';

	//styles for header component
	const styles = {
		wrapper: 'header gap-2 text-center py-[1.8rem] ',
		desktopWrapper: 'text-center flex gap-2 justify-between items-center w-full grow',
		mobileWrapper: 'text-center flex gap-2 justify-between items-center',
		rightItems: 'flex gap-10 items-center'
	};
</script>

<div>
	<header class={`header-desktop ${styles.wrapper}`}>
		<div class={`${styles.desktopWrapper}`}>
			<HeaderLogo />
			<div class={styles.rightItems}>
				<div class="hidden md:block">
					<HeaderLinksGroup />
				</div>
				<HeaderConnectWallet />
			</div>
		</div>
		<div class="md:hidden text-center w-full mt-6">
			<HeaderLinksGroup />
		</div>
	</header>
</div>

<style>
	.header-desktop {
		border-color: 'grey-600';
		border-bottom: 1px solid rgba(0, 0, 0, 0.07);
	}
</style>
