<script>
	import Bridge from '$lib/bridge/Bridge.svelte';
	import Header from '../lib/header/Header.svelte';
	import NewJob from '../lib/jobs/NewJob.svelte';
</script>

<svelte:head>
	<link
		href="https://fonts.googleapis.com/css2?family=Poppins:wght@100;200;300;400;500;600;700;800;900&display=swap"
		rel="stylesheet"
	/>
</svelte:head>

<div id="svelte" class="flex flex-col bg-bg-light min-h-screen">
	<Header />
	<!-- <NewJob /> -->
	<Bridge />
</div>
