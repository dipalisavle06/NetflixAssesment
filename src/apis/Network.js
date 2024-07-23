import axios from "axios";

const Config={ 
    baseURL:'https://api.tvmaze.com/search/shows?q=all',
};

export const getAll=async()=>{
    try{
        const response = await axios.get(Config.baseURL);
       const data=response.data
       const status=response.status
       return {success:true,data:data,status:status}
   
    } catch(error) {
       console.log(error);
       return{success:false,data:error}

    }
    };