import React from 'react'

const DisplayPropDetails = (props) => {
  return (
    <>
    {
          <div className='explore-result'>
            <div className='row'>
              <div className='col-12 col-md-6'>
                <p><b>Owner:</b> {props.owner}</p>
                <p><b>Survey Number:</b> {props.surveyNo}</p>
                <p><b>Property ID:</b> {props.propertyId}</p>
                <p><b>Market Value:</b> {props.marketValue}</p>
              </div>

              <div className='col-12 col-md-6'>
                <p><b>Size:</b> {props.sqft} sq. ft.</p>
              </div>
            </div>
            {
            (props.available) ? 
              <button className='marked-available'><b>Marked Available</b></button>
              :
              <button className='mark-available-btn' onClick={() => {props.markAvailable()}} ><b>Mark Available</b></button>
            }
          </div> 
    }
    </>
  )
}

export default DisplayPropDetails