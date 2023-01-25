<script lang="ts">
	import { buttonClasses } from '../componentClasses';
	export let onclick = () => {};
	export let disabled: boolean = false;
	export let loading: boolean = false;
	export let styleClass: string = '';
	$: buttonClass = `${buttonClasses.filled} ${loading ? 'loading' : ''} ${styleClass}`;
</script>

<button {disabled} on:click|preventDefault={onclick} class={buttonClass}>
	<slot />
</button>
