<script lang="ts">
	import { buttonClasses } from '$lib/atoms/componentClasses';
	import UnstakeModal from '../UnstakeModal.svelte';

	let modalFor = 'unstake-modal';
	export let disabled = false;
	const styles = {
		buttonLarge: 'h-14 text-base font-semibold'
	};
</script>

<!-- TODO: add disabled state to label -->
<label for={modalFor} class={`${styles.buttonLarge} ${buttonClasses.outlined} w-full`}
	>UNSTAKE</label
>
<UnstakeModal {modalFor} />
