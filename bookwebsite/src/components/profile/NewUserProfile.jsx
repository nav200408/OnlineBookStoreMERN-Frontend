import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { getUserById, updateUser } from "../../service/userApi";
import { getToken } from "../../utils/auth";
import "../../assets/styles/NewUserProfile.css"

export function NewUserProfile(){
    let [user,setUser] = useState();
    let [file,setFile] = useState();
    let [changeFlag,setChangeFlag] = useState(false);
    
    async function getUser(){
        let token = getToken();
        let user = await getUserById(token);
        setUser(user);
    }

    useEffect(()=>{
        getUser();
    },[changeFlag]);

    function handleChange(e){
        let {name,value} = e.target;
        return setUser((prev)=>{
            return {
                ...prev,
                [name]:value
            }
        })
    }

    async function handleSubmit(){
        let formData = new FormData();
        formData.append("username",user.username);
        formData.append("fullName",user.fullName);
        formData.append("email",user.email);
        formData.append("phoneNumber",user.phoneNumber);
        if(file){
        formData.append("file",file);
        }
        let newUser = await updateUser(formData);
        if(newUser.status !=200){
            return alert("Some unexpected errors happen");
        } 
        setChangeFlag(!changeFlag);
    }

    return(<>
    <form className="user-profile-form">
  <h2 className="user-profile-header">User Profile</h2>

  <div className="user-profile-image-section">
    <label
      className="user-profile-label user-profile-image-label"
      htmlFor="user-profile-image"
    >
      Image
    </label>

    <div className="user-profile-image-container">
      <img
        className="user-profile-image"
        src={`http://localhost:8080/stream/api/image?filename=${user?.userImage}`}
        alt="User Image"
      />
      <input
        type="file"
        id="user-profile-image"
        name="userImage"
        className="user-profile-image-input"
        onChange={(e)=>{
           return setFile(e.target.files[0]);
        }}
      />
    </div>
  </div>

  <div className="user-profile-field-group">
    <label
      className="user-profile-label"
      htmlFor="user-profile-username"
    >
      Username
    </label>
    <input
      type="text"
      id="user-profile-username"
      className="user-profile-input"
      name="username"
      value={user?.username}
      onChange={handleChange}
     
    />
  </div>

  <div className="user-profile-field-group">
    <label
      className="user-profile-label"
      htmlFor="user-profile-fullname"
    >
      Full Name
    </label>
    <input
      type="text"
      id="user-profile-fullname"
      className="user-profile-input"
      name="fullName"
      value={user?.fullName}
      onChange={handleChange}
    />
  </div>

  <div className="user-profile-field-group">
    <label
      className="user-profile-label"
      htmlFor="user-profile-email"
    >
      Email
    </label>
    <input
      type="email"
      id="user-profile-email"
      name="email"
      className="user-profile-input"
      value={user?.email}
      onChange={handleChange}
    />
  </div>

  <div className="user-profile-field-group">
    <label
      className="user-profile-label"
      htmlFor="user-profile-phone"
    >
      Phone Number
    </label>
    <input
      type="tel"
      id="user-profile-phone"
      className="user-profile-input"
      name="phoneNumber"
      value={user?.phoneNumber}
      onChange={handleChange}
    />
  </div>

  <button type="button" className="user-profile-button user-profile-save-button" onClick={handleSubmit}>
    Save change
  </button>

  <button type="button" className="user-profile-button user-profile-cancel-button">
    Cancel
  </button>
</form>

    </>)
}