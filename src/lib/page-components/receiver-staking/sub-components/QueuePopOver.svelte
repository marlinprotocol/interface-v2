<script lang="ts">
	import PopOver from '$lib/components/pop-over/PopOver.svelte';
	import Text from '$lib/components/texts/Text.svelte';
	import Timer from '$lib/components/timer/Timer.svelte';

	export let iconSrc = './images/infoSecondary.svg';
	export let iconWidth = 16;
	const styles = {
		title: 'py-2 px-3 bg-gray-200 rounded',
		subtitle: 'py-2 px-3'
	};
</script>

<PopOver>
	<img slot="icon" src={iconSrc} alt="Pop-over" width={iconWidth} />
	<div slot="content">
		<div class={styles.title}>
			<Text variant="h5" text="50 in Queue" />
		</div>
		<div class={styles.subtitle}>
			<Text variant="body" text="2 line long description here here!!!" />
			<Timer endEpochTime={1675003171} />
		</div>
	</div>
</PopOver>
