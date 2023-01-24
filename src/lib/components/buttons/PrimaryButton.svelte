<script lang="ts">
	import { buttonClasses } from '../componentClasses';

	export let onclick = () => {};
	export let disabled: boolean = false;
	export let loading: boolean = false;
	export let styleClass: string = '';
	$: buttonClass = `${buttonClasses.primary} ${disabled ? 'btn-disabled' : ''} ${
		loading ? 'loading' : ''
	} ${styleClass}`;
</script>

<button on:click|preventDefault={onclick} class={buttonClass}>
	<slot />
</button>
