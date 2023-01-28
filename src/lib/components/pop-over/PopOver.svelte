<script lang="ts">
	import { buttonClasses } from '../componentClasses';

	const styles = {
		dropdownContent: 'dropdown-content menu shadow rounded rounded-box w-72 bg-base-100'
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
