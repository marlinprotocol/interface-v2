<script lang="ts">
	import { shortenText } from '$lib/utils/conversion';
	import TxnIcon from '../icons/TxnIcon.svelte';
	export let txnHash: string;
	export let txnHashUrl: string;
	export let startInt: number = 6;
	export let endInt: number = 3;
</script>

<div class="flex justify-center items-center gap-2">
	{shortenText(txnHash, startInt, endInt)}
	<TxnIcon {txnHashUrl} />
</div>
