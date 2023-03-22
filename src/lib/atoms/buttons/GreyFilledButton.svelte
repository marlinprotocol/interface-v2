<script lang="ts">
	import { buttonClasses } from '$lib/atoms/componentClasses';
	export let disabled = false;
	export let loading = false;
	export let styleClass = '';
	$: buttonClass = `${buttonClasses.greyFilled} ${loading ? 'loading' : ''} ${styleClass}`;
</script>

<button {disabled} class={buttonClass}>
	<slot />
</button>
