<script lang="ts">
	import StakeUnstake from '$lib/page-components/receiver-staking/StakeUnstake.svelte';
	import Test from '$lib/page-components/receiver-staking/Test.svelte';
	import type { LayoutData, PageData } from './$types';
	// import { page } from '$app/stores';

	export let data: PageData;
	// we can access `data.contract` because it's returned from
	// the parent layout `load` function
	$: contractDetails = data.contract;
</script>

<div class="py-10">
	<Test />
	<StakeUnstake />
	<pre>{JSON.stringify(contractDetails)}</pre>
</div>
