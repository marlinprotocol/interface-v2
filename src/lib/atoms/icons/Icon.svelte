<script lang="ts">
	import Icon from 'svelte-awesome';

	export let data: any;
	export let size: number = 16;
	export let padding: number = 1.5;
	export let flip: 'horizontal' | 'vertical' | undefined = undefined;
	export let spin: boolean = false;
	export let border: boolean = false;
	export let iconColorClass: string = 'icon-info';

	export let styleClass: string = '';

	$: baseClass = `width:${size}px; height:${size}px; cursor:pointer;`;
	$: style = `${baseClass} ${
		border ? 'border: 1px solid; border-radius: 20px; padding:' + padding + 'px' : ''
	} ${styleClass}`;
</script>

<Icon {data} {flip} {spin} {style} class={iconColorClass} />
