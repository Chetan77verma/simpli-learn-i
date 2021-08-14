import React, { useState } from "react";
import {
  Segment,
  Header,
  Form,
  Button,
  Message,
  Icon,
} from "semantic-ui-react";
import OtpInput from "react-otp-input";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { BASE_API_URL } from "../../utils/constants";
function OTP({ course }) {
  const [otp, setOtp] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const history = useHistory();

  if (!course) {
    history.push("/dashboard?tabIndex=0");
  }

  const handleChange = (otp) => setOtp(otp);
  const handleSubmit = () => {
    if (otp === "123456") {
      const data = course;
      const token = localStorage.getItem("token");
      setLoading(true);
      fetch(`${BASE_API_URL}/api/buy`, {
        method: "POST", // or 'PUT'
        headers: {
          "Content-Type": "application/json",
          authorization: token,
        },
        body: JSON.stringify(data),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("Success:", data);
          setLoading(false);
          setSuccess(true);
        })
        .catch((error) => {
          console.error("Error:", error);
          setLoading(false);
        });
    } else {
      setError(true);
      setOtp("");
    }
  };
  const handleClear = () => {
    setOtp("");
  };

  if (success) {
    return (
      <Segment
        padded="very"
        stacked
        style={{ width: "max-content", margin: "0 auto", top: "25vh" }}
      >
        <Message positive>
          <Message.Header>Your purchase is sucessfully done</Message.Header>
          <p>
            You can see your bought course by clicking{" "}
            <Link to="/dashboard?tabIndex=1">here</Link>
          </p>
        </Message>
      </Segment>
    );
  }
  return (
    <Segment
      padded="very"
      stacked
      style={{ width: "max-content", margin: "0 auto", top: "25vh" }}
    >
      <Form onSubmit={handleSubmit}>
        <Header>Otp sent on your registered mobile number.</Header>
        <OtpInput
          value={otp}
          className="otp-inputStyle"
          shouldAutoFocus={true}
          isInputNum={true}
          isInputSecure={true}
          onChange={handleChange}
          numInputs={6}
          separator={<span>-</span>}
        />
        {error && (
          <Message negative onDismiss={() => setError(false)}>
            <Message.Header>Please enter valid otp !</Message.Header>
          </Message>
        )}
        <div style={{ marginTop: "15px" }}>
          <Button type="button" disabled={!otp} onClick={handleClear}>
            Clear
          </Button>
          <Button
            loading={loading}
            type="submit"
            primary
            disabled={otp.length !== 6}
          >
            Submit
          </Button>
        </div>
      </Form>
    </Segment>
  );
}

export default OTP;
