import React from "react";
import Carousel from "react-bootstrap/Carousel";
import "bootstrap/dist/css/bootstrap.min.css";
import styles from './Home.css'; // Import the CSS module

function Home() {
  return (
    <Carousel className={`custom-carousel ${styles.customCarousel}`} data-bs-theme="dark">
      <Carousel.Item>
        <img
          className={styles.carouselImage} // Use className for the image
          src="https://via.placeholder.com/800x400?text=Explore+Our+Collections&bg=f5f5f5"
          alt="Explore Our Collections"
        />
        <Carousel.Caption>
          <h5>Khám phá Bộ sưu tập của Chúng Tôi</h5>
          <p>Tham gia khám phá hàng ngàn tác phẩm từ các thời kỳ khác nhau.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className={styles.carouselImage} // Use className for the image
          src="https://via.placeholder.com/800x400?text=Digital+Resources&bg=eee"
          alt="Digital Resources"
        />
        <Carousel.Caption>
          <h5>Tài nguyên Số</h5>
          <p>
            Truy cập vào một loạt tài nguyên số, bao gồm eBooks, tạp chí, và hơn
            thế nữa.
          </p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className={styles.carouselImage} // Use className for the image
          src="https://via.placeholder.com/800x400?text=Join+Events&bg=e5e5e5"
          alt="Join Events"
        />
        <Carousel.Caption>
          <h5>Tham gia Sự Kiện</h5>
          <p>
            Gia nhập cộng đồng của chúng tôi trong các sự kiện và hoạt động giáo
            dục.
          </p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}

export default Home;
