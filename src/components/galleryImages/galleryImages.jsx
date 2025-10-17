import { useState, useEffect, useRef } from "react";
import instanceAxios from "../../utils/axios";
import "./galleryImages.css";

function GalleryImages({ personId }) {
    const [images, setImages] = useState([]);
    const [selectedImageIndex, setSelectedImageIndex] = useState(null);
    const [showAll, setShowAll] = useState(false);
    const galleryRef = useRef(null);

    useEffect(() => {
        const fetchImages = async () => {
            try {
                const response = await instanceAxios.get(`/person/${personId}/images`);
                setImages(response.data.profiles);
            } catch (error) {
                console.error("Error fetching gallery images:", error);
            }
        };
        fetchImages();
    }, [personId]);

    const openModal = (index) => {
        setSelectedImageIndex(index);
    };

    const closeModal = () => {
        setSelectedImageIndex(null);
    };

    const goToPrevious = () => {
        if (selectedImageIndex === null) return;
        setSelectedImageIndex((prevIndex) =>
            prevIndex === 0 ? images.length - 1 : prevIndex - 1
        );
    };

    const goToNext = () => {
        if (selectedImageIndex === null) return;
        setSelectedImageIndex((prevIndex) =>
            prevIndex === images.length - 1 ? 0 : prevIndex + 1
        );
    };

    // Affiche seulement les 5 premières images par défaut
    const displayedImages = showAll ? images : images.slice(0, 5);

    return (
        <div className="gallery-container">
            <div className="gallery-images" ref={galleryRef}>
                {displayedImages.map((image, index) => (
                    <img
                        className="gallery-images-item"
                        key={image.file_path}
                        src={`https://image.tmdb.org/t/p/original/${image.file_path}`}
                        alt={image.name}
                        onClick={() => openModal(index)}
                    />
                ))}
                {!showAll && images.length > 5 && (
                    <button
                        className="voir-plus"
                        onClick={() => setShowAll(true)}
                    >
                        Voir plus
                    </button>
                )}
            </div>

            {selectedImageIndex !== null && (
                <div className="modal-overlay" onClick={closeModal}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <button className="modal-close" onClick={closeModal}>
                            &times;
                        </button>
                        <button className="modal-nav modal-prev" onClick={goToPrevious}>
                            &#10094;
                        </button>
                        <img
                            className="modal-image"
                            src={`https://image.tmdb.org/t/p/original/${images[selectedImageIndex].file_path}`}
                            alt={images[selectedImageIndex].name}
                        />
                        <button className="modal-nav modal-next" onClick={goToNext}>
                            &#10095;
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default GalleryImages;
