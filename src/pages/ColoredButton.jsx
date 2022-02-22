import { useState } from "react";

const ColoredButton = props => {
  const [isHovering, setIsHovering] = useState(false);

  return (
    <button
      className="coloredButton"
      style={
        isHovering
          ? {
              background: props.color,
              boxShadow: `0px 0px 20px ${props.color}`,
              scale: 1.05,
            }
          : {
              background: props.color,
              color: "#fff",
            }
      }
      type={props.type}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}>
      <i className="bx bxs-chevrons-right"></i>
    </button>
  );
};

export default ColoredButton;
