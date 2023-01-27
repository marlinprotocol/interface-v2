<script lang="ts">
	import { buttonClasses } from '../componentClasses';

	const styles = {
		dropdownContent:
			'dropdown-content menu shadow rounded rounded-box w-56 bg-gray-600 text-primary-content',
		title: 'py-2 px-3 bg-gray-700 rounded',
		subtitle: 'py-2 px-3'
	};
</script>

<div class="dropdown dropdown-hover dropdown-top">
	<button tabindex="0" class={buttonClasses.icon}>
		<slot name="icon" />
	</button>
	<div class={styles.dropdownContent}>
		<slot name="content" />
	</div>
</div>
