<script lang="ts">
	import { buttonClasses } from '$lib/atoms/componentClasses';
</script>

<div class="dropdown dropdown-top dropdown-hover">
	<button data-testId='popover-button' tabindex="0" class={buttonClasses.icon}>
		<slot name="icon" />
	</button>
	<div class="menu dropdown-content w-64 rounded bg-base-100 shadow">
		<slot name="content" />
	</div>
</div>
