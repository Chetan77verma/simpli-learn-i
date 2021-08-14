import React, { useEffect, useState } from "react";
import { Card, Icon, Button, Loader, Message } from "semantic-ui-react";
import { useHistory } from "react-router-dom";
import { BASE_API_URL } from "../../utils/constants";
function BoughtCourses({ courses }) {
  const [loading, setLoading] = useState(true);
  const [boughtCourses, setBoughtCourses] = useState([]);
  const history = useHistory();
  useEffect(() => {
    const token = localStorage.getItem("token");
    fetch(`${BASE_API_URL}/api/boughtcourses`, {
      method: "GET",
      headers: {
        authorization: token,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setBoughtCourses(data.data);
        setLoading(false);
      })
      .catch((e) => {
        setLoading(false);
      });
  }, []);
  const handleViewCourse = (c) => {
    history.push(`/dashboard/${c.id}`);
  };

  if (loading) {
    return <Loader active inline="centered" />;
  }
  if (!boughtCourses.length) {
    return (
      <Message info>
        <Message.Header>Empty page looks bad!</Message.Header>
      </Message>
    );
  }

  return (
    <Card.Group>
      {boughtCourses.map((c) => (
        <Card key={c.id}>
          <img className="card-img-top" src={c.thumbnailURL} ui={false} />
          <Card.Content>
            <Card.Header>{c.title}</Card.Header>
            <span className="price">${c.price}</span>
          </Card.Content>
          <Card.Content extra>
            <a>
              <Icon name="video" />
              {c.videoLink?.length} Videos
            </a>
            <Button
              color="green"
              onClick={() => handleViewCourse(c)}
              floated="right"
            >
              View
            </Button>
          </Card.Content>
        </Card>
      ))}
    </Card.Group>
  );
}

export default BoughtCourses;
