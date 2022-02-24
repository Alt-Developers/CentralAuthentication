import { useState } from "react";
import { motion } from "framer-motion";
import { useDispatch } from "react-redux";
import { modalActions } from "../context/modalSlice";
import { refetchActions } from "../context/refetchSlice";

const SimpleModal = props => {
  const [image, setImage] = useState("");
  const dispatch = useDispatch();

  const submitHandler = event => {
    event.preventDefault();
    console.log("into the fetch!");

    const profileChangeFormData = new FormData();
    profileChangeFormData.append("image", image);

    fetch("https://apis.ssdevelopers.xyz/auth/updateUserProfilePicture", {
      method: "POST",
      body: profileChangeFormData,
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
      .then(data => {
        console.log(data.status);
        if (data.status === 200) {
          dispatch(modalActions.closeModal());
          dispatch(refetchActions.refetch());
          setImage("");
        }
        return data.json();
      })
      .then(data => {
        console.log(data);
        if (data.modal) {
          dispatch(
            modalActions.openModal({ header: data.header, text: data.message })
          );
        }
      });
  };

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
              onClick={() => dispatch(modalActions.closeModal())}>
              <i className="bx bx-window-close"></i>
            </button>
            <div className="simpleModal__content">
              {props.image && <img src={props.image} alt="modal image" />}
              {props.text && <p>{props.text}</p>}
              {props.type.type === "CHANGE-PFP" && (
                <form
                  className="simpleModal__changePfp"
                  onSubmit={submitHandler}>
                  <img
                    src={props.type.userProfile}
                    alt="Profile Picture"
                    className="simpleModal__profile"
                  />
                  <i className="bx bxs-right-arrow simpleModal__rarr"></i>
                  <button className="simpleModal__profileButton" type="button">
                    <input
                      onChange={event => {
                        setImage(event.currentTarget.files[0]);
                      }}
                      type="file"
                      accept="image/png, image/gif, image/jpeg, image/jpg"></input>
                    {image ? (
                      <img
                        src={URL.createObjectURL(image)}
                        alt="userProfile"
                        height="150px"
                        width="150px"
                        className="simpleModal__preview"
                      />
                    ) : (
                      <i className="bx bx-image-add simpleModal__imga"></i>
                    )}
                  </button>
                  <button type="submit" className="simpleModal__submit">
                    <i class="bx bx-chevrons-right"></i>
                  </button>
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
