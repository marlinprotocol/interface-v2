<script>
	export let divClass = '';
	export let ulClass = 'flex flex-wrap -mb-px gap-1 items-center justify-center';
</script>

<div class={divClass}>
	<ul class={ulClass} role="tablist">
		<slot />
	</ul>
</div>
