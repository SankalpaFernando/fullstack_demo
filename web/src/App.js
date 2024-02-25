import axios from "axios";
import { useEffect, useState } from "react"

export default ()=>{
  
  const [id,setId] = useState(0);
  const [name,setName] = useState("");
  const [formType,setFormType] = useState("add");

  const [users,setUsers] = useState([]);

  useEffect(()=>{
    getUsers();
  },[])

  async function onSubmit(e){
    e.preventDefault();
    if(formType=="add"){
      const response = await axios.post("http://localhost:3001/user",{id:id,name:name});
      if(response.status==200){
        alert("Data Inserted Successfully");
        getUsers();
      }
    }else{
      const response = await axios.put("http://localhost:5000/user",{id:id,name:name});
      if(response.status==200){
        alert("Data Updated Successfully");
        getUsers();
      }
    }
    setId(0);
    setName("");
  }

  async function getUsers(){
    const response = await axios.get("http://localhost:5000/user");
    setUsers(response.data.data);
  }
  
  return(
    <div>

      <h1>{formType=="add"?"Insert":"Update"} Form</h1>

      <form>
        <table>
          <tr>
            <td>ID</td>
            <td><input type="text" value={id} onChange={(e)=>setId(e.target.value)}/></td>
          </tr>
          <tr>
            <td>Name</td>
            <td><input type="text" value={name} onChange={(e)=>setName(e.target.value)}/></td>
          </tr>
        </table>
        <button type="submit" onClick={onSubmit}>{formType=="add"?"Insert":"Update"}</button>
      </form>

      <h1>Users</h1>
      <table>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Action</th>
        </tr>
        {users.map((user)=>(
          <tr>
            <td>{user.id}</td>
            <td>{user.name}</td>
            <td>
              <button onClick={()=>{setId(user.id);setName(user.name);setFormType("update")}}>Edit</button>
              <button onClick={()=>{axios.delete("http://localhost:5000/user/"+user.id).then(getUsers)}}>Delete</button>
            </td>
          </tr>
        ))}
      </table>

    </div>
  )
}



