import { AppHeader, PatientCard, FhirDateTime } from "@commure/components-core";
import { Card, Elevation } from "@commure/components-foundation";
import { CommureSmartApp, FhirDataQuery } from "@commure/components-data";
import { Bundle, Patient, Appointment } from "@commure/fhir-types/r4/types";
import { Container, Row, Col } from 'react-grid-system';
import SMARTClient from "@commure/smart-core";
import React from "react";
import "./App.css";
import { smartConfig } from "./config";

const smartClient = new SMARTClient(smartConfig);

function App() {
  return (
    <CommureSmartApp client={smartClient}>
      <AppHeader appName="Off the Record" showFullUserName={false} fixedToTop />
      <div className="app-container">
        <Container>
          <Row>
            <Col>
              <h1>Private messages from today's patients</h1>
              <FhirDataQuery queryString="Appointment">
                {({ data, loading }) => {
                  if (loading) {
                    return "Loading...";
                  }
                  if (!data) {
                    return "Error loading data!";
                  }
                  const appointments: Appointment[] = (data as Bundle).entry!.map(
                    value => value.resource as Appointment
                  );
                  return (
                    <div>
                      {appointments.map((appointment, index) => (
                          <Container>
                            <Row>
                              <Col xl={2}>
                                <FhirDateTime value={appointment.start} format="h:mm a" className="appt-time" />
                              </Col>
                              <Col>
                                <Card key={index} interactive={true} elevation={Elevation.TWO} className="card">
                                  <FhirDataQuery queryString={appointment.participant[0].actor!.reference!}>
                                    {({ data }) => (
                                      <PatientCard resource={data} />
                                    )}
                                  </FhirDataQuery>
                                </Card>
                              </Col>
                            </Row>
                          </Container>
                      ))}
                    </div>
                  );
                }}
              </FhirDataQuery>
            </Col>
          </Row>
        </Container>
      </div>
    </CommureSmartApp>
  );
}

export default App;
