import ContactUs from "./Contact Us";
import Display from "./Display";
import Introduce from "./Introduce";
import SilederYoutobe from "./SilederYoutobe";
import classes from "./App.module.css";
import ShoppingCart from "./ShoppingCart";

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
