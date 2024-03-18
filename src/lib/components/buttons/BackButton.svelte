<script lang="ts">
	import { staticImages } from '$lib/components/images/staticImages';

	export let text = 'Back';
	export let href: string;
</script>

<a data-testid="back-button" class="flex gap-3" {href}>
	<img src={staticImages.LeftBlueArrow} alt="Back" width="12" />
	{text}
</a>
