import React, { useEffect, useState } from 'react'
import '../css/Profile.css'

const Profile = (props) => {

  const { provider, web3, contract } = props.myWeb3Api;
  const account = props.account;

  const [userInfo, setUserInfo] = useState({
   address:"",fullName:"", contact:""
  })

  const [update, setUpdate] = useState(false);


  const handleUpdate = async () =>{

    await contract.addUser(userInfo.fullName, userInfo.contact, {
      from: account});

    console.log(userInfo);
    setUpdate(false);
  }

  const onChangeFunc = (event) =>{
    const {name, value} = event.target;
    setUserInfo({...userInfo, [name]:value})
  }


  useEffect(() => {

    const getUserInfo = async() =>{
      const response = await contract.getUserProfile({from: account});

      setUserInfo({
        address: (response[0]) ? response[0] : "NA", 
        fullName: (response[1]) ? response[1] : "NA", 
        contact: (response[2].words[0]) ? response[2].words[0] : "NA", 
      });
    }

    getUserInfo();
  }, [])

  


  return (
    <div className='container profile-main-div explore-maindiv'>

      {(update) ? 
      
        <>
          <div className='row'>
            <div className='col-12 col-sm-6'>
              <form method='POST' className='admin-form'>
                <div className='form-group'>
                    <label>Full Name</label>
                    <input type="text" className="form-control" name="fullName" placeholder="Enter full name" 
                    autoComplete="off" value={userInfo.fullName} onChange={onChangeFunc}/>
                </div>
              </form>
            </div>
            <div className='col-12 col-sm-6'>
              <form method='POST' className='admin-form'>
                <div className='form-group'>
                    <label>Contact number</label>
                    <input type="number" className="form-control" name="contact" placeholder="Enter contact" 
                    autoComplete="off" value={userInfo.contact} onChange={onChangeFunc}/>
                </div>
              </form>
            </div>
          </div>
          <button className='update-btn' onClick={handleUpdate}>Confirm Update</button>
        </>

        :

        <>
        <div className='row'>
          <div className='col-12 col-sm-6'>
              <label><b>Owner Address</b></label>
              <p>{userInfo.address}</p>

              <label><b>Full Name</b></label>
              <p>{userInfo.fullName}</p>
          </div>

          <div className='col-12 col-sm-6'>

              <label><b>Contact Number</b></label>
              <p>{userInfo.contact}</p>

          </div>
        </div>
        <button className='update-btn' onClick={() => {setUpdate(true)}}>Update Profile</button>
        </>
      }
    </div>
  )
}

export default Profile