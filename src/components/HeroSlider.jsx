import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";

const slides = [
  {
    img: "https://images.unsplash.com/photo-1588072432836-e10032774350?w=1600&q=80",
    title: "Support a Child’s Future",
    subtitle: "Your contribution can change lives forever",
  },
  {
    img: "https://images.unsplash.com/photo-1596495577886-d920f1fb7238?w=1600&q=80",
    title: "Education for Every Child",
    subtitle: "Help build a better tomorrow",
  },
  {
    img: "https://images.unsplash.com/photo-1607746882042-944635dfe10e?w=1600&q=80",
    title: "Together We Can",
    subtitle: "Be the reason someone smiles today",
  },
];

export default function HeroSlider() {
  return (
    <Swiper
      modules={[Autoplay, Pagination]}
      autoplay={{ delay: 3000 }}
      pagination={{ clickable: true }}
      loop
      className="h-[60vh] md:h-[70vh]"
    >
      {slides.map((slide, i) => (
        <SwiperSlide key={i}>
          <div
            className="h-full w-full bg-cover bg-center relative"
            style={{ backgroundImage: `url(${slide.img})` }}
          >
            {/* Overlay */}
            <div className="absolute inset-0 bg-black/40 flex flex-col justify-center items-center text-center px-4">

              <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">
                {slide.title}
              </h1>

              <p className="text-white text-lg mb-6">
                {slide.subtitle}
              </p>

              <button className="bg-brand-blue hover:bg-brand-blue-dark text-white px-6 py-3 rounded-full text-lg">
                Donate Now
              </button>

            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}