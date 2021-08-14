import React from "react";
import { Card, Icon, Button, Tab } from "semantic-ui-react";
import { Link } from "react-router-dom";

function AllCourses({ courses, handleBuyCourse }) {
  return (
    <Card.Group>
      {courses.map((c) => (
        <Card key={c.id}>
          <img
            className="card-img-top"
            src={c.thumbnailURL}
            wrapped
            ui={false}
          />
          <Card.Content>
            <Card.Header>
              <Link to={`/dashboard/${c.id}`}>{c.title}</Link>
            </Card.Header>
            <span className="price">${c.price}</span>
          </Card.Content>
          <Card.Content extra>
            <a>
              <Icon name="video" />
              {c.videoLink.length} Videos
            </a>
            <Button primary onClick={() => handleBuyCourse(c)} floated="right">
              Buy Course
              <Icon name="right chevron" />
            </Button>
          </Card.Content>
        </Card>
      ))}
    </Card.Group>
  );
}

export default AllCourses;
