// import Home from "@/feature/home/index";
import { Loader } from "@mantine/core";
import { Suspense } from "react";
import Home from "../../../feature";

const HomePage = () => {
  return (
    <div
      style={{
        backgroundImage: "url('/images/iStock_500016164.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      
      }}
    >
      <Suspense
        fallback={
          <div
            style={{
              display: "flex",
              width: "100%",
              justifyContent: "center",
              marginTop: 20,
            }}
          >
            <Loader color="red" type="bars" />
          </div>
        }
      >
        <Home />
      </Suspense>
    </div>
  );
};

export default HomePage;

