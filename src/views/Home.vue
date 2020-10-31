<template>
  <div class="home">
    <h1>home page</h1>
   <SearchResults
      v-if="videos.length > 0"
      :videos="videos"
      :vcounts="vcounts"
      :reformatedSearchString="reformatedSearchString"
    />
<infinite-loading  v-if="videos.length" @infinite="infiniteHandler"></infinite-loading>
  </div>
</template>

<script>
import InfiniteLoading from 'vue-infinite-loading';
import SearchResults from '@/components/SearchResults.vue';
import apiKey from '@/api.config.js'
import axios from 'axios'

export default {

  components: { SearchResults, InfiniteLoading, },
  data () {
    return {
      videos: [],vcounts:[],
      reformatedSearchString: '',
      api: {
        key: apiKey.youtubeKey,
        nextPageToken: '',
      }
    }
  },
  mounted()
  { //take out traversy media channel as homepage---using username=TechGuyWeb, take channel id
    //---using channle id---take out playlist-----later collect viewcount for each videos
   const { key } = this.api
    //const apiUrl = `${baseUrl}q=TraversyMedia&key=${key}&type=channel&part=snippet`
    // const apiUrl =`https://www.googleapis.com/youtube/v3/channels?part=contentDetails&forUsername=TechGuyWeb&key=${key}`
    //let aa='Z_gjlIji8hU,XBSvp43EQhA';
    //const apiUrl =`https://www.googleapis.com/youtube/v3/videos?part=statistics&id=${aa}&key=${key}`
    const apiUrl =`https://www.googleapis.com/youtube/v3/playlistItems?part=snippet%2CcontentDetails%2Cstatus&maxResults=20&playlistId=UU29ju8bIPH5as8OGnQzwJyA&key=${key}`
    console.log('homepage-mountedapiUrl',apiUrl)
    this.getData(apiUrl)
  },
  methods: {
    infiniteHandler($state) 
    {  console.log('inside inf load-')
       if(this.videos.length>0)
       {  const {  key, nextPageToken } = this.api
          const apiUrl =`https://www.googleapis.com/youtube/v3/playlistItems?part=snippet%2CcontentDetails%2Cstatus&maxResults=20&playlistId=UU29ju8bIPH5as8OGnQzwJyA&key=${key}&pageToken=${nextPageToken}`
          // const apiUrl = `${baseUrl}part=${part}&type=${type}&order=${order}&maxResults=${maxResults}&key=${key}&q=${q}&pageToken=${nextPageToken}`
          console.log('inf load-api-url',apiUrl)
          axios
            .get(apiUrl)
            .then(res => 
            { if(res.data.items.length >0)
                {   console.log('getdata-res=',res)
                    this.videos.push(...res.data.items)
                    this.api.nextPageToken = res.data.nextPageToken
                  //------------------view count--------------------------
                    let aa="";
                      res.data.items.forEach(function (x)
                        { let z=x.contentDetails.videoId
                          aa=`${z},${aa}`
                        });
                      console.log('aa1=',aa)
                      const { key } = this.api
                      const apiUrl1 =`https://www.googleapis.com/youtube/v3/videos?part=statistics&id=${aa}&key=${key}`
                      console.log('homepage-apiUrl1',apiUrl1)
                    axios.get(apiUrl1)
                    .then(res => { this.vcounts.push(...res.data.items)
                                  console.log('res',res)
                                  })
                  //---------------------------------------------
                  $state.loaded()
              } 
              else{ console.log('finished')
                    $state.complete}
            })
        }
    },
    getData (apiUrl) 
    { 
      axios
        .get(apiUrl)
        .then(res => {
          console.log('getdata-res=',res)
           this.videos.push(...res.data.items)
          this.api.nextPageToken = res.data.nextPageToken
          //-------------------collect view count for each video
                let aa="";
                  this.videos.forEach(function (x){
                    let z=x.contentDetails.videoId
                    aa=`${z},${aa}`
                  });
                  console.log('aa1=',aa)
                  const { key } = this.api
                const apiUrl1 =`https://www.googleapis.com/youtube/v3/videos?part=statistics&id=${aa}&key=${key}`
                  console.log('homepage-apiUrl1',apiUrl1)
                axios
                .get(apiUrl1)
                .then(res => {
                  this.vcounts.push(...res.data.items)
                  console.log('res',res)
                })
        })
        .catch(error => console.error(error))
//---------------------------------------------------------


    },
  }
}
</script>

<style scoped>
</style>
