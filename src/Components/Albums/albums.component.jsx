import React from "react";
import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import Header from "../Header/header.component";
import UserContext from "../../Context/UserContext";
import styles from "./albums.module.scss";
import api from "../api/baseUrl";

const Albums = () => {
  const { userData } = useContext(UserContext);

  const [albumsTitle, setAlbumsTitle] = useState([]);

  useEffect(() => {
    const fetchAlbums = async () => {
      try {
        const response = await api.get(`/users/${userData.id}/albums`);
        const data = await response.data;
        setAlbumsTitle(data);
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
    fetchAlbums();
  }, []);
  return (
    <>
      <div className={styles.header}>
        <Header title="Albums" />
      </div>
      <div className={styles.albumsContainer}>
        {albumsTitle.map((album) => (
          <Link
            key={album.id}
            className={styles.albumTitle}
            to={`/albums/${album.id}/photos`}
          >
            {album.title}
          </Link>
        ))}
      </div>
    </>
  );
};
export default Albums;
