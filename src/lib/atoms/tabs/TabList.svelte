<script>
	export let divClass = '';
</script>

<div class={divClass} data-testid="tab-list">
	<ul class="-mb-px flex flex-wrap items-center justify-center gap-1" role="tablist">
		<slot />
	</ul>
</div>
