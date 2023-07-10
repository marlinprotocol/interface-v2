<script lang="ts">
	import { staticImages } from '$lib/components/images/staticImages';
	export let txnHashUrl: string;
</script>

<a class="shrink-0" href={txnHashUrl} target="_blank" rel="noopener noreferrer">
	<img src={staticImages.OpenInNew} alt="txn link" width="13px" />
</a>
