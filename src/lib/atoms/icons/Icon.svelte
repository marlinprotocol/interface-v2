<script lang="ts">
	import Icon from 'svelte-awesome/components/Icon.svelte';

	export let data: any;
	export let size = 16;
	export let padding = 1.5;
	export let flip: 'horizontal' | 'vertical' | undefined = undefined;
	export let spin = false;
	export let border = false;
	export let iconColorClass = 'icon-info';

	export let styleClass = '';

	$: baseClass = `width:${size}px; height:${size}px; cursor:pointer;`;
	$: style = `${baseClass} ${
		border ? 'border: 1px solid; border-radius: 20px; padding:' + padding + 'px' : ''
	} ${styleClass}`;
</script>

<Icon {data} {flip} {spin} {style} class={iconColorClass} data-testid="icon" />
