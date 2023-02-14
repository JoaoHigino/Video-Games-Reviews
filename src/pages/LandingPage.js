import React from "react";
import background from "../assets/logovideo.png";
import { useCurrentUser } from "../contexts/CurrentUserContext";
import { Container, Row, Button } from "react-bootstrap";
import btnStyles from "../styles/Button.module.css";
import { Link } from "react-router-dom";
import appStyles from "../App.module.css";
import frame from "../styles/Containers.module.css";
import styles from "../styles/Landing.module.css";
import PostsPage from "./posts/PostsPage";

const LandingPage = () => {
  const currentUser = useCurrentUser();
  const loggedOutLanding = (
    <div className={styles.Styles}>
      <Row>
        <Container className="container-md">
          <Container
            className={`${frame.ContainerBorder} ${frame.FlexHeight} container-md justify-content-center`}
          >
            <Row className="justify-content-center">
              <div>
                <img src={background} alt="background-landing" />
              </div>
            </Row>
            <Row className="justify-content-center">
              <div className="text-center">
                <h5 className={appStyles.Terminal}>
                Do you like to play video games? <p></p>
                Login to be part of our community!
                </h5>
              </div>
            </Row>
            <Row className="justify-content-center">
              <div>
                <Link to="/signin">
                  <Button
                    className={`${btnStyles.ButtonWhite} ${appStyles.Terminal} btn text-uppercase`}
                  >
                    Sign in
                  </Button>
                </Link>
              </div>
              
            </Row>
          </Container>
        </Container>
      </Row>
    </div>
  );

  const loggedInLanding = (
    <div>
      <Container>
        <PostsPage />
      </Container>
    </div>
  );

  return (
    // Shows logo if user is not logged in

    <div>{currentUser ? loggedInLanding : loggedOutLanding}</div>
  );
};

export default LandingPage;