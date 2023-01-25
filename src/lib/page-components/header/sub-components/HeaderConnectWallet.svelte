<script lang="ts">
	import OutlinedButton from '$lib/components/buttons/OutlinedButton.svelte';
</script>

<OutlinedButton styleClass="flex gap-2 " onclick={() => console.log('wallet connect')}>
	<img src="./images/lockicon.svg" alt="Metamask Logo" width="12" />
	Connect Wallet
</OutlinedButton>
