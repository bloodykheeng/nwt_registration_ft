import React from "react";
import Lottie from "lottie-react";
import LineLoadingAnimation from "../../assets/mylotties/97930-loading.json";

function CustomIsLoading({ msg = "Loading" }) {
  return (
    <div
      style={{
        display: "flex",
        height: "30px",
        overflow: "hidden"
      }}
    >
      <strong>{msg}</strong>
      <Lottie
        animationData={LineLoadingAnimation}
        style={{}}
        loop={true}
        autoplay={true}
      />
    </div>
  );
}

export default CustomIsLoading;
