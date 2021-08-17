<template>
	<div
		@click="$emit('click')"
		:class="[classIcons]"
		class="cursor-pointer absolute flex items-center"
	>
		<svg v-if="!dropdownOpen" aria-hidden="true" viewBox="0 0 448 512">
			<path
				d="M207.029 381.476L12.686 187.132c-9.373-9.373-9.373-24.569 0-33.941l22.667-22.667c9.357-9.357 24.522-9.375 33.901-.04L224 284.505l154.745-154.021c9.379-9.335 24.544-9.317 33.901.04l22.667 22.667c9.373 9.373 9.373 24.569 0 33.941L240.971 381.476c-9.373 9.372-24.569 9.372-33.942 0z"
			/>
		</svg>
		<svg v-else aria-hidden="true" viewBox="0 0 448 512">
			<path
				d="M240.971 130.524l194.343 194.343c9.373 9.373 9.373 24.569 0 33.941l-22.667 22.667c-9.357 9.357-24.522 9.375-33.901.04L224 227.495 69.255 381.516c-9.379 9.335-24.544 9.317-33.901-.04l-22.667-22.667c-9.373-9.373-9.373-24.569 0-33.941L207.03 130.525c9.372-9.373 24.568-9.373 33.941-.001z"
			/>
		</svg>
	</div>
</template>

<script>
	export default {
		name: 'FtthAutoSelectToggle',
		props: {
			classIcons: {
				type:String,
				default: () => ''
			},
			dropdownOpen:{
				type: Boolean,
				default: () => false
			}
		}
		
	}
</script>

<style lang="scss" scoped>

.icons {
  padding: 0 1em;
  right: 0;
  top: 0;
  bottom: 0;
  fill: #606f7b;
}
.icons svg {
  width: 0.75em;
  height: 0.75em;
}
</style>