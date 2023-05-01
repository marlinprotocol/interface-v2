<script lang="ts">
</script>

<div class={'marlin-loader'}>
	<div class="lds-ripple">
		<div />
		<div />
	</div>
</div>

<style>
	.marlin-loader {
		display: flex;
		justify-content: center;
		align-items: center;
		height: 100%;
	}

	.lds-ripple {
		display: inline-block;
		position: relative;
		width: 48px;
		height: 48px;
	}

	.lds-ripple div {
		position: absolute;
		border: 4px solid #2db8e3;
		opacity: 1;
		border-radius: 50%;
		animation: lds-ripple 1s cubic-bezier(0, 0.2, 0.8, 1) infinite;
	}

	.lds-ripple div:nth-child(2) {
		animation-delay: -0.5s;
	}

	@keyframes lds-ripple {
		0% {
			top: 27px;
			left: 27px;
			width: 0;
			height: 0;
			opacity: 1;
		}
		100% {
			top: 0px;
			left: 0px;
			width: 54px;
			height: 54px;
			opacity: 0;
		}
	}
</style>
