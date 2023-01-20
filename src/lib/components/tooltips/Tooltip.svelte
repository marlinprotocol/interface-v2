<script lang="ts">
	import { buttonClasses } from '../componentClasses';

	export let tooltipText: string;
	export let styleClass: string = '';
	export let iconSrc: string = './images/infoSecondary.svg';
	export let iconWidth: number = 15;

	$: tooltipClass = `${buttonClasses.icon} ${styleClass}`;
</script>

<div class="tooltip" data-tip={'Fix style: ' + tooltipText}>
	<button class={tooltipClass}>
		<img src={iconSrc} alt="Tooltip" width={iconWidth} />
	</button>
</div>
