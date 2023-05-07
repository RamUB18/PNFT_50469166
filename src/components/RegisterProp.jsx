import React, { useState,useEffect } from 'react'
import '../css/RegisterProp.css'

const RegisterProp = (props) => {
  const { provider, web3, contract } = props.myWeb3Api;
  const account = props.account;
  const [propDetails , setPropDetials] = useState({
    name:"",location:"", surveyNo:"", owner:"", marketValue:"", size:""
  }) 

  const onChangeFunc = (event) =>{
    const {name, value} = event.target;
    setPropDetials({...propDetails , [name]:value});
  }
  const handleOnClick = async () =>{
    await contract.registerProperty(propDetails.name,propDetails.location,propDetails.surveyNo,propDetails.owner, propDetails.marketValue,propDetails.size,  {
      from: account
    })
    console.log(propDetails)
    setPropDetials({name:"",location:"", surveyNo:"", owner:"", marketValue:"", size:""})
    contract.events.PropertyRegistered({ filter: { owner: account }, fromBlock: 0 }, function (error, event) {
    if (error) {
      console.error("Error while listening for PropertyRegistered event: ", error);
      return;
    }
    console.log("PropertyRegistered event received: ", event);
    alert("Property registered with token ID: " + event.returnValues.tokenId);
  });
    }   

 return (
    <div className='container registerProperty-maindiv'>
      <div className='row'>

         {/* left form */}
        <div className='col-12 col-sm-6'>
            <form method='POST' className='admin-form'>
                <div className='form-group'>
                    <label>Name</label>
                    <input type="text" className="form-control" name="name" placeholder="Enter name" 
                    autoComplete="off" value={propDetails.name} onChange={onChangeFunc}/>
                </div>
                <div className='form-group'>
                    <label>Location</label>
                    <input type="text" className="form-control" name="location" placeholder="Enter location" 
                    autoComplete="off" value={propDetails.location} onChange={onChangeFunc}/>
                </div>
            </form>
        </div>

        {/* right form */}
        <div className='col-12 col-sm-6'>
          <form method='POST' className='admin-form'>
            <div className='form-group'>
                <label>Survey Number</label>
                <input type="number" className="form-control" name="surveyNo" placeholder="Enter survey number" 
                autoComplete="off" value={propDetails.surveyNo} onChange={onChangeFunc}/>
            </div>
            <div className='form-group'>
                <label>Owner Address</label>
                <input type="text" className="form-control" name="owner" placeholder="Enter owner address" 
                autoComplete="off" value={propDetails.owner} onChange={onChangeFunc}/>
            </div>
            <div className='form-group'>
                <label>Market Value</label>
                <input type="number" className="form-control" name="marketValue" placeholder="Enter market value" 
                autoComplete="off" value={propDetails.marketValue} onChange={onChangeFunc}/>
            </div>
            <div className='form-group'>
                <label>Size</label>
                <input type="number" className="form-control" name="size" placeholder="Enter size (sq. ft.)" 
                autoComplete="off" value={propDetails.size} onChange={onChangeFunc}/>
            </div>
          </form>
        </div>
      </div>
      <button className='admin-form-btn' onClick={handleOnClick}>Submit</button>
    </div>
  )
}

export default RegisterProp