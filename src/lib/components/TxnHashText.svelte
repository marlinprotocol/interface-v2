<script lang="ts">
	import { shortenText } from '$lib/utils/conversion';
	import { staticImages } from './images/staticImages';
	export let txnHash: string;
	export let txnHashUrl: string;
</script>

<div class="flex justify-center items-center gap-2">
	{shortenText(txnHash, 6, 3)}
	<a class="shrink-0" href={txnHashUrl} target="_blank" rel="noopener noreferrer">
		<img src={staticImages.OpenInNew} alt="txn link" width="13px" />
	</a>
</div>
