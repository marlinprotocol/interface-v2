<script lang="ts">
	import type { TooltipPlacement } from '$lib/types/v2/componentTypes';
	export let placement: TooltipPlacement = 'top';
</script>

<div class="custom-tooltip">
	<slot name="tooltipIcon" />
	<div class={placement}>
		<slot name="tooltipContent" />
		<i></i>
	</div>
</div>

<style>
	.custom-tooltip {
		display: inline-block;
		position: relative;
		text-align: left;
		cursor: pointer;
	}

	.custom-tooltip .top {
		position: absolute;
		min-width: 320px;
		max-width: 320px;
		top: -20px;
		left: 50%;
		transform: translate(-30%, -100%);
		background-color: #ffffff;
		border-radius: 12px;
		z-index: 99999999;
		box-sizing: border-box;
		display: none;
		box-shadow: 0px 12px 16px -4px #10182814;
	}

	.custom-tooltip:hover .top {
		display: block;
	}

	.custom-tooltip .top i {
		position: absolute;
		top: 100%;
		left: 30%;
		margin-left: -15px;
		width: 30px;
		height: 15px;
		overflow: hidden;
	}

	.custom-tooltip .top i::after {
		content: '';
		position: absolute;
		width: 15px;
		height: 15px;
		left: 50%;
		transform: translate(-50%, -50%) rotate(45deg);
		background-color: #ffffff;
		box-shadow: 0px 12px 16px -4px #10182814;
	}

	.custom-tooltip .bottom {
		min-width: 200px;
		top: 40px;
		left: 50%;
		transform: translate(-50%, 0);
		background-color: #ffffff;
		border-radius: 12px;
		position: absolute;
		z-index: 99999999;
		box-sizing: border-box;
		box-shadow: 0px 12px 16px -4px #10182814;
		display: none;
	}

	.custom-tooltip:hover .bottom {
		display: block;
	}

	.custom-tooltip .bottom i {
		position: absolute;
		bottom: 100%;
		left: 50%;
		margin-left: -12px;
		width: 24px;
		height: 12px;
		overflow: hidden;
	}

	.custom-tooltip .bottom i::after {
		content: '';
		position: absolute;
		width: 12px;
		height: 12px;
		left: 50%;
		transform: translate(-50%, 50%) rotate(45deg);
		background-color: #ffffff;
		box-shadow: 0px 12px 16px -4px #10182814;
	}

	.custom-tooltip .right {
		min-width: 200px;
		max-width: 400px;
		top: 50%;
		left: 100%;
		margin-left: 20px;
		transform: translate(0, -50%);
		background-color: #ffffff;
		border-radius: 12px;
		position: absolute;
		z-index: 99999999;
		box-sizing: border-box;
		box-shadow: 0px 12px 16px -4px #10182814;
		visibility: hidden;
		opacity: 0;
	}

	.custom-tooltip:hover .right {
		visibility: visible;
		opacity: 1;
	}

	.custom-tooltip .right i {
		position: absolute;
		top: 50%;
		right: 100%;
		margin-top: -12px;
		width: 12px;
		height: 24px;
		overflow: hidden;
	}
	.custom-tooltip .right i::after {
		content: '';
		position: absolute;
		width: 12px;
		height: 12px;
		left: 0;
		top: 50%;
		transform: translate(50%, -50%) rotate(-45deg);
		background-color: #ffffff;
		box-shadow: 0px 12px 16px -4px #10182814;
	}

	.custom-tooltip .left {
		min-width: 200px;
		max-width: 400px;
		top: 50%;
		right: 100%;
		margin-right: 20px;
		transform: translate(0, -50%);
		background-color: #ffffff;
		border-radius: 12px;
		position: absolute;
		z-index: 99999999;
		box-sizing: border-box;
		display: none;
	}

	.custom-tooltip:hover .left {
		display: block;
	}

	.custom-tooltip .left i {
		position: absolute;
		top: 50%;
		left: 100%;
		margin-top: -12px;
		width: 12px;
		height: 24px;
		overflow: hidden;
	}

	.custom-tooltip .left i::after {
		content: '';
		position: absolute;
		width: 12px;
		height: 12px;
		left: 0;
		top: 50%;
		transform: translate(-50%, -50%) rotate(-45deg);
		background-color: #ffffff;
	}
</style>
