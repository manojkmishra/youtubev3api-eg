<template>
	<div class="container mb-3">
		<div class="card-columns">
			<div
				v-for="video in videos"
				class="card"
			>
				<VideoGridItem :video="video" :vcounts="vcounts" />
			</div>
		</div>

	</div>
</template>

<script>
import VideoGridItem from './VideoGridItem.vue';

export default {

  name: 'SearchResults',
  props: [ 'videos', 'reformatedSearchString','vcounts' ],
  components: {
  	VideoGridItem
  },
  data () {
    return {
    	title: 'Search Results',
    	displayMode: 'grid'
    }
  },
  methods: {

  }
}
</script>

<style scoped>
	button:focus {
		box-shadow: none !important
	}
</style>