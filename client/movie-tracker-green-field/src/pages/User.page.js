import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import UserMovies from "../components/UserMovies";
import Navbar from "../components/Navbar";
import { jwtDecode } from "jwt-decode"; // Fix incorrect import
import "../assets/styles/Profile.css"; // Ensure you have Profile.css

const UserPage = () => {
  const [username, setUsername] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [allMovies, setAllMovies] = useState([]);
  const [favoriteMovies, setFavoriteMovies] = useState([]);
  const [watchedMovies, setWatchedMovies] = useState([]);
  // lists visibilities
  const [viewFavoriteList, setViewFavoriteList] = useState(true);
  const [viewWatchedList, setViewWatchedList] = useState(false);
  // const [viewAllMoviesList, setViewAllMoviesList] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  const navigate = useNavigate();

  let token;
  let decoded;
  // console.log(decoded);

  // Decode the token to retrieve userId
  if (localStorage.getItem("token")) {
    token = localStorage.getItem("token");
    decoded = jwtDecode(token);
  }
  useEffect(() => {
    try {
      // decoded = jwtDecode(token);
      setUsername(decoded.username || "User");
      setIsAuthenticated(true);
      navigate("/user-page");
    } catch (error) {
      console.error("Error decoding token:", error);
      setIsAuthenticated(false);
      navigate("/login"); // Redirect if token decoding fails
    }
  }, []);

  if (!isAuthenticated) {
    return <h1>Redirecting to Login...</h1>; // Show a placeholder while redirecting
  }

  return (
    <div className="profile-container ">
      <Navbar
        username={username}
        setUsername={setUsername}
        isLoggedIn={isLoggedIn}
        setIsLoggedIn={setIsLoggedIn}
      />
      <div className="profile-content ">
        <div className="favorites-section ">
          <h1
            className="welcome-message movie-page-header"
            style={{
              backgroundColor: "#947a4a",
              padding: "0",
              margin: "0",
              paddingTop: "15px",
            }}
          >
            Welcome, {username}!
          </h1>
          <UserMovies
            decoded={decoded}
            allMovies={allMovies}
            setAllMovies={setAllMovies}
            favoriteMovies={favoriteMovies}
            setFavoriteMovies={setFavoriteMovies}
            watchedMovies={watchedMovies}
            setWatchedMovies={setWatchedMovies}
            viewFavoriteList={viewFavoriteList}
            setViewFavoriteList={setViewFavoriteList}
            viewWatchedList={viewWatchedList}
            setViewWatchedList={setViewWatchedList}
            // viewAllMoviesList={viewAllMoviesList}
            // setViewAllMoviesList={setViewAllMoviesList}
          />
        </div>
      </div>
    </div>
  );
};

export default UserPage;
