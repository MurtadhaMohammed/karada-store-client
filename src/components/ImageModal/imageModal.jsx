"use client";
import { useState, useEffect, useRef, useCallback } from "react";
import { FiArrowLeft, FiArrowRight } from "react-icons/fi";
import { RxCross2 } from "react-icons/rx";
import Image from "next/image";

const ImageModal = ({ isOpen, initialIndex, images, onClose }) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex || 0);
  const [imageLoaded, setImageLoaded] = useState(true);
  const containerRef = useRef(null);
  const prevThumbnailOffsetRef = useRef(0);

  const prevImage = () => {
    setCurrentIndex((prevIndex) => {
      const newIndex = (prevIndex - 1 + images.length) % images.length;
      return newIndex;
    });
  };

  const nextImage = () => {
    setCurrentIndex((prevIndex) => {
      const newIndex = (prevIndex + 1) % images.length;
      return newIndex;
    });
  };

  const handleCloseModal = () => {
    onClose();
    setCurrentIndex(0);
  };

  const scrollToImage = useCallback(
    (index) => {
      if (containerRef.current) {
        const thumbnail = containerRef.current.children[0].children[index];
        if (thumbnail) {
          const thumbnailOffset = thumbnail.offsetLeft;
          if (index > 6) {
            const prevThumbnailOffset = prevThumbnailOffsetRef.current;
            if (
              thumbnailOffset > prevThumbnailOffset &&
              images.length - 8 > index
            ) {
              containerRef.current.scrollBy({
                left: 70,
                behavior: "smooth",
              });
            } else if (thumbnailOffset < prevThumbnailOffset) {
              containerRef.current.scrollBy({
                left: -70,
                behavior: "smooth",
              });
            }
            prevThumbnailOffsetRef.current = thumbnailOffset;
          }
        }
      }
    },
    [images]
  );

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  useEffect(() => {
    setImageLoaded(false);
    scrollToImage(currentIndex);
  }, [currentIndex]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-white flex items-center justify-center">
      <div className="relative w-full h-full flex flex-col items-center">
        <button
          onClick={handleCloseModal}
          className="absolute top-4 right-4 md:right-8 text-gray-500 text-xl p-3 rounded-full bg-gray-200 z-10 transition-colors duration-200 hover:bg-gray-300"
        >
          <RxCross2 />
        </button>
        {currentIndex < images?.length - 1 && (
          <button
            onClick={nextImage}
            className="absolute left-4 md:left-8 top-1/2 transform -translate-y-1/2 text-gray-500 text-3xl p-3 rounded-full bg-gray-200 z-20 transition-transform duration-200 hover:bg-gray-300"
          >
            <FiArrowLeft />
          </button>
        )}
        <div className="flex-1 flex items-center justify-center w-full max-w-screen-lg p-4 relative z-1">
          <div className="relative w-[500px] h-full max-h-full flex items-center justify-center z-1">
            <div
              className={`relative w-full h-full transition-opacity duration-500 ease-in-out ${
                imageLoaded ? "opacity-100" : "opacity-0"
              }`}
            >
              <Image
                key={currentIndex}
                src={images[currentIndex]}
                fill
                style={{ objectFit: "contain" }}
                alt="Product Image"
                onLoadingComplete={() => setImageLoaded(true)}
              />
            </div>
          </div>
        </div>
        {currentIndex > 0 && (
          <button
            onClick={prevImage}
            className="absolute right-4 md:right-8 top-1/2 transform -translate-y-1/2 text-gray-500 text-3xl p-3 rounded-full bg-gray-200 z-20 transition-transform duration-200 hover:bg-gray-300"
          >
            <FiArrowRight />
          </button>
        )}
        <div
          ref={containerRef}
          className="flex overflow-x-auto mt-4 pb-4 px-4 w-full max-w-screen-lg no-scrollbar "
        >
          <div className="flex space-x-2 mx-auto">
            {images.map((img, index) => (
              <div
                key={index}
                onClick={() => {
                  setCurrentIndex(index);
                }}
                className={`w-[30px] h-[30px] md:w-[60px] md:h-[60px] rounded-[8px] relative overflow-hidden cursor-pointer ${
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
    </div>
  );
};

export default ImageModal;
