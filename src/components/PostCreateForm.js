import React, { useRef, useState } from "react";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Alert from "react-bootstrap/Alert";
import Image from "react-bootstrap/Image";
import Asset from "../components/Asset";
import Upload from "../assets/addpost.png";
import { useRedirect } from "../hooks/useRedirect";
import appStyles from "../App.module.css";
import btnStyles from "../styles/Button.module.css";
import { useHistory } from "react-router";
import { axiosReq } from "../api/axiosDefaults";

function PostCreateForm() {
  useRedirect("loggedOut");

  const [errors, setErrors] = useState({});

  const [postData, setPostData] = useState({
    title: "",
    category: "",
    image: "",
    content: "",
  });

  const { title, image, content } = postData;

  const imageInput = useRef(null);

  const history = useHistory();

  // handles state changes for post title and content
  const handleChange = (event) => {
    setPostData({
      ...postData,
      [event.target.name]: event.target.value,
    });
  };

  // handles state changes for post image
  const handleChangeImage = (event) => {
    if (event.target.files.length) {
      URL.revokeObjectURL(image);
      setPostData({
        ...postData,
        image: URL.createObjectURL(event.target.files[0]),
      });
    }
  };


  // posts data to API, checks for errors
  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();

    formData.append("title", title);
    formData.append("image", imageInput.current.files[0]);
    formData.append("content", content);

    try {
      const { data } = await axiosReq.post("/posts/", formData);
      history.push(`/posts/${data.id}`);
    } catch (err) {
      console.log(err);
      if (err.response?.status !== 401) {
        setErrors(err.response?.data);
      }
    }
  };

  return (
    <Form className={appStyles.Form} onSubmit={handleSubmit}>
      <Row>
        <Col className="pt-3">
          <Container>
            <Form.Group>
              <Form.Label className="d-none">Title</Form.Label>
              <Form.Control
                type="text"
                name="title"
                placeholder="Title"
                value={title}
                onChange={handleChange}
              />
            </Form.Group>
            {errors?.title?.map((message, idx) => (
              <Alert className={appStyles.Alert} variant="warning" key={idx}>
                {message}
              </Alert>
            ))}
          </Container>
        </Col>
      </Row>
      <Row>
      </Row>
      <Row>
        <Col className="pt-3">
          <Container>
            <Form.Group className="text-center">
              {image ? (
                <>
                  <figure>
                    <Image className={appStyles.Image} src={image} rounded />
                  </figure>
                  <div>
                    <Form.Label
                      className={`${btnStyles.Button} ${btnStyles.Yellow} btn`}
                      htmlFor="image-upload"
                    >
                      Change the image
                    </Form.Label>
                  </div>
                </>
              ) : (
                <Form.Label
                  className="d-flex justify-content-center"
                  htmlFor="image-upload"
                >
                  <Asset
                    src={Upload}
                    message="Click or tap to upload an image"
                  />
                </Form.Label>
              )}

              <Form.File
                className={appStyles.File}
                id="image-upload"
                accept="image/*"
                onChange={handleChangeImage}
                ref={imageInput}
              />
            </Form.Group>
            {errors?.image?.map((message, idx) => (
              <Alert className={appStyles.Alert} variant="warning" key={idx}>
                {message}
              </Alert>
            ))}
          </Container>
        </Col>
      </Row>
      <Row>
        <Col className="pt-3">
          <Container>
            <Form.Group>
              <Form.Label className="d-none">Content</Form.Label>
              <Form.Control
                as="textarea"
                name="content"
                placeholder="Content"
                rows={5}
                value={content}
                onChange={handleChange}
                className={`${appStyles.Input} ${appStyles.Content}`}
              />
            </Form.Group>
            {errors?.content?.map((message, idx) => (
              <Alert className={appStyles.Alert} variant="warning" key={idx}>
                {message}
              </Alert>
            ))}
          </Container>
        </Col>
      </Row>
      <Row>
        <Col>
          <Container className="d-flex justify-content-center mt-3 mb-3">
            <Button
              className={`${btnStyles.Button} ${btnStyles.Bright} ${appStyles.Button}`}
              onClick={() => history.goBack()}
            >
              cancel
            </Button>
            <Button
              className={`${btnStyles.Button} ${btnStyles.Bright} ${appStyles.Button}`}
              type="submit"
            >
              create
            </Button>
          </Container>
        </Col>
      </Row>
    </Form>
  );
}

export default PostCreateForm;