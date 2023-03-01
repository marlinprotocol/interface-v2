<script lang="ts">
	import { buttonClasses } from '$lib/atoms/componentClasses';
	export let disabled: boolean = false;
	export let loading: boolean = false;
	export let styleClass: string = '';
	$: buttonClass = `${buttonClasses.greyFilled} ${loading ? 'loading' : ''} ${styleClass}`;
</script>

<button {disabled} class={buttonClass}>
	<slot />
</button>
