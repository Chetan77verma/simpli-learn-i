import {
  Button,
  Form,
  Message,
  Segment,
  Grid,
  Header,
  Image,
} from "semantic-ui-react";
import { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { BASE_API_URL } from "../../utils/constants";

const Login = () => {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errormsg, setErrormsg] = useState("");
  const [success, setSuccess] = useState(false);
  const [user, setUser] = useState({ email: "", password: "" });
  const { email, password } = user;
  const history = useHistory();
  const handleSubmit = () => {
    setLoading(true);
    const data = user;
    fetch(`${BASE_API_URL}/api/login`, {
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
          data: { message },
        } = data;
        if (data.data.token) {
          localStorage.setItem("token", data.data.token);
          setSuccess(true);
          history.push("/dashboard?tabIndex=0");
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
  return (
    <Grid textAlign="center" style={{ height: "100vh" }} verticalAlign="middle">
      <Grid.Column style={{ maxWidth: 450 }}>
        <Header as="h2" color="black" textAlign="center">
          Log-in to your account
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
              icon="lock"
              name="password"
              value={user.password}
              onChange={handleChange}
              iconPosition="left"
              placeholder="Password"
              type="password"
            />
            {error && (
              <Message negative onDismiss={() => setError(false)}>
                <Message.Header>
                  {" "}
                  {errormsg ? errormsg : "Something went wrong."}
                </Message.Header>
              </Message>
            )}
            <Button
              primary
              loading={loading}
              disabled={!(email.length && password.length) || loading}
              fluid
              size="large"
            >
              Login
            </Button>
          </Segment>
        </Form>
        <Message>
          New to us ? <Link to="/sign-up"> Signup</Link>
        </Message>
      </Grid.Column>
    </Grid>
  );
};

export default Login;
