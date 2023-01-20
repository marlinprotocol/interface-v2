<script lang="ts">
	import SecondaryButton from '$lib/components/buttons/SecondaryButton.svelte';
</script>

<SecondaryButton styleClass="flex gap-2 " onclick={() => console.log('wallet connect')}>
	<img src="./images/lockicon.svg" alt="Metamask Logo" width="12" />
	Connect Wallet
</SecondaryButton>
