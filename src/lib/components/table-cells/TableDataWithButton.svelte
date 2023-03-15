<script lang="ts">
	import { tableCellClasses } from '$lib/atoms/componentClasses';
	export let styleClass: string = '';
</script>

<td class={`pt-6 pb-8 ${styleClass} ${tableCellClasses.row}`}>
	<div class={tableCellClasses.rowWithIcon}>
		<div class="line1">
			<slot name="line1" />
		</div>
		<div class="line2">
			<slot name="line2" />
		</div>
	</div>
</td>

<style>
	.line1 {
		height: 35px;
		margin: auto;
		display: flex;
		align-items: center;
	}

	.line2 {
		height: 18px;
		display: flex;
		align-items: s;
	}
</style>
