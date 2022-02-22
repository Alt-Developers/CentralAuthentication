import { useState } from "react";
import { motion } from "framer-motion";

const SimpleModal = props => {
  console.log(props.type);

  return (
    <>
      <motion.div
        className="simpleModal__children"
        animate={
          props.isOpen ? { filter: "blur(1.1rem)" } : { filter: "none" }
        }>
        {props.children}
      </motion.div>
      <div
        className="simpleModal__overlay"
        style={
          props.isOpen
            ? { display: "grid", x: 0 }
            : { display: "hidden", x: 1000 }
        }
        // style={{ display: "none", x: 1000 }}
      >
        <div className="simpleModal__wrapper">
          <motion.div
            className="simpleModal"
            animate={
              props.isOpen ? { opacity: 1, y: 0 } : { opacity: 0, y: -200 }
            }>
            <h1 className="simpleModal__header">{props.header}</h1>
            <button
              className="simpleModal__close"
              onClick={props.liftCloseModal}>
              <i className="bx bx-window-close"></i>
            </button>
            <div className="simpleModal__content">
              {props.image && <img src={props.image} alt="modal image" />}
              {props.text && <p>{props.text}</p>}
              {props.type.type === "CHANGE-PFP" && (
                <form className="simpleModal__changePfp">
                  <img
                    src={props.type.userProfile}
                    alt="Profile Picture"
                    className="simpleModal__profile"
                  />
                  <i className="bx bxs-right-arrow simpleModal__rarr"></i>
                  <button>
                    <input
                      type="file"
                      accept="image/png, image/gif, image/jpeg"></input>
                    <i className="bx bx-image-add simpleModal__imga"></i>
                  </button>
                  <button type="submit">Submit</button>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default SimpleModal;
