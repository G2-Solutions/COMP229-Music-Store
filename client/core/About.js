import React from 'react';
import Navbar from './Navbar';
import '../styles/about.css';

const About = () => {
  return (
    <div className="about">
      <Navbar />
      <h1>About Us</h1>
      <p>Welcome to Our MelodyMart! We are thrilled to introduce our brand new music store, dedicated to providing top-quality musical instruments and accessories for music enthusiasts like you.</p>
      <p>At MelodyMart, our mission is to inspire and support musicians of all levels on their musical journey. We curate a diverse selection of instruments, from guitars and pianos to drums and more, ensuring that you find what you need to create beautiful melodies.</p>
      <p>Thank you for choosing MelodyMart for all your musical needs! We look forward to serving you and being a part of your musical adventures.</p>
      <footer>
        <p>&copy; 2023 G2-Solutions. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default About;