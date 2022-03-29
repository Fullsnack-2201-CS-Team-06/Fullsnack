import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Carousel, Container, Button, Card } from 'react-bootstrap';
import styles from './HomeGuest.module.css';

const sampleImages = [
  'https://cdn.vox-cdn.com/thumbor/r2Hr6L8wILmP5xEDaRLxQQ7lbo0=/0x0:3000x2000/1200x800/filters:focal(1260x760:1740x1240)/cdn.vox-cdn.com/uploads/chorus_image/image/65895442/batwing.7.jpg',
  'https://2aj47i3u0emv3rfnwz2zoyfm-wpengine.netdna-ssl.com/wp-content/uploads/2017/09/free-stock-food-photography-websites.jpg',
  'https://rev-a-shelf.com/pub/media/catalog/product/cache/1a0c65074b0390539c8c59125590c7df/3/b/3b24bc8439e0915f3bb9ef609c2bfc39f993395a19d4142fcd2742c8a04f187e.jpeg',
];

function ControlledCarousel() {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

  return (
    <div className={styles.container}>
      <Carousel
        activeIndex={index}
        onSelect={handleSelect}
        className={styles.carousel}
      >
        <Carousel.Item>
          <img
            className="d-block w-100"
            src={sampleImages[1]}
            alt="Second slide"
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src={sampleImages[2]}
            alt="Third slide"
          />
        </Carousel.Item>
      </Carousel>
    </div>
  );
}

// function ControlledCarousel() {
//   const [index, setIndex] = useState(0);

//   const handleSelect = (selectedIndex, e) => {
//     setIndex(selectedIndex);
//   };

//   return (
//     <div>
//       <h1>GUEST HOMEPAGE</h1>
//       <Carousel activeIndex={index} onSelect={handleSelect}>
//         {sampleImages.map((image, i) => {
//           <Carousel.Item key={i}>
//             <img className="d-block w-100" src={image} alt="First slide" />
//             <Carousel.Caption>
//               <h3>First slide label</h3>
//               <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
//             </Carousel.Caption>
//           </Carousel.Item>;
//         })}
//       </Carousel>
//     </div>
//   );
// }

const HomeGuest = () => {
  return (
    <div>
      <ControlledCarousel />
      <Container className={styles.guestHomeContainer}>
        <hr />
        <Container className={styles.container}>
          <h1 className={styles.introduction}>SIMPLIFY YOUR CRAVINGS.</h1>
        </Container>
        <div className={styles.buttonContainer}>
          <Button className={styles.button} variant="primary">
            Learn More
          </Button>
          <Button className={styles.buttonOutline} variant="outline-primary">
            Login
          </Button>
        </div>
        <hr />
        <div className={styles.cardContainer}>
          <Card className={styles.card}>
            <Card.Img
              variant="top"
              src="https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/hbx100119kitchenalicelane-013-copy-1567786355.jpg?resize=480:*"
              className={styles.cardImg}
            />
            <Card.Body>
              <Card.Title>Pantry</Card.Title>
              <Card.Text>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </Card.Text>
              <Button
                variant="outline-primary"
                className={styles.buttonOutline}
              >
                Pantry
              </Button>
            </Card.Body>
          </Card>
          <Card className={styles.card}>
            <Card.Img
              variant="top"
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQU1Wuo0J-W1BVx5O7F-4zRRT7DZvU9Pz64vQ&usqp=CAU"
              className={styles.cardImg}
            />
            <Card.Body>
              <Card.Title>Shopping List</Card.Title>
              <Card.Text>
                Duis aute irure dolor in reprehenderit in voluptate velit esse
                cillum dolore eu fugiat nulla pariatur.
              </Card.Text>
              <Button
                variant="outline-primary"
                className={styles.buttonOutline}
              >
                Shopping List
              </Button>
            </Card.Body>
          </Card>
          <Card className={styles.card}>
            <Card.Img
              variant="top"
              src="https://img.delicious.com.au/fVd1u6k7/w1200/del/2022/02/chicken-chickpea-curry-163942-1.jpg"
              className={styles.cardImg}
            />
            <Card.Body>
              <Card.Title>Recipes</Card.Title>
              <Card.Text>
                Ut enim ad minim veniam, quis nostrud exercitation ullamco
                laboris nisi ut aliquip ex ea commodo consequat.
              </Card.Text>
              <Button
                variant="outline-primary"
                className={styles.buttonOutline}
              >
                Recipes
              </Button>
            </Card.Body>
          </Card>
        </div>
        <hr />
      </Container>
    </div>
  );
};

export default HomeGuest;
