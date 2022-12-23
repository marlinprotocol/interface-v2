<script>
	import { claim_space } from 'svelte/internal';

	let conversion = { from: 'POND', to: 'MPond' };

	function handleMpondToPond() {
		conversion = { from: 'MPond', to: 'POND' };
	}
	function handlePondToMpond() {
		conversion = { from: 'POND', to: 'MPond' };
	}
</script>

<main class="h-[calc(100vh-101px)] flex items-center justify-center">
	<div class="max-w-[465px] w-full flex flex-col items-center justify-center font-[Poppins]">
		<div class="bg-white rounded-lg w-full px-8 py-5 h-[470px] flex flex-col justify-between">
			<div class="flex flex-col items-center">
				<h1 class="flex justify-center font-bold text-2xl leading-normal">Bridge</h1>
				<div class="flex space-x-3 justify-center mt-4">
					<button
						on:click={handlePondToMpond}
						class="pill text-primary tracking-widest text-sm rounded-full py-2 px-5 flex items-center justify-center"
						style:background={conversion.from === 'POND' ? '#EBECF9' : '#F3F3F3'}
						style:font-weight={conversion.from === 'POND' ? '600' : '400'}
						style:color={conversion.from === 'POND' ? '#3840c7' : '#7E7E80'}
					>
						POND
						<img class="mx-1" src="./images/arrowicon.svg" alt="arrowicon" />
						MPond
					</button>
					<button
						on:click={handleMpondToPond}
						class="pill tracking-widest text-sm rounded-full py-2 px-5 flex items-center justify-center"
						style:background={conversion.from === 'MPond' ? '#EBECF9' : '#F3F3F3'}
						style:font-weight={conversion.from === 'MPond' ? '600' : '400'}
						style:color={conversion.from === 'MPond' ? '#3840c7' : '#7E7E80'}
					>
						MPond
						<img class="mx-1" src="./images/conversionarrow.svg" alt="conversion arrow" />
						POND
					</button>
				</div>
			</div>

			<!-- from: {conversion.from}
            to: {conversion.to} -->
			<form>
				<div class="px-2">
					<label class="mt-[30px] mb-2 flex" for="from">From</label>
					<div class="flex justify-between items-center">
						<input
							class="font-[Orbitron] outline-none border-none text-primary font-semibold text-xl placeholder:text-primary/20"
							type="number"
							id="from"
							name="from"
							placeholder="0.00"
							value=""
						/>
						<div class="font-medium text-base">{conversion.from}</div>
					</div>
					<div class="mt-5 flex items-center text-sm">
						<button class="text-[#3740c7]/70 font-semibold tracking-wider"> MAX </button>
						<span class="text-black/60 ml-2"> | Balance: NaN </span>
					</div>
				</div>
				<hr class="my-[25px]" />
				<div class="px-2">
					<label class="mt-[30px] mb-2 flex" for="to">To</label>
					<div class="flex justify-between items-center">
						<input
							class="font-[Orbitron] outline-none border-none text-primary font-semibold text-xl placeholder:text-primary/20"
							type="number"
							id="to"
							name="to"
							placeholder="0.00"
							value=""
						/>
						<div class="font-medium text-base">{conversion.to}</div>
					</div>
				</div>
				<button
					class="flex items-center justify-center w-full bg-primary text-white rounded-lg h-14 mt-[30px] font-semibold"
					type="submit">Submit</button
				>
			</form>
		</div>
		<button
			class="bg-white rounded-lg w-full py-4 mt-[30px] flex items-center justify-center text-base text-primary font-semibold"
		>
			{conversion.from}<img class="mx-1" src="./images/arrowicon.svg" alt="arrowicon" />
			{conversion.to} conversion history
			<div>icon</div>
		</button>
		<button
			class="bg-[#dee8f2] rounded-lg px-[18px] py-[9px] mt-[30px] flex text-primary font-medium text-sm"
		>
			<img class="mr-3" src="./images/openIcon.svg" alt="open icon" />
			<div>Learn more</div>
		</button>
	</div>
</main>
