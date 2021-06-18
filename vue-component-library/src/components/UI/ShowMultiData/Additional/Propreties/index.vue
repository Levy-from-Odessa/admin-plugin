<template>
	<div>
		<span 
			v-for="header in activeHeaders"
			:key="header.key"
			:class="`
            p-2
            fw-bold
            mx-2
            badge
            bg-dark
            m-1
      `"
			role="button"
			@click="$emit('change-header', header, 'hide')"
		>
			{{header.label}}
			<i class="fa fa-times"></i>
		</span>


		{{headerSelect}}

		<SingleSelect
			:value="headerSelect"
			:options="hiddenHeaders"
			option-label="label"
			@input="addHeader"
		></SingleSelect>
	</div>
</template>

<script>
export default {
  name: 'FtthPropreties',
	props:{
		headers: {
			type: Array,
			default: () => []
		}
	},

	data() {
		return {
			activeHeaders: [],
			hiddenHeaders: [],

			headerSelect: ''
		}
	},

	watch:{
		headers:{
			handler: 'defineHeaders',
			immediate: true
		}
	},

	methods: {
		defineHeaders(){
			this.activeHeaders =  [],
			this.hiddenHeaders = []
			this.headers.forEach( header => {
				if (header.show) {
					this.activeHeaders.push(header)
				}
				else  {
					this.hiddenHeaders.push(header)
				}
			})

		},
		addHeader(header){
			this.headerSelect = null
			this.$emit('change-header', header, 'show')
		}
	}
		
}
</script>

<style lang="scss" scoped>

</style>