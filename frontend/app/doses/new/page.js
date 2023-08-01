"use client"

import "./page.css"
import Link from "next/link"
import { Form, Input, Icon } from "semantic-ui-react"

export default function Page() {
  const handleSubmit = () => { }

  return (
    <div className="form-container">
      <Link href="/doses" className="back-link">
        <Icon name="angle left" />
        Return to table
      </Link>
      <h1 className="page-title">Create New Dose</h1>
      <Form onSubmit={handleSubmit}>
        <div className="form-field">
          <label>
            Patient <span className="required">*</span>
          </label>
          <Input />
        </div>
        <div className="form-field">
          <label>
            Medication <span className="required">*</span>
          </label>
          <Input />
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
  )
}
