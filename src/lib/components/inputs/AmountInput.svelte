<script lang="ts">
	export let disabled = false;
	export let value = '';
	export let onChange: (e: Event) => void = () => {};
	export let styleClass = '';
	export let onlyInteger = false;
	export let id = '';
	export let placeholder = '';

	const validateInput = (
		e: KeyboardEvent & {
			currentTarget: EventTarget & HTMLInputElement;
		}
	) => {
		// user can only enter numbers, arrows, backspace, delete and one decimal point if onlyInteger is false
		if (
			(e.key >= '0' && e.key <= '9') ||
			(!onlyInteger && e.key === '.' && !value.includes('.')) ||
			e.key === 'Backspace' ||
			e.key === 'Delete' ||
			e.key === 'ArrowLeft' ||
			e.key === 'ArrowRight' ||
			e.key === 'ArrowUp' ||
			e.key === 'ArrowDown'
		) {
			return true;
		} else {
			e.preventDefault();
		}
	};
</script>

<input
	{disabled}
	id="pond-input-amount-{id}"
	bind:value
	on:input={onChange}
	on:keydown={validateInput}
	on:keyup={validateInput}
	class="hideInputNumberAppearance {styleClass}"
	placeholder={placeholder !== '' ? placeholder : onlyInteger ? '0' : '0.00'}
	autocomplete="off"
/>
