import React, { useEffect, useState } from "react";
import { Embed, Segment, Loader, Message } from "semantic-ui-react";
import { useParams, Link } from "react-router-dom";
import { BASE_API_URL } from "../../utils/constants";
function CourseVideos() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [courseVideos, setCourseVideos] = useState([]);
  let { courseId = "" } = useParams();
  const token = localStorage.getItem("token");

  useEffect(() => {
    setLoading(true);
    fetch(`${BASE_API_URL}/api/coursevideos?id=${courseId}`, {
      method: "GET",
      headers: {
        authorization: token,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        const { success } = data;
        if (!success) {
          setError(true);
        }
        setCourseVideos(data.data || []);
        setLoading(false);
      })
      .catch((e) => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <Segment>
        <Loader active inline="centered" />
      </Segment>
    );
  }
  if (error) {
    return (
      <Segment>
        {error && (
          <Message info onDismiss={() => setError(false)}>
            <Message.Header>
              You need to buy this course to view videos , buy from
              <Link to="/dashboard?tabIndex=0"> here</Link>{" "}
            </Message.Header>
          </Message>
        )}
      </Segment>
    );
  }

  return (
    <Segment>
      {courseVideos.map((v) => (
        <>
          <Embed
            id={v.url.split("/").slice(-1)[0]}
            placeholder="https://react.semantic-ui.com/images/image-16by9.png"
            source="youtube"
          />
          <br />
        </>
      ))}
    </Segment>
  );
}

export default CourseVideos;
