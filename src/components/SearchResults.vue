<template>
	<div class="container mb-3">
		<div class="card-columns">
			<div
				v-for="video in videos"
				class="card"
			>
			
				<VideoGridItem v-if="video.contentDetails" :video="video" :vcounts="vcounts" :href1="video.contentDetails.videoId"  />
			<VideoGridItem v-else :video="video" :vcounts="vcounts" :href1="video.id.videoId"  />
			
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
    return { href1:'',
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