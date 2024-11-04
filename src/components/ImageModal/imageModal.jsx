"use client";
import { useState, useEffect } from "react";
import { FiArrowLeft, FiArrowRight } from "react-icons/fi";
import { RxCross2 } from "react-icons/rx";
import Image from "next/image";

const ImageModal = ({ isOpen, initialIndex, images, onClose }) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex || 0);
  const [imageLoaded, setImageLoaded] = useState(false);

  const prevImage = () => {
    setImageLoaded(false);
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + images.length) % images.length
    );
  };

  const nextImage = () => {
    setImageLoaded(false);
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  useEffect(() => {
    document.body.style.overflow = "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  useEffect(() => {
    setImageLoaded(false);
  }, [currentIndex]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-white flex items-center justify-center">
      <div className="relative w-full h-full flex flex-col items-center">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 text-3xl p-3 rounded-full bg-gray-200 z-10 transition-colors duration-200 hover:bg-gray-300"
        >
          <RxCross2 />
        </button>
        <div className="flex-1 flex items-center justify-center w-full max-w-screen-lg p-4 relative">
          <button
            onClick={nextImage}
            className="absolute left-4 md:left-8 text-gray-500 text-3xl p-3 rounded-full bg-gray-200 z-2 transition-transform duration-200 hover:bg-gray-300"
          >
            <FiArrowLeft />
          </button>
          <div className="relative w-[500px] h-full max-h-full flex items-center justify-center z-1">
            <div
              className={`relative w-full h-full transition-opacity duration-500 ${
                imageLoaded ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <Image
                key={currentIndex}
                src={images[currentIndex]}
                fill
                style={{ objectFit: 'contain' }}
                alt="Product Image"
                onLoadingComplete={() => setImageLoaded(true)}
              />
            </div>
          </div>
          <button
            onClick={prevImage}
            className="absolute right-4 md:right-8 text-gray-500 text-3xl p-3 rounded-full bg-gray-200 z-2 transition-transform duration-200 hover:bg-gray-300"
          >
            <FiArrowRight />
          </button>
        </div>
        <div className="flex overflow-x-auto mt-4 pb-4 px-4">
          {images.map((img, index) => (
            <div
              key={index}
              onClick={() => {
                setImageLoaded(false);
                setCurrentIndex(index);
              }}
              className={`w-[30px] h-[30px] md:w-[60px] md:h-[60px] rounded-[8px] mx-2 relative overflow-hidden cursor-pointer ${
                currentIndex === index ? "border border-[#975aff]" : ""
              }`}
            >
              <Image
                src={img}
                fill
                style={{ objectFit: "cover" }}
                alt="Thumbnail"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ImageModal;
