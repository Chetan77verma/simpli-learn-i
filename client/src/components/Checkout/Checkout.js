import React, { useState } from "react";
import { Button, Form as SemanticForm, Grid } from "semantic-ui-react";
import { Form, Field } from "react-final-form";
import Card from "./Card";
import OTP from "./OTP";
import { useLocation } from "react-router-dom";
import {
  formatCreditCardNumber,
  formatCVC,
  formatExpirationDate,
} from "../../utils/helper";
function Checkout() {
  const [submitted, setSubmitted] = useState(false);
  const { state } = useLocation();

  const onSubmit = (values) => {
    setSubmitted(true);
  };
  if (submitted) {
    return <OTP course={state?.course} />;
  }
  return (
    <Form
      onSubmit={onSubmit}
      render={({
        handleSubmit,
        form,
        submitting,
        pristine,
        values,
        active,
      }) => {
        return (
          <Grid
            textAlign="center"
            style={{ height: "100vh" }}
            verticalAlign="middle"
          >
            <Grid.Column style={{ maxWidth: 450 }}>
              <Card
                number={values.number || ""}
                name={values.name || ""}
                expiry={values.expiry || ""}
                cvc={values.cvc || ""}
                focused={active}
              />
              <SemanticForm
                style={{ textAlign: "left" }}
                onSubmit={handleSubmit}
              >
                <div className="field">
                  <Field
                    name="number"
                    component="input"
                    parse={(v) => v.slice(0, 19)}
                    type="text"
                    pattern="[\d| ]{19}"
                    placeholder="Card Number"
                    format={formatCreditCardNumber}
                  />
                </div>
                <div className="field">
                  <Field
                    name="name"
                    component="input"
                    parse={(v) => {
                      if (/\d/.test(v)) {
                        return "";
                      } else {
                        return v;
                      }
                    }}
                    type="text"
                    placeholder="Name"
                  />
                </div>
                <div className="field">
                  <Field
                    name="expiry"
                    component="input"
                    parse={(v) => v.slice(0, 5)}
                    type="text"
                    pattern="\d\d/\d\d"
                    placeholder="Valid Thru"
                    format={formatExpirationDate}
                  />
                </div>
                <div className="field">
                  <Field
                    name="cvc"
                    component="input"
                    parse={(v) => {
                      if (isNaN(v)) {
                        return "";
                      }
                      return v.slice(0, 3);
                    }}
                    type="text"
                    pattern="\d{3}"
                    placeholder="CVC"
                    format={formatCVC}
                  />
                </div>

                <div className="checkout-buttons">
                  <Button
                    type="button"
                    onClick={form.reset}
                    disabled={submitting || pristine}
                  >
                    Reset
                  </Button>
                  <Button primary type="submit" disabled={submitting}>
                    Submit
                  </Button>
                </div>
              </SemanticForm>
            </Grid.Column>
          </Grid>
        );
      }}
    />
  );
}

export default Checkout;
