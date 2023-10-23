<script lang="ts">
	import { doNothing } from '$lib/utils/helpers/commonHelper';

	export let onclick = () => {
		doNothing();
	};
	export let styleClass = '';
	export let isActive = false;

	//reactive value based on isActive and styleClass
	$: buttonStyle = `${
		isActive ? 'bg-blue-100 text-primary font-medium' : 'bg-base-300 text-grey'
	} ${styleClass}`;
</script>

<button on:click={onclick} class="w-32 rounded-2xl py-1 text-sm hover:font-medium {buttonStyle}">
	<slot />
</button>
