<script lang="ts">
	import Header from '$lib/page-components/header/Header.svelte';
	import StakeUnstake from '$lib/page-components/receiver-staking/StakeUnstake.svelte';
	import Test from '$lib/page-components/receiver-staking/Test.svelte';
</script>

<main>
	<Header />
	<div class="text-center w-full">
		<Test />
		<StakeUnstake />
	</div>
</main>

<style>
	main {
		text-align: center;
		margin: 0 auto;
	}
</style>
