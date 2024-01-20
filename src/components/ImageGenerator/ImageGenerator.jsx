import React, { useRef, useState } from 'react'

import "./ImageGenerator.css"
import default_img from "../Assetes/default.jpg"

const ImageGenerator = () => {

  const [image_url , setimage_url] = useState("/")
  let input_ref = useRef(null);
  const [loading,setLoading] = useState(false)

  const imageGenerator = async ()=>{
    if(input_ref.current.value === ""){
        return 0;
    }
    setLoading(true)
    const response = await fetch(
        "https://api.openai.com/v1/images/generations",
        {
            method:"POST",
            headers:{
                "Content-type":"application/json",
                Authorization:
                "Bearer Your_Key ",
                "User-Agent":"Chrome",
            },
            body:JSON.stringify({
                prompt:`${input_ref.current.value}`,
                n:1,
                size:"512x512"
            }),

        }
    );

    let data = await response.json()
  //  console.log(data)
  let data_array = data.data;
  setimage_url(data_array[0].url)
  setLoading(false)
  }


  return (
    <div className='ai-image-generator'>

        <div className='header'>
               AI Image <span> Generator </span>
        </div>

        <div className="img-loading">
            <div className="image">
                <img src={image_url==='/'? default_img : image_url } alt="default" height="300px" width="300px"/>
            </div>
            <div className="loading">
                {/* <div className={loading?"loading-bar-full":"loading-bar"}>

                </div> */}
                <div className={loading?"loading-text":"display-none"}>
                    Loading...
                </div>
            </div>
        </div>


        <div className='search-box'>
            <input type="text" ref={input_ref}  className='search-input' placeholder='Describe What You Want to See' />
            <div className='generate-btn' onClick={()=>{imageGenerator()}}>
               Generate 
            </div>
        </div>


      
    </div>
  )
}

export default ImageGenerator
