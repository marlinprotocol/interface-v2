<script lang="ts">
	export let id: string;
	export let buttonClass = '';
	export let liClass = 'mr-2';
</script>

<li class={liClass} role="presentation" data-testid="tab">
	<button on:click class={buttonClass} id="{id}-tabhead" type="button" role="tab">
		<slot />
	</button>
</li>
