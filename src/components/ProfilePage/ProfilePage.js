import React, { useState, useRef, useEffect } from "react";
import { useAuthUser } from 'react-auth-kit';
import CircularProgress from "@mui/material/CircularProgress";
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import './ProfilePage.css';
import axios from "axios";


import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import AppBar from '@mui/material/AppBar';

function ProfilePage() {
  const [avatar, setAvatar] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const auth = useAuthUser();
  const email = auth().email;
  const token = localStorage.getItem('token');

  const GET_DATA = gql`
  query {
    user(email: "${email}") {
      id
      firstName
      lastName
      email
      dob
      description
      phone
      createdAt
    }
  }
  `;

  const { loading, error, data } = useQuery(GET_DATA);
  const inputRef = useRef(null);
  const id = data?.user?.id;

  const handleAvatarChange = (event) => {
    const selectedAvatar = event.target.files[0];
    setSelectedImage(selectedAvatar);
  };

  const uploadImage = async () => {
    const formData = new FormData();
    formData.append("avatar", selectedImage);

    try {
      await axios.post(`http://127.0.0.1:3000/api/v1/users/${id}/update_avatar`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("upload succesful");

    } catch (error) {
      console.error("cannot upload image", error);
    }
  };

  const fetchAvatar = async () => {
    try {
      const response = await axios.get(`http://127.0.0.1:3000/api/v1/users/${id}/avatar`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        responseType: 'blob',
      });
      console.log("image found");

      const imageUrl = URL.createObjectURL(response.data);
      setAvatar(imageUrl);
    } catch (error) {
      console.error("no image found", error);
    }
  };

  useEffect(() => {
    fetchAvatar();
  }, [id]);

  if (loading) return <CircularProgress />;
  if (error) return <h1>Error: {error.message}</h1>;
  const userData = data.user;

  return (
    <div className="centered-container">
    <Card
      sx={{
        backdropFilter: `saturate(200%) blur(30px)`,
        position: 'relative',
        mt: -8,
        mx: 3,
        py: 2,
        px: 2,
      }}
    >
      <p className="main-title-profile">
        <b>My profile</b>
      </p>
      <Grid container spacing={3} alignItems="center">
        <Grid item>
        <img
          src={selectedImage ? URL.createObjectURL(selectedImage) : avatar}
          alt="Avatar"
          className="image-settings"
        />
      <input
        type="file"
        accept="image/*"
        onChange={handleAvatarChange}
        ref={inputRef}
        style={{ display: 'none' }}
      />
      <button onClick={() => inputRef.current.click()}>Seleccionar Imagen</button>
      <button onClick={uploadImage}>Subir Foto</button>
          <p><b>Name</b></p>
          <p className="sub-title-profile">{data?.user?.firstName} {data?.user?.lastName}</p>
          <hr></hr>
          <p className="title-profile">
            <b>Description</b>
          </p>
          <p className="sub-title-profile">{data?.user?.description}</p>
          <hr></hr>
          <p className="title-profile">
            <b>Phone</b>
          </p>
          <p className="sub-title-profile">{data?.user?.phone}</p>
          <hr></hr>
          <p className="sub-title-profile">Account create at {data?.user?.createdAt.slice(0, 4)}</p>
        </Grid>
        <Grid item xs={12} md={6} lg={4} sx={{ ml: 'auto' }}>
          <AppBar position="static"></AppBar>
        </Grid>
      </Grid>
      </Card>
    </div>
  );
}

export default ProfilePage;
