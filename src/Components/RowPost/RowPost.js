import React ,{useEffect,useState}from 'react'
import './RowPost.css'
import Youtube from 'react-youtube'

import {imageUrl,API_KEY} from '../../Constants/constants'
import axios from '../../axios'
function RowPost(props) {
  const [Movies, setMovies] = useState([])
  const [urlId, seturlId] = useState('')
  useEffect(()=>{
    axios.get(props.url).then(response=>{
      console.log(response.data)
      setMovies(response.data.results)
    }).catch(err=>{
      // alert('Network Error')
    })
  },[])

  const opts = {
    height: '390',
    width: '100%',
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 1,
    },
  };

  const handleMovie = (id)=>{
    console.log(id)
    axios.get(`/movie/${id}/videos?api_key=${API_KEY}&language=en-US`).then(response=>{
      if(response.data.results.length!==0){
        seturlId(response.data.results[0])
      }else{
        console.log('array empty')
      }
    })

  }
  return (
    <div className='row'> 
      <h2>{props.title}</h2>
      <div className="posters">
        {Movies.map((obj)=>
          <img onClick={()=>handleMovie(obj.id)} className={props.isSmall ?'smallPoster' :'poster'} src={`${imageUrl+obj.backdrop_path}`} alt="poster" />

        )}
         
         
         
      </div>
    { urlId && <Youtube opts={opts} videoId={urlId.key} />}
    </div>
  )
}

export default RowPost
