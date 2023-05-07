import React, {useState, useEffect } from 'react'
import DisplayRequested from './DisplayRequested';

const Requested = (props) => {

  const { provider, web3, contract } = props.myWeb3Api;
  const account = props.account;
  const reqArr = [];

  const [requestedList, setRequestedList] = useState([]);
  const [length, setLength] = useState(0);

  useEffect(() =>{

    const getRequested = async () =>{

      const _indices = await contract.getIndices({from: account});
      const _reqIndices = _indices[1].words[0];

      for(let i=0; i<_reqIndices; i++){

        const reqProp = await contract.getRequestedProps(i, {from: account});

        // if surveyNo. != 0
        if(reqProp[3].words[0] != 0){
          const PropDetail = await contract.getPropDetails(reqProp[0], reqProp[1], reqProp[2], reqProp[3].words[0], {
            from: account
          })

          const PropDetail2 = {state: reqProp[0], district: reqProp[1], city: reqProp[2], surveyNo: reqProp[3].words[0]}
          let allDetails = {...PropDetail, ...PropDetail2}
          reqArr.push(allDetails);
        }
      }
      setRequestedList(reqArr);
      setLength(reqArr.length);
      console.log(reqArr);
    }

    getRequested();

  }, [])


  return (
    <div className='container'>
        {  
        (length === 0) ? 
        <div className="no-result-div">
          <p className='no-result'>No pending requests.</p>
        </div>
        :
          requestedList.map((details, index) =>{
            return(
              <DisplayRequested
                 
                key = {index}
                owner = {details[0]}
                propertyId = {details[1].words[0]}
                index = {details[2].words[0]}
                marketValue = {details[3].words[0]}
                sqft = {details[4].words[0]}
                surveyNo = {details.surveyNo}

              />
            )
          })
        } 
    </div>
  )
}

export default Requested