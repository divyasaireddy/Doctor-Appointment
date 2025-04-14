import React from 'react';
import { BsArrowRight } from 'react-icons/bs';
import { Link } from 'react-router-dom';

const ServicesCard = ({ item ,index}) => {
    const { name, desc, bgColor, textColor } = item;

    return (
        <div className="py-4 px-3 px-lg-4 text-center rounded shadow" style={{ backgroundColor: bgColor, color: textColor }}>
            <h2 className="fs-4 fw-bold">{name}</h2>
            <p className="fs-6 mt-3">{desc}</p>

            <div className="d-flex align-items-center justify-content-between mt-3">
                <Link
                    to="/doctors"
                    className="d-flex align-items-center justify-content-center rounded-circle border border-dark mt-3 mx-auto link-hover"
                    style={{ width: "44px", height: "44px", transition: "all 0.3s ease-in-out" }} >
                    <BsArrowRight className="text-dark" style={{ width: "24px", height: "20px" }} />
                </Link>
                <span
                    className="d-flex align-items-center justify-content-center fw-bold"
                    style={{
                        width: "44px",
                        height: "44px",
                        fontSize: "18px",
                        lineHeight: "30px",
                        backgroundColor: bgColor,
                        color: textColor,
                        borderRadius: "6px 0 0 6px"
                    }}
                >
                    {index + 1}
                </span>

            </div>

        </div>



    );
};

export default ServicesCard;
