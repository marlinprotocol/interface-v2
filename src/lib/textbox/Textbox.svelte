<script>
	import { onMount } from 'svelte';

	export let title = 'Title';
	export let type = 'text';
	export let font = 'Poppins';
	export let placeholder = '0.00';
	export let readonly = false;
	export let tooltip = title;
	export let isError = false;

	export let value;
	export let textValidator = (t) => undefined;
	export let valueValidator = (v) => undefined;

	$: err = undefined;
	function _title() {
		return title;
	}
	$: {
		isError = err !== undefined;
	}
	onMount(async () => {
		if (!value) isError = true;
	});

	let input;
	async function handleInput(e) {
		let text = e.target.value;
		console.log('handle input:', text);

		let _err = await textValidator(text);
		if (_err !== undefined) {
			err = _err;
			return;
		}

		value = textToValue(text);
		err = await valueValidator(value);
	}

	$: console.log(input ? input.value : undefined, value, err, isError);

	$: {
		console.log('value change:', _title(), value);
		if(value == undefined) break $;
		if (input && input !== document.activeElement) {
			input.value = valueToText(value);
			err = valueValidator(value)
			isError = err !== undefined;
		}
	}

	export let textToValue = (v) => {
		return v;
	};

	export let valueToText = (v) => {
		return v || '';
	};

	$: showTooltip = false;
	$: showError = false;
</script>

<div class="textbox w-auto mx-4 sm:mx-8 py-2">
	<div class="flex flex-horizontal" justify-between>
		<div class="mx-2 w-full flex flex-horizontal gap-2 overflow-hidden">
			<p class="text-gray-800">{title}</p>
			<img
				src="/images/info.svg"
				alt="info icon"
				class="my-auto h-4 cursor-pointer"
				on:click={() => (showTooltip = !showTooltip)}
			/>
			<slot>
			</slot>
		</div>
		{#if err !== undefined}
			<img
				src="/images/error.svg"
				class="my-auto h-4 cursor-pointer"
				alt="error icon"
				on:click={() => (showError = !showError)}
			/>
		{/if}
	</div>
	{#if showTooltip}
		<p class="bg-primary text-white rounded-lg p-4 mb-2" style="max-width: 32em">{tooltip}</p>
	{/if}
	{#if showError}
		<p class="bg-red-500 text-white rounded-lg p-4 mb-2" style="max-width: 32em">{err}</p>
	{/if}
	<input
		class="bg-gray-100 w-full h-16 p-4 rounded-lg {font} {err !== undefined
			? 'border-2 border-red-500'
			: ''}"
		{type}
		{placeholder}
		bind:this={input}
		on:input={handleInput}
		on:focus={() => (err = textValidator(input.value))}
		{readonly}
	/>
</div>
