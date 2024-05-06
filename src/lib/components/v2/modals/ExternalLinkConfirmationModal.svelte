<script lang="ts">
	import { buttonClasses } from '$lib/atoms/v2/componentClasses';
	import Modal from '$lib/atoms/v2/modals/Modal.svelte';
	import { cn } from '$lib/utils/helpers/commonHelper';

	export let modalFor = 'external-link-confirmation';
	export let href: string = '';
	export let bodyText: string =
		"You are going to be re-directed to an external link. Don't worry we will open it in a new tab, just make sure you finish up everything important in the hub before moving away.";
	export let label: string = '';
</script>

<Modal {modalFor}>
	<svelte:fragment slot="title">External Link Confirmation</svelte:fragment>
	<svelte:fragment slot="content"
		><span class="text-base font-light text-[#A8A8A8]">{bodyText}</span></svelte:fragment
	>
	<svelte:fragment slot="actionButtons">
		<a {href} target="_blank" class={cn(buttonClasses.filled, 'h-14')}>
			VISIT {label.toLocaleUpperCase()}
		</a>
	</svelte:fragment>
</Modal>
