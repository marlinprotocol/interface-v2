<script lang="ts">
	import { buttonClasses } from '$lib/atoms/componentClasses';
	import StakeModal from '$lib/page-components/receiver-staking/StakeModal.svelte';

	const modalFor = 'stake-modal';
	const styles = {
		buttonLarge: 'h-14 text-base font-semibold'
	};
</script>

<label for={modalFor} class={`${styles.buttonLarge} ${buttonClasses.filled} w-full`}>STAKE</label>
<StakeModal {modalFor} />
