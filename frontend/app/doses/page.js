import { promises as fs } from "fs"
import path from "path"
import "./page.css"
import Link from "next/link"

const getData = async () => {
  const dosesDirectory = path.join(process.cwd(), "data")
  const dosesJson = await fs.readFile(dosesDirectory + "/sampleDoseResponse.json", "utf8")
  return JSON.parse(dosesJson)
}

export default async function Page() {
  const res = await getData()
  const doses = res.data

  return (
    <div className="page-container">
      <h1 className="page-title">Doses</h1>
      <div className="actions">
        <Link href="/doses/new">
          <button className="cta-button add-button">+ Add new</button>
        </Link>
      </div>
      <table className="ui very basic three column table">
        <thead>
          <tr>
            <th>Patient</th>
            <th>Medication</th>
            <th>Dose time</th>
          </tr>
        </thead>
        <tbody>
          {doses.map((dose, i) => (
            <tr key={`dose${i}`}>
              <td>{dose.patient}</td>
              <td>{dose.medication}</td>
              <td>{new Date(dose.doseTime).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
