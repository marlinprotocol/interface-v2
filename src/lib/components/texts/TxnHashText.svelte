<script lang="ts">
	import { shortenText } from '$lib/utils/helpers/conversionHelper';
	import TxnIcon from '$lib/components/icons/TxnIcon.svelte';
	export let txnHash: string;
	export let txnHashUrl: string;
	export let startInt = 6;
	export let endInt = 3;
</script>

<div class="flex items-center justify-start gap-2" data-testid="txn-hash-text">
	{shortenText(txnHash, startInt, endInt)}
	<TxnIcon {txnHashUrl} />
</div>
