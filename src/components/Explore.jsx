import React, { useEffect, useState } from 'react'
import '../css/Explore.css'
import DisplayExploreResult from './DisplayExploreResult';

const Explore = (props) => {

  const { provider, web3, contract } = props.myWeb3Api;
  const account = props.account;

  const [explore, setExplore] = useState({
     surveyNo:""
  })

  const [propDetail, setPropDetail] = useState({
    owner:"", propertyId:"", index:"", marketValue:"", sqft:"",loc:"" 
  })

  const [didIRequested, setDidIRequested] = useState(false);
  const [available, setAvailable] = useState(false);
  const [noResult, setNoResult] = useState(0);
  const [isOwner, setIsOwner] = useState(false);
  //const [isLoading, setIsLoading] = useState(false);


  const onChangeFunc = (event) =>{
    const {name, value} = event.target;
    setExplore({...explore, [name]:value})
  }

  const handleOnClick = async () =>{
      //if (!contract) {
    //console.log("Contract is not properly initialized!");
    //return;
  //}
    const propDetails = await contract.getPropDetails(explore.surveyNo, {
      from: account
    })

    const isAvaliable = await contract.isAvailable(explore.surveyNo, {
      from: account
    })
    const owner = propDetails[0];
    const propertyId = propDetails[1].words[0]
    const index = propDetails[2].words[0]
    const marketValue = propDetails[3].words[0]
    const sqft = propDetails[4].words[0]
    const loc = propDetails[5];
    const surveyNo = explore.surveyNo

    if(account === owner){
      setIsOwner(true)
    }
    else{
      setIsOwner(false);
      if(isAvaliable){
        const _didIRequested = await contract.didIRequested( explore.surveyNo,{
          from: account
        })
      
        setDidIRequested(_didIRequested);
      }
    }

    setPropDetail({owner, propertyId, index, marketValue, sqft, loc, surveyNo})
    setAvailable(isAvaliable);
    setNoResult(1);
    //setIsLoading(false);

  }

  const requestForBuy = async () =>{
    await contract.RequestForBuy(explore.surveyNo, {
      from: account
    })

   setDidIRequested(true);
  }


  useEffect(()=>{
    console.log(propDetail)
  }, [propDetail])

  
  return (
    <div className='container explore-maindiv'>
        <div className='row'>
          <div className='col-12 col-sm-6'>
            <form method='POST' className='admin-form'>
              <div className='form-group'>
                  <label>Survey Number</label>
                  <input type="text" className="form-control" name="surveyNo" placeholder="Enter Survey number" 
                  autoComplete="off" value={explore.surveyNo} onChange={onChangeFunc}/>
              </div>
            </form>
          </div>
        </div>
        <button className='admin-form-btn' onClick={handleOnClick}>Explore</button>

        <DisplayExploreResult
            owner = {propDetail.owner}
            propertyId = {propDetail.propertyId}
            surveyNo = {propDetail.surveyNo}
            marketValue = {propDetail.marketValue}
            sqft = {propDetail.sqft}
            loc = {propDetail.loc}
            available = {available}
            isAdmin = {props.isAdmin}
            didIRequested = {didIRequested}
            requestForBuy = {requestForBuy}
            noResult = {noResult}
            isOwner = {isOwner}

        />
        
    </div>
  )
}

export default Explore