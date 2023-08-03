"use client";

import "./page.css";
import Link from "next/link";
import { Form, Input, Icon } from "semantic-ui-react";
import { useState } from "react";
import { createDose } from "../../../lib/api";

export default function Page() {
  const [patient, setPatient] = useState("");
  const [medication, setMedication] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newDoseInformation = {
      patient: patient,
      medication: medication,
    };
    console.log(JSON.stringify(newDoseInformation));
    console.log(newDoseInformation);
    console.log("Submitted!");

    setMedication("");
    setPatient("");
    const res = await createDose(newDoseInformation);
    console.log(res[0]);
    console.log(res);
    if (res[0]) {
      alert("Submitted Successfully!");
    }
  };

  return (
    <div className="form-container">
      <Link href="/doses" className="back-link">
        <Icon name="angle left" />
        Return to table
      </Link>
      <h1 className="page-title">Create New Dose</h1>
      <Form onSubmit={handleSubmit}>
        <div className="ui form-field error">
          <div className="field">
            <label>
              Patient <span className="required">*</span>
            </label>
            <Input
              placeholder="Patient Name"
              type={"text"}
              value={patient}
              onChange={(e) => setPatient(e.target.value)}
            />
            <div className="ui error message">
              <div className="header">Action Forbidden</div>
              <p>
                You can only sign up for an account once with a given e-mail
                address.
              </p>
            </div>
          </div>
        </div>
        <div className="form-field">
          <label>
            Medication <span className="required">*</span>
          </label>
          <Input
            placeholder="Medication"
            type={"text"}
            value={medication}
            onChange={(e) => setMedication(e.target.value)}
          />
        </div>

        <div className="actions">
          <Link href="/doses">
            <button type="button" className="cta-button secondary">
              Cancel
            </button>
          </Link>
          <button type="submit" className="cta-button primary">
            Save
          </button>
        </div>
      </Form>
    </div>
  );
}
