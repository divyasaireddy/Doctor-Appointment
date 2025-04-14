import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "./Testimonial.css"; // Ensure this file exists

const testimonials = [
    {
      name: "John Doe",
      image: "https://media.istockphoto.com/id/2006436002/video/happy-confident-and-portrait-of-indian-man-in-office-with-creative-professional-at-tech.jpg?s=640x640&k=20&c=vcKAWd0sGJpV3xR0AK1RCM7zTEpFUcBhQEXbNvN1M78=",
      review: "Great service! The doctors were very kind and helpful. Everything was well-organized and efficient. I highly recommend their healthcare services to anyone in need.",
      rating: 5,
    },
    {
      name: "Jane Smith",
      image: "https://media.istockphoto.com/id/1503232125/photo/happy-smile-and-portrait-of-business-man-in-city-for-professional-corporate-and-pride.jpg?s=612x612&w=0&k=20&c=uPu3GKHW507ruenLY8xwsB3OgOSwLSWjE3fBpy20Hac=",
      review: "Excellent care and quick appointments for everyone. The staff was very attentive, and I never had to wait long. The entire experience was smooth and stress-free.",
      rating: 4,
    },
    {
      name: "Alice Brown",
      image: "https://plus.unsplash.com/premium_photo-1689530775582-83b8abdb5020?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cmFuZG9tJTIwcGVyc29ufGVufDB8fDB8fHww",
      review: "The staff was very professional, friendly, and caring. They made sure I was comfortable and answered all my questions with patience. A truly wonderful experience!",
      rating: 5,
    },
    {
      name: "Michael Johnson",
      image: "https://images.unsplash.com/photo-1521119989659-a83eee488004?w=500&q=80",
      review: "Highly recommended! The medical team was exceptional. They took time to explain every detail, ensuring I felt informed and safe throughout my treatment process.",
      rating: 5,
    },
    {
      name: "Emily Davis",
      image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500&q=80",
      review: "I felt safe and well cared for throughout my visit. The environment was clean, and the doctors were extremely knowledgeable and professional. It was a great experience!",
      rating: 5,
    },
    {
      name: "Robert Wilson",
      image: "https://img.freepik.com/free-photo/young-adult-man-wearing-hoodie-beanie_23-2149393636.jpg",
      review: "Great facilities and professional doctors. The entire process from check-in to consultation was seamless. I would definitely recommend this place to my family and friends.",
      rating: 4,
    },
  ];
  

  
const Testimonial = () => {
  return (
    <div className="container mt-5">
    

      <Swiper
        modules={[Pagination]}
        spaceBetween={30}
        slidesPerView={1}
        pagination={{ clickable: true }}
        className="testimonial-swiper"
        breakpoints={{
          640: { slidesPerView: 1, spaceBetween: 20 },
          768: { slidesPerView: 2, spaceBetween: 20 },
          1024: { slidesPerView: 3, spaceBetween: 30 },
        }}
      >
        {testimonials.map((testimonial, index) => (
          <SwiperSlide key={index}>
            <div className="testimonial-card">
              <img src={testimonial.image} alt={testimonial.name} className="testimonial-img" />
              <h5 className="mt-3">{testimonial.name}</h5>
              <p className="text-muted">{testimonial.review}</p>
              <div className="stars">⭐️⭐️⭐️⭐️⭐️</div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Pagination */}
      <div className="swiper-pagination"></div>
    </div>
  );
};

export default Testimonial;
