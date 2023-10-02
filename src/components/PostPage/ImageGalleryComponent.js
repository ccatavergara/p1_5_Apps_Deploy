import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ImageGalleryComponent = ({ postId }) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [images, setImages] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const headers = {
          Authorization: `Bearer ${token}`,
        };

        const response = await axios.get(
          `http://127.0.0.1:3000/api/v1/posts/${postId}/images`,
          { headers }
        );

        setImages(response.data.images);
      } catch (error) {
        console.error("Error fetching images:", error);
      }
    };

    fetchImages();
  }, [postId, token]);

  const handleImageClick = (image) => {
    setSelectedImage(image);
  };

  const handleCloseModal = () => {
    setSelectedImage(null);
  };

  return (
    <div>
      <h2>Image Gallery</h2>
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {images.map((image, index) => (
          <img
            key={index}
            src={`http://127.0.0.1:3000${image}`}
            alt={`uploaded-${index}`}
            style={{ width: '100px', height: '100px', margin: '5px', cursor: 'pointer' }}
            onClick={() => handleImageClick(image)}
          />
        ))}
      </div>

      {selectedImage && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
          onClick={handleCloseModal}
        >
          <img
            src={`http://127.0.0.1:3000${selectedImage}`}
            alt="selected"
            style={{ maxWidth: '80%', maxHeight: '80%', cursor: 'pointer' }}
          />
        </div>
      )}
    </div>
  );
};

export default ImageGalleryComponent;
