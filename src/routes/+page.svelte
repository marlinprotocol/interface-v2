<script lang="ts">
	import Footer from '$lib/components/footer/Footer.svelte';
	import Header from '$lib/components/header/Header.svelte';
	import StakeUnstake from '$lib/page-components/receiver-staking/StakeUnstake.svelte';
	import Test from '$lib/page-components/receiver-staking/Test.svelte';
</script>

<main>
	<Header />
	<div class="text-center w-full">
		<Test />
		<StakeUnstake />
	</div>
	<Footer />
</main>

<style>
	main {
		text-align: center;
		margin: 0 auto;
	}
</style>
