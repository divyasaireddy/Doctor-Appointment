import React from "react";
import faqs from "../../assets/data/faqs";  // Import FAQs
import FaqItem from "./FaqItem";

const FaqList = () => {
  return (
    <ul className="mt-4 list-unstyled">
      {faqs.map((item, index) => (
        <FaqItem key={index} item={item} />
      ))}
    </ul>
  );
};

export default FaqList;
