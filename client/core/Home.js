import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import '../styles/home.css';
import Album from './Album';
<<<<<<< HEAD
import AuthContext from '../auth/AuthContext';
=======
import G2Logo from '../assets/images/COMP229-Group-2-Logo.png';
>>>>>>> 9b9a5564363ab45b64fa599525eb4fbcf82e1b80

const albumData = [
  { album: 'Echo Park', artist: 'Advantage Lucy', imageSrc: require('../assets/images/albums/echopark.jpg').default },
  { album: 'Kikuo World 2', artist: 'Kikuo', imageSrc: require('../assets/images/albums/kikuoworld2.jpg').default},
  { album: 'Blue', artist: 'Garoad', imageSrc: require('../assets/images/albums/blue.jpg').default},
  { album: 'Collapse of the sky', artist: 'Yuyoyuppe', imageSrc: require('../assets/images/albums/collapseofthesky.jpg').default},
  { album: 'Don\'t Waste Me', artist: 't+pazolite', imageSrc: require('../assets/images/albums/dontwasteme.png').default},
  { album: 'Drive On', artist: 'Team UHS', imageSrc: require('../assets/images/albums/driveon.jpg').default},
  { album: 'Frequency', artist: 'BartleBeats', imageSrc: require('../assets/images/albums/frequency.jpg').default},
  { album: 'Anatolia', artist: 'Feed Me Jack', imageSrc: require('../assets/images/albums/anatolia.jpg').default},
  { album: 'Hue', artist: 'Mili', imageSrc: require('../assets/images/albums/hue.jpg').default},
  { album: 'Hysteresis', artist: 'Electrocutica', imageSrc: require('../assets/images/albums/hysteresis.jpg').default},
  { album: 'MARU163', artist: 'Beat Shobon', imageSrc: require('../assets/images/albums/MARU163.png').default},
  { album: 'Millennium Mother', artist: 'Mili', imageSrc: require('../assets/images/albums/millenniummother.jpg').default},
];

const Home = () => {
  const { isSignedIn } = useContext(AuthContext);

  return (
    <div className="home">
      <header>
        <h1 className="title">Welcome to MelodyMart!</h1>
      </header>
      <main>
        <section className="about">
          <h2>About Us</h2>
          <p>
            Unleash the power of your passion for music with MelodyMart – where every note finds its perfect home. Discover, share, and elevate your musical journey on MelodyMart, the ultimate online platform for music enthusiasts. From chart-topping hits to <em>hidden gems</em>, our virtual aisles are stocked with a symphony of choices. Your melody, your way – only at MelodyMart!
          </p>
        </section>
        <section>
          <h2>New Arrivals</h2>
          <div className="grid-container">
            {albumData.map((data, index) => (
              <Album key={index} {...data} />
            ))}
          </div>
        </section>
        {!isSignedIn && (
          <section className="signup-option">
            <p>
              Ready to explore? <Link to="/signup">Sign up</Link> to discover more music!
            </p>
          </section>
        )}
      </main>
      <footer>
        <p>&copy; 2023 G2-Solutions. All rights reserved.</p>
        <img className="g2logo" src={G2Logo} />
      </footer>
    </div>
  );
};

export default Home;
