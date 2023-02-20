import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import api from "../api/baseUrl";
import axios from "axios";

import Header from "../Header/header.component";
import styles from "./photos.module.scss";

const Photos = () => {
  const albumId = Number(useParams().albumid);

  const [photos, setPhotos] = useState([]);

  useEffect(() => {
    const photosFetch = async () => {
      try {
        const response = await api.get(`/photos`);
        const data = await response.data;

        const albumPhotos = data.filter((photo) => photo.albumId === albumId);
        setPhotos(albumPhotos);
      } catch (err) {
        if (err.response) {
          console.log(err.response.data);
          console.log(err.response.status);
          console.log(err.response.headers);
        } else {
          console.error(err);
        }
      }
    };
    photosFetch();
  }, []);

  return (
    <>
      <div className={styles.header}>
        <Header title="Photos" />
      </div>

      <div className={styles.photosContainer}>
        {photos.map((el) => (
          <div key={el.id} className={styles.card}>
            <p className={styles.cardTitle}>{el.title}</p>
            <img className={styles.cardImage} src={el.url} />
          </div>
        ))}
      </div>
    </>
  );
};

export default Photos;
