<script>
</script>

<header class="border-b-2 text-center py-5 header">
	<div class="flex gap-2 justify-between flex-wrap">
		<img src="./logo/logo-name.svg" alt="Marlin Logo" width="140" />
		<div class="flex gap-10 items-center">
			<div class="flex gap-10 nav-links">
				<!-- TODO: add menu drawer for mobile -->
				<a href="/"><h5 class="nav-link-item">Govern</h5></a>
				<a href="/"><h5 class="nav-link-item">Flowmint</h5></a>
				<a href="/"><h5 class="nav-link-item">Relay</h5></a>
			</div>
			<button class="btn btn-primary btn-outline btn-sm md:btn-md">
				<img src="./images/lockicon.svg" alt="Metamask Logo" width="12" class="mr-2" />
				Connect Wallet
			</button>
		</div>
	</div>
</header>

<style>
	.header {
		width: 90%;
		margin: 0 auto;
		border-color: 'grey-600';
	}

	.nav-link-item {
		font-size: 1rem;
		font-weight: 500;
	}

	@media (max-width: 640px) {
		.nav-links {
			display: none;
		}
	}
</style>
