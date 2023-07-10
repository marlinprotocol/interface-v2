<script lang="ts">
	import { shortenText } from '$lib/utils/helpers/conversionHelper';
	import TxnIcon from '$lib/components/icons/TxnIcon.svelte';
	export let txnHash: string;
	export let txnHashUrl: string;
	export let startInt = 6;
	export let endInt = 3;
</script>

<div class="flex justify-center items-center gap-2">
	{shortenText(txnHash, startInt, endInt)}
	<TxnIcon {txnHashUrl} />
</div>
