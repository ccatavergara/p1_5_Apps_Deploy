import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const ImageUploadComponent = ({ onUpload, postId }) => {
  const [selectedImages, setSelectedImages] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [images, setImages] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    // Realizar una solicitud GET al backend para obtener las imágenes del post
    const fetchImages = async () => {
      try {
        const headers = {
          Authorization: `Bearer ${token}`,
        };

        const response = await axios.get(
          `http://127.0.0.1:3000/api/v1/posts/${postId}/images`,
          { headers }
        );

        // Actualizar el estado con las imágenes obtenidas
        setImages(response.data.images);
      } catch (error) {
        console.error("Error al obtener las imágenes:", error);
      }
    };

    fetchImages(); // Llama a la función al cargar el componente
  }, [postId, token]);

  const handleImageChange = (e) => {
    const files = e.target.files;
    setSelectedImages(files);
  };

  const handleImageUpload = async () => {
    if (selectedImages.length === 0) {
      return;
    }

    try {
      setUploading(true);
      const formData = new FormData();

      for (let i = 0; i < selectedImages.length; i++) {
        formData.append("files[]", selectedImages[i]);
      }

      await axios.post(
        `http://127.0.0.1:3000/api/v1/posts/${postId}/upload_images`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setSelectedImages([]);
    } catch (error) {
      console.error("Error al cargar las imágenes:", error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div>
      <input type="file" multiple onChange={handleImageChange} />
      <button variant="contained"
                sx={{ ml: 2, mt: 1, mb: 2, alignSelf: 'flex-start' }}
                onClick={handleImageUpload}>Upload</button>
    </div>
  );
};

export default ImageUploadComponent;
