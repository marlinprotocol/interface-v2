<script>
	import { buttonClasses } from '$lib/atoms/componentClasses';
	import Icon from '$lib/atoms/icons/Icon.svelte';
	import lock from 'svelte-awesome/icons/lock';
</script>

<label
	for="connect-wallet-modal"
	class={`${buttonClasses.filled} h-14 text-base font-semibold flex gap-1`}
>
	<Icon data={lock} size={20} iconColorClass="text-white" />
	Connect Wallet
</label>
