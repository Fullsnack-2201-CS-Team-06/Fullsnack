import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Carousel } from 'react-bootstrap';
import styles from './HomeGuest.module.css';

const sampleImages = [
  'https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fstatic.onecms.io%2Fwp-content%2Fuploads%2Fsites%2F9%2F2017%2F06%2Fgarfield-the-cat-holding-lasagna-FT-BLOG0617.jpg&q=60',
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
            src={sampleImages[0]}
            alt="First slide"
          />
          <Carousel.Caption>
            <h3>First slide label</h3>
            <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src={sampleImages[1]}
            alt="Second slide"
          />

          <Carousel.Caption>
            <h3>Second slide label</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src={sampleImages[2]}
            alt="Third slide"
          />

          <Carousel.Caption>
            <h3>Third slide label</h3>
            <p>
              Praesent commodo cursus magna, vel scelerisque nisl consectetur.
            </p>
          </Carousel.Caption>
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
  return <ControlledCarousel />;
};

export default HomeGuest;