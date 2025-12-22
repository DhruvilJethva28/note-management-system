// backend url import after creating backend and save it into api_url
const api_url=import.meta.env.VITE_API_URL;
const getToken = () => localStorage.getItem("token");


export const getnotes=async()=>{
const res=await fetch(`${api_url}/notes`,{
    headers:{Authorization:`Bearer ${getToken()}`},
})
return res.json();

}

export const createNotes=async(note)=>{
const res=await fetch(`${api_url}/notes`,
   {
     method:"POST",
    headers:{"Content-type":"application/json",Authorization:`Bearer ${getToken()}`},
    body:JSON.stringify(note),
})
return res.json();
}

export const updateNotes=async(id,note)=>{
    const res=await fetch(`${api_url}/notes/${id}`,{
        method:"PUT",
        headers:{"Content-type":"application/json",Authorization:`Bearer ${getToken()}`},
        body:JSON.stringify(note)
    })
    return res.json()
}

export const deleteNotes=async(id)=> {
  await fetch(`${api_url}/notes/${id}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${getToken()}` },
  });
};