<template>
  <div class="about">
    <h1>About page</h1>
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
    components: {

    SearchResults,
InfiniteLoading,
  },
    data () {
    return {
      videos: [],vcounts:[],
      reformatedSearchString: '',
      api: {
        baseUrl: 'https://www.googleapis.com/youtube/v3/search?',
        type: 'video',
        part: 'snippet',
        order: 'viewCount',
        maxResults: 20,
        q: '',
        key: apiKey.youtubeKey,
        nextPageToken: '',
      }
    }
  },
  mounted()
  { //-----------------for redirecting back to home page if query empty--------
      console.log('abt page mounted',this.$route.query);
      if(this.$route.query.query=='' || Object.keys(this.$route.query).length === 0)
        { console.log('query empty')
          this.$router.push({ path: 'home' })
        }
    //--------------------------------------------------------------
      //  const { baseUrl, type, part, order, maxResults, q, key, nextPageToken } = this.api
     //   const apiUrl = `${baseUrl}part=${part}&type=${type}&order=${order}&maxResults=${maxResults}&key=${key}&q=${q}&pageToken=${nextPageToken}`
        //const apiUrl =`https://www.googleapis.com/youtube/v3/playlistItems?part=snippet%2CcontentDetails%2Cstatus&maxResults=20&playlistId=UU29ju8bIPH5as8OGnQzwJyA&key=${key}`
        
       // this.getData(apiUrl)
let abc=this.$route.query.query;
this.api.q = abc.split(' ').join('+')
console.log('about-q=',this.api.q)
      const { baseUrl, type, part, order, maxResults, q, key } = this.api
      //this.api.q = searchParams.join('+')
      const apiUrl = `${baseUrl}part=${part}&type=${type}&order=${order}&maxResults=${maxResults}&key=${key}&q=${q}`
      console.log('abtpage-mountedapiUrl',apiUrl)
      //this.getData(apiUrl)
  },
methods: 
{
    infiniteHandler($state) 
    {  console.log('inside inf load-')
      if(this.videos.length>0){
        const { baseUrl, type, part, order, maxResults, q, key, nextPageToken } = this.api
        const apiUrl = `${baseUrl}part=${part}&type=${type}&order=${order}&maxResults=${maxResults}&key=${key}&q=${q}&pageToken=${nextPageToken}`
        //const apiUrl =`https://www.googleapis.com/youtube/v3/playlistItems?part=snippet%2CcontentDetails%2Cstatus&maxResults=20&playlistId=UU29ju8bIPH5as8OGnQzwJyA&key=${key}&pageToken=${nextPageToken}`
        // const apiUrl = `${baseUrl}part=${part}&type=${type}&order=${order}&maxResults=${maxResults}&key=${key}&q=${q}&pageToken=${nextPageToken}`
          console.log('inf load-api-url',apiUrl)
          axios
            .get(apiUrl)
            .then(res => {
              if(res.data.items.length >0){
                console.log('abt page--res=',res)
                this.videos.push(...res.data.items)
              this.api.nextPageToken = res.data.nextPageToken
              //--------------------------------------------
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
                      .then(res => { this.vcounts.push(...res.data.items)    })
          //---------------------------------------------
                $state.loaded()
              } else{ console.log('finished')
                $state.complete}
              
            })
        }
    },
    getData (apiUrl) 
    {  axios.get(apiUrl)
            .then(res => 
          {
            console.log('abtpage-res=',res)
            this.videos.push(...res.data.items)
            this.api.prevPageToken = res.data.prevPageToken
            this.api.nextPageToken = res.data.nextPageToken
            //-------------------
                let aa="";
                  this.videos.forEach(function (x)
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
        })
        .catch(error => console.error(error))
//---------------------------------------------------------


    }
  }
}
</script>

<style scoped>
</style>