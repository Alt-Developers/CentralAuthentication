import { useSearchParams } from "react-router-dom";
import { CirclePicker } from "react-color";
import { useState } from "react";
import ColoredButton from "./ColoredButton";
import { useEffect } from "react";
import Loading from "../components/Loading";
import { useDispatch } from "react-redux";
import { modalActions } from "../context/modalSlice";
import { useSelector } from "react-redux";
import { refetchActions } from "../context/refetchSlice";

const Dashboard = props => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedColor, setSelectedColor] = useState("#fff");
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [isEditingName, setIsEditingName] = useState(false);
  const [userInfo, setUserInfo] = useState({
    firstName: "Loading",
    lastName: "Loading",
    img: "loading",
  });
  const refetch = useSelector(state => state.refetch.refetchCount);
  const dispatch = useDispatch();
  let serviceHref;
  let serviceName;

  if (searchParams.get("service") === "timetables") {
    serviceHref = "https://timetables.ssdevelopers.xyz";
    serviceName = "Timetables";
  }

  const liftSubmit = event => {
    event.preventDefault();
    console.log(localStorage.getItem("token"));
    console.log("submitted");

    if (
      firstName.length >= 2 &&
      firstName.length <= 20 &&
      lastName.length >= 2 &&
      lastName.length <= 20
    ) {
      fetch("https://apis.ssdevelopers.xyz/auth/updateUserInfo", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
        body: JSON.stringify({
          firstName: firstName,
          lastName: lastName,
          color: selectedColor,
        }),
      })
        .then(data => data.json())
        .then(data => {
          console.log(data.header, data.message);
          if (data.modal)
            dispatch(
              modalActions.openModal({
                header: data.header,
                text: data.message,
              })
            );
          console.log("completed fetch");
          dispatch(refetchActions.refetch());
          setIsEditingName(false);
        });
    } else {
      dispatch(
        modalActions.openModal({
          header: "Invalid Name Lengths",
          text: "First names and last names must be between 2-20 characters",
        })
      );
    }
  };

  useEffect(() => {
    if (localStorage.getItem("token")) {
      fetch("https://apis.ssdevelopers.xyz/auth/getUserData", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
        .then(data => data.json())
        .catch(data => console.log("Errored"))
        .then(data => {
          if (data) {
            console.log(data);
            setSelectedColor(data.color);
            setUserInfo(data);
            setFirstName(data.firstName);
            setLastName(data.lastName);
            setIsLoading(false);
          }
        });
    }
  }, [refetch]);

  useEffect(() => {
    console.log("editing name is:" + isEditingName);
  }, [isEditingName]);

  const colorChangeHandler = color => {
    setSelectedColor(color.hex);
  };
  if (isLoading) {
    return <Loading />;
  } else {
    return (
      <section className="dashboard">
        <section className="timetableNav" style={{ background: selectedColor }}>
          <a href={serviceHref} className="timetableNav__home u-remove-a-eff">
            <h3>&#8249; {serviceName}</h3>
          </a>
        </section>
        <main className="dashboard__main">
          <h1 className="bar__header">Dashboard</h1>
          <div className={`bar`}>
            {isEditingName ? (
              <button
                className="dashboard__profileButton"
                onClick={() => {
                  dispatch(
                    modalActions.openModal({
                      header: "Change Your Profile Picture",
                      text: "Drag and drop your photo or click the box bellow",
                      type: {
                        type: "CHANGE-PFP",
                        userProfile: `https://apis.ssdevelopers.xyz/${userInfo.img}`,
                      },
                    })
                  );
                }}>
                <img
                  src={`https://apis.ssdevelopers.xyz/${userInfo.img}`}
                  alt="hello"
                  height={"25rem"}
                  width={"25rem"}
                  className="dashboard__profile"
                />
                <i className="bx bx-image-add"></i>
              </button>
            ) : (
              <img
                src={`https://apis.ssdevelopers.xyz/${userInfo.img}`}
                alt="hello"
                className="dashboard__profile"
              />
            )}

            <form className="dashboard__right" onSubmit={liftSubmit}>
              <div className="dashboard__name">
                {isEditingName ? (
                  <>
                    <input
                      placeholder="firstname"
                      onChange={event => {
                        setFirstName(event.target.value);
                      }}
                      value={firstName}></input>
                    <input
                      placeholder="lastname"
                      onChange={event => {
                        setLastName(event.target.value);
                      }}
                      value={lastName}></input>
                  </>
                ) : (
                  <h1>
                    {userInfo.firstName} {userInfo.lastName}
                  </h1>
                )}
                {!isEditingName && (
                  <button onClick={() => setIsEditingName(true)} type="button">
                    <i className="bx bx-edit" />
                  </button>
                )}
              </div>

              <div
                className="dashboard__email"
                onClick={() => {
                  if (isEditingName) {
                    props.liftAuthError(
                      "Emails Can't be changed",
                      "Unfortunately if you wanted to change your email you must make a new SS Account.\nThis is for the sake of your own security"
                    );
                  }
                }}>
                <h3 className="">{userInfo.email}</h3>
              </div>

              <div className="dashboard__color">
                <CirclePicker
                  width="400px"
                  className="dashboard__picker"
                  onChange={colorChangeHandler}
                  colors={[
                    "#FF5252",
                    "#4a92ff",
                    "#5df089",
                    "#ffd454",
                    "#c842f5",
                    "#fa46c7",
                  ]}
                  circleSize={40}
                />
                <ColoredButton color={selectedColor} type="submit" />
              </div>
            </form>
          </div>

          {/* <h1 className="bar__header">Authentication</h1>
          <div className="bar dashAuth">
            <input type="text" />
            <input type="text" />
          </div> */}
        </main>
      </section>
    );
  }
};

export default Dashboard;
