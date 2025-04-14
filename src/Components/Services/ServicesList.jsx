import React from 'react'
import {services} from './../../assets/data/services.js';
import ServicesCard from './ServicesCard'


const ServicesList = () => {
  return (
    <div className="container mt-4 mt-lg-5">
    <div className="row g-4"> 
        {services.map((item, index) => (
            <div className="col-md-6 col-lg-4" key={index}>
                <ServicesCard item={item} index={index} />
            </div>
        ))}
    </div>
</div>

  )
}

export default ServicesList