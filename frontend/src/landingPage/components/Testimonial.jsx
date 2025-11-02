import { BiSolidStar, BiSolidQuoteRight } from "react-icons/bi";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
import { motion } from 'framer-motion';
import 'swiper/css';
import 'swiper/css/pagination';

export const Testimonial21 = (props) => {
    const { heading, description, testimonials } = {
        ...Testimonial21Defaults,
        ...props,
    };

    return (
        <section id="relume" className="overflow-hidden py-16 md:py-24 lg:py-28 bg-gradient-to-b from-[#E9F5F2] to-white">
            <div className="container mb-12 max-w-lg px-[5%] text-center md:mb-18 lg:mb-20">
                <motion.h1 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-5 text-5xl font-bold md:mb-6 md:text-7xl lg:text-8xl text-gray-800"
                >
                    {heading}
                </motion.h1>
                <motion.p 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="md:text-lg text-gray-600"
                >
                    {description}
                </motion.p>
            </div>

            <div className="relative">
                <Swiper
                    modules={[Pagination, Autoplay]}
                    spaceBetween={40}
                    slidesPerView={'auto'}
                    centeredSlides={true}
                    loop={true}
                    autoplay={{
                        delay: 3500,
                        disableOnInteraction: false,
                    }}
                    pagination={{
                        clickable: true,
                    }}
                    className="w-full px-6 pb-14" // Increased padding bottom for pagination dots
                >
                    {testimonials.map((testimonial, index) => (
                        <SwiperSlide key={index} className="max-w-[500px] h-auto">
                            <motion.div 
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.5 }}
                                className="flex flex-col h-[370px] relative p-8 md:p-10 bg-white rounded-2xl shadow-[0_4px_20px_rgba(42,157,143,0.1)] border-2 border-[#2A9D8F] hover:shadow-[0_8px_30px_rgba(42,157,143,0.15)] transition-all duration-300"
                            >
                                <div className="flex-grow">
                                    <BiSolidQuoteRight className="absolute top-6 right-6 text-[#2A9D8F] opacity-15 text-4xl" />
                                    
                                    <div className="mb-6 flex md:mb-7">
                                        {Array(testimonial.numberOfStars)
                                            .fill(null)
                                            .map((_, starIndex) => (
                                                <BiSolidStar key={starIndex} className="size-6 text-[#2A9D8F]"/>
                                            ))}
                                    </div>

                                    <blockquote className="text-lg text-gray-700 font-light italic mb-8 leading-relaxed">
                                        {testimonial.quote}
                                    </blockquote>
                                </div>

                                <div className="flex w-full items-center gap-5">
                                    <div className="relative">
                                        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-[#2A9D8F] to-[#264653] p-[2px]">
                                            <div className="absolute inset-0 rounded-full bg-white"></div>
                                        </div>
                                        <img 
                                            src={testimonial.avatar.src} 
                                            alt={testimonial.avatar.alt} 
                                            className="size-16 rounded-full object-cover relative z-10"
                                        />
                                    </div>
                                    <div>
                                        <p className="font-bold text-xl text-gray-900 mb-1">{testimonial.name}</p>
                                        <p className="text-sm text-gray-600">
                                            <span className="font-medium">{testimonial.position}</span>
                                            <span className="mx-2">•</span>
                                            <span>{testimonial.companyName}</span>
                                        </p>
                                    </div>
                                </div>
                            </motion.div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </section>
    );
};

export const Testimonial21Defaults = {
    heading: "Customer testimonials",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    testimonials: [
        {
            quote: '"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. Duis cursus, mi quis viverra ornare."',
            avatar: {
                src: "https://d22po4pjz3o32e.cloudfront.net/placeholder-image.svg",
                alt: "Testimonial avatar 1",
            },
            name: "Name Surname",
            position: "Position",
            companyName: "Company name",
            numberOfStars: 5,
        },
        {
            quote: '"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. Duis cursus, mi quis viverra ornare."',
            avatar: {
                src: "https://d22po4pjz3o32e.cloudfront.net/placeholder-image.svg",
                alt: "Testimonial avatar 2",
            },
            name: "Name Surname",
            position: "Position",
            companyName: "Company name",
            numberOfStars: 5,
        },
        {
            quote: '"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. Duis cursus, mi quis viverra ornare."',
            avatar: {
                src: "https://d22po4pjz3o32e.cloudfront.net/placeholder-image.svg",
                alt: "Testimonial avatar 3",
            },
            name: "Name Surname",
            position: "Position",
            companyName: "Company name",
            numberOfStars: 5,
        },
        {
            quote: '"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. Duis cursus, mi quis viverra ornare."',
            avatar: {
                src: "https://d22po4pjz3o32e.cloudfront.net/placeholder-image.svg",
                alt: "Testimonial avatar 4",
            },
            name: "Name Surname",
            position: "Position",
            companyName: "Company name",
            numberOfStars: 5,
        },
        {
            quote: '"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. Duis cursus, mi quis viverra ornare."',
            avatar: {
                src: "https://d22po4pjz3o32e.cloudfront.net/placeholder-image.svg",
                alt: "Testimonial avatar 5",
            },
            name: "Name Surname",
            position: "Position",
            companyName: "Company name",
            numberOfStars: 5,
        },
    ],
};

export default Testimonial21;