<script lang="ts">
	import Icon from '$lib/atoms/icons/Icon.svelte';
	import PopOver from '$lib/atoms/pop-over/PopOver.svelte';
	import Text from '$lib/atoms/texts/Text.svelte';
	import Timer from '$lib/atoms/timer/Timer.svelte';
	import question from 'svelte-awesome/icons/question';

	export let iconWidth = 15;
	const styles = {
		title: 'py-2 px-3 bg-gray-200 rounded',
		subtitle: 'py-2 px-3 text-left'
	};
</script>

<PopOver>
	<Icon slot="icon" data={question} size={iconWidth} border={true} />
	<!-- <img slot="icon" src={iconSrc} alt="Pop-over" width={iconWidth} /> -->
	<svelte:fragment slot="content">
		<div class={styles.title}>
			<Text variant="h6" text="50 in Queue" />
		</div>
		<div class={styles.subtitle}>
			<Text variant="small" text="2 line long description here here!!!" />
			<Timer
				endEpochTime={1677003171}
				initialText={'Queued POND will be staked'}
				textVariant="small"
			/>
		</div>
	</svelte:fragment>
</PopOver>
