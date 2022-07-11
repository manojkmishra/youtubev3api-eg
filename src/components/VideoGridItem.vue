<template>
	<div>
		<a target="_blank" :title="video.snippet.title" :href="'http://www.youtube.com/watch?v='+video.contentDetails.videoId"
		>
			<img class="card-img-top" :src="`${video.snippet.thumbnails.medium.url}`" alt="Youtube Thumbnail" />
		</a>
		<div class="card-body">
			<h5 class="card-title text-left">{{ video.snippet.title }}</h5>
			<h6 class="card-subtitle mb-2 text-muted text-left">
				Channel- {{ video.snippet.channelTitle }} <br> 
				Views- {{vc}} <br> 
				Upload dt- {{ video.snippet.publishedAt | formatDate }}
				
			</h6>

		</div>
	</div>
</template>

<script>
export default {

  name: 'VideoGridItem',
  props: [ 'video','vcounts'],
  computed:{
	  	vc(){
			  if(this.vcounts && this.vcounts.length>0){
				  //console.log('vgriditem-vcount',this.vcounts)
				  //console.log('vgriditem-video',this.video)
				  let zz=''
					if(this.video.contentDetails)
				  { zz= this.vcounts.filter(v => v.id == this.video.contentDetails.videoId)
				 //console.log('grid-home page-',this.zz) 
				  }
				  else 
				 {  zz= this.vcounts.filter(v => v.id == this.video.id.videoId)
				 	//console.log('grid-about page-',this.zz)
				 }
					//console.log('vgriditem-zz',zz[0].statistics.viewCount)
					if(zz.length>0)
					return zz[0].statistics.viewCount
					else return null;
			  } 
		  }
  },
  data () {
    return {

    }
  }
}
</script>