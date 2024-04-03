<script lang="ts">
	import Pagination from '$lib/components/v2/pagination/Pagination.svelte';
	import MarlinHubDashboard from '$lib/page-components/v2/dashboard/MarlinHubDashboard.svelte';
	let currentPage = 2;
</script>

<MarlinHubDashboard />

<Pagination
	activePage={currentPage}
	handlePageChange={(page) => {
		currentPage = page;
	}}
	pageCount={10}
/>
