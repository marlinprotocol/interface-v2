<script lang="ts">
	import Header from '$lib/page-components/header/Header.svelte';
	import '../app.css';
</script>

<main class="text-center w-full">
	<Header />
	<slot />
</main>
