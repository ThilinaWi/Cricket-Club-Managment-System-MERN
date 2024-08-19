import React ,{useEffect} from "react";
import { useNavigate, useParams  } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

export default function DeleteCoach(){
const {id} = useParams();

const navigate = useNavigate()
useEffect(() => {
  axios.delete('http://localhost:9000/coach/delete/'+id)
        .then((res) =>{
           //  console.log(res.data);
            toast.success('User delete successfully');
            navigate('/coach');
           
        }).catch((err) => console.log(err))
           
}, [])

}