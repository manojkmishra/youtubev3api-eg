<template>
	<div class="container mt-5">
		<form class="mb-5 mt-5">
			<div class="input-group">
				<input
					type="text"
					v-model="searchString"
					@keydown.13.prevent="parseSearchString"
					class="form-control"
					placeholder="Search ..."
				>
				<div class="input-group-append">
					<button
						type="button"
						class="btn btn-outline-secondary"
						@click='parseSearchString'
					>
						<i class="fas fa-search"></i>
					</button>
				</div>
			</div>
		</form>
	</div>
</template>

<script>
export default {

  name: 'SearchForm',

  data () {
    return {
    	searchString: ''
    }
  },
  methods: {
    parseSearchString () {
      // Trim search String
      const trimmedSearchString = this.searchString.trim()
console.log('searchform.vue-string=',trimmedSearchString)
      if (trimmedSearchString != '') {
      	// Split search string
      	const searchParams = trimmedSearchString.split(/\s+/)
      	// Emit event
      	this.$emit('search', searchParams)
      	// Reset input
      	this.searchString = ''
      }
    }
  }
}
</script>

<style scoped>
	input,
	button {
		box-shadow: none !important;
	}

	.form-control {
		border-color: #6c757d;
	}
</style>