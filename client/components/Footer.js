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
            <a href="https://github.com/Fullsnack-2201-CS-Team-06/Fullsnack">
              GitHub Repo
            </a>
          </div>
          <div id={styles.creatorsContainer}>
            <p>CREATORS</p>
            <a href="https://www.linkedin.com/in/evangarris">
              <img src="/linkedin.png" />
              Evan Garris
            </a>
            <a href="https://www.linkedin.com/in/david-w-dunham/">
              <img src="/linkedin.png" />
              David Dunham
            </a>
            <a href="https://www.linkedin.com/in/lynchharrison/">
              <img src="/linkedin.png" />
              Harrison Lynch
            </a>
            <a href="https://www.linkedin.com/in/kvcodesnacts/">
              <img src="/linkedin.png" />
              Kevin Veloso
            </a>
          </div>
        </Container>
        <Container id={styles.footerLogoContainer}>
          <h1 className={styles.logo}>
            <a id={styles.logoLink} href="/">FULLSNACK</a>
          </h1>
          <p id={styles.copyright}>Copyright © 2022</p>
        </Container>
      </Container>
    </div>
  );
};

export default Footer;
