import ContactUs from "./lien-he";
import Display from "./trung-bay";
import Introduce from "./gioi-thieu";
import SilederYoutobe from "./video-youtobe";
import classes from "./App.module.css";
import ShoppingCart from "./gio-hang";

const Home = async () => {
  return (
    <div className={classes.container}>
      <SilederYoutobe />
      <Display />
      <Introduce />
      <ShoppingCart/>
      <ContactUs />
    </div>
  );
};

export default Home;
