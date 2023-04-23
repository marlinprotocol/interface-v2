<script lang="ts">
	export let disabled = false;
	export let value = '';
	export let onChange: any = undefined;
	export let styleClass = '';
</script>

<input
	{disabled}
	bind:value
	on:input={onChange}
	id="pond-input-amount"
	class={`hideInputNumberAppearance ${styleClass}`}
	placeholder="0.00"
	autocomplete="off"
	on:keydown={(e) => {
		// user can only enter numbers and one decimal point, arrows, backspace, delete
		if (
			(e.key >= '0' && e.key <= '9') ||
			(e.key == '.' && !value.includes('.')) ||
			e.key == 'Backspace' ||
			e.key == 'Delete' ||
			e.key == 'ArrowLeft' ||
			e.key == 'ArrowRight' ||
			e.key == 'ArrowUp' ||
			e.key == 'ArrowDown'
		) {
			return true;
		} else {
			e.preventDefault();
		}
	}}
/>
