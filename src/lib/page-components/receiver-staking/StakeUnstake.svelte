<script lang="ts">
	const tabs = [
		{
			id: 'stake',
			name: 'Stake'
		},
		{
			id: 'un-stake',
			name: 'Un-stake'
		}
	];
	let tabSelected = 'stake';
</script>

<div class="rounded-lg w-96 bg-white h-96 p-4 my-5 mx-auto text-center">
	<div class="tabs tabs-boxed justify-center bg-white gap-2">
		{#each tabs as tab (tab.id)}
			<button
				on:click={() => (tabSelected = tab.id)}
				class={`rounded-2xl px-8 py-1 text-sm ${
					tabSelected === tab.id ? 'bg-blue-100 text-primary font-medium' : 'bg-base-200 text-grey'
				}`}
			>
				{tab.name}
			</button>
		{/each}
	</div>
</div>

<style>
</style>
