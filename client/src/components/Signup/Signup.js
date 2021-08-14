import {
  Button,
  Form,
  Message,
  Segment,
  Grid,
  Header,
} from "semantic-ui-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { BASE_API_URL } from "../../utils/constants";

const Signup = () => {
  const [error, setError] = useState(false);
  const [errormsg, setErrormsg] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState({ email: "", password: "" });
  const { email, password } = user;
  const handleSubmit = () => {
    setLoading(true);
    const data = user;
    fetch(`${BASE_API_URL}/api/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        setLoading(false);
        const {
          success,
          data: { message },
        } = data;
        if (success) {
          setSuccess(true);
        } else {
          setErrormsg(message);
          setError(true);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        setLoading(false);
        setError(true);
      });
  };
  const handleChange = (e, { value, name }) => {
    setUser({ ...user, ...{ [name]: value } });
  };

  if (success) {
    return (
      <Grid
        textAlign="center"
        style={{ height: "100vh" }}
        verticalAlign="middle"
      >
        <Grid.Column style={{ maxWidth: 450 }}>
          <Message positive>
            <Message.Header>Your signup is sucessfully done</Message.Header>
            <p>
              Click <Link to="/">here</Link> to login
            </p>
          </Message>
        </Grid.Column>
      </Grid>
    );
  }

  return (
    <Grid textAlign="center" style={{ height: "100vh" }} verticalAlign="middle">
      <Grid.Column style={{ maxWidth: 450 }}>
        <Header as="h2" color="black" textAlign="center">
          Sign Up , It's quick and easy.
        </Header>

        <Form size="large" onSubmit={handleSubmit}>
          <Segment stacked>
            <Form.Input
              name="email"
              value={user.email}
              onChange={handleChange}
              fluid
              icon="user"
              iconPosition="left"
              placeholder="E-mail address"
            />
            <Form.Input
              fluid
              name="password"
              value={user.password}
              onChange={handleChange}
              icon="lock"
              iconPosition="left"
              placeholder="Password"
              type="password"
            />
            {error && (
              <Message negative onDismiss={() => setError(false)}>
                <Message.Header>
                  {errormsg ? errormsg : "Something went wrong."}
                </Message.Header>
              </Message>
            )}
            <Button
              disabled={!(email.length && password.length) || loading}
              loading={loading}
              color="green"
              fluid
              size="large"
            >
              Sign Up
            </Button>
          </Segment>
        </Form>
        <Message>
          Already have an account ? <Link to="/">Login</Link>
        </Message>
      </Grid.Column>
    </Grid>
  );
};

export default Signup;
