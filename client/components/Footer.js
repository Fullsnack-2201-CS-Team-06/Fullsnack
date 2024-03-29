import React from 'react';
import { Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import styles from './Footer.module.css';

const Footer = () => {
  return (
    <div id={styles.footer}>
      <Container id={styles.footerContainer}>
        <Container id={styles.footerContentContainer}>
          <div id={styles.siteContainer}>
            <p>SITE</p>
            <a
              href="https://github.com/Fullsnack-2201-CS-Team-06/Fullsnack"
              target="_blank"
            >
              <img src="/github.png" />
              GitHub Repo
            </a>
            <a
              href="https://www.edamam.com/"
              target="_blank"
            >
              <img src="/edamam_logo.jpg" />
              Edamam API
            </a>
            <a
              href="https://formidable.com/open-source/victory/"
              target="_blank"
            >
              <img src="/victory_logo.png" />
              Victory
            </a>
          </div>
          <div id={styles.creatorsContainer}>
            <p>CREATORS</p>
            <a href="https://www.linkedin.com/in/evangarris" target="_blank">
              <img src="/linkedin.png" />
              Evan Garris
            </a>
            <a
              href="https://www.linkedin.com/in/david-w-dunham/"
              target="_blank"
            >
              <img src="/linkedin.png" />
              David Dunham
            </a>
            <a
              href="https://www.linkedin.com/in/lynchharrison/"
              target="_blank"
            >
              <img src="/linkedin.png" />
              Harrison Lynch
            </a>
            <a href="https://www.linkedin.com/in/kvcodesnacts/" target="_blank">
              <img src="/linkedin.png" />
              Kevin Veloso
            </a>
          </div>
        </Container>
        <Container id={styles.footerLogoContainer}>
          <h1 className={styles.logo}>
            <a id={styles.logoLink} href="/">
              FULLSNACK
            </a>
          </h1>
          <p id={styles.copyright}>Copyright © 2022</p>
        </Container>
      </Container>
    </div>
  );
};

export default Footer;
