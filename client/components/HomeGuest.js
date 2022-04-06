import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
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
          <Link to="/signup">
            <Button
              className={styles.button}
              variant="primary"
              style={{ fontSize: '20px' }}
            >
              Sign Up
            </Button>
          </Link>
          <Link to="/login">
            <Button
              className={styles.loginBtn}
              variant="outline-primary"
              style={{ fontSize: '20px' }}
            >
              Login
            </Button>
          </Link>
        </div>
        <hr />
        <h2 style={{ margin: '25px', fontSize: '42px' }}>
          Take control of your kitchen life.
        </h2>
        <div className={styles.cardContainer}>
          <Card className={styles.card}>
            <Card.Img
              variant="top"
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQU1Wuo0J-W1BVx5O7F-4zRRT7DZvU9Pz64vQ&usqp=CAU"
              className={styles.cardImg}
            />
            <Card.Body>
              <Card.Title>Shopping Lists</Card.Title>
              <Card.Text>
                Build your shopping lists from a comprehensive list of food
                items.
              </Card.Text>
            </Card.Body>
          </Card>

          <Card className={styles.card}>
            <Card.Img
              variant="top"
              src="https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/hbx100119kitchenalicelane-013-copy-1567786355.jpg?resize=480:*"
              className={styles.cardImg}
            />
            <Card.Body>
              <Card.Title>Pantry</Card.Title>
              <Card.Text>
                Easily receive items from your shopping list into your pantry.
              </Card.Text>
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
                Store your recipes, generate shopping lists and always know if
                you have ingredients in stock.
              </Card.Text>
            </Card.Body>
          </Card>

          <Card className={styles.card}>
            <Card.Img
              variant="top"
              src="https://desikhazana.in/wp-content/uploads/2020/10/chana-masala-fb809bc.jpg"
              className={styles.cardImg}
            />
            <Card.Body>
              <Card.Title>Recommendations</Card.Title>
              <Card.Text>
                Don't know what to cook? Try one of Fullsnack's recommended
                recipes based on your preferences.
              </Card.Text>
            </Card.Body>
          </Card>
        </div>
        <hr />
        <h2 style={{ margin: '25px', fontSize: '62px', fontWeight: 'bold' }}>
          See it in action.
        </h2>
        <a href="https://www.youtube.com/watch?v=ZtcdamXMcks" target="_blank">
          <Button
            className={styles.buttonRed}
            variant="primary"
            style={{ fontSize: '20px', margin: '35px' }}
          >
            Watch Demo
          </Button>
        </a>
        <hr />
      </Container>
    </div>
  );
};

export default HomeGuest;
