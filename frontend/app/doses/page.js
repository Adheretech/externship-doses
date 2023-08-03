import { promises as fs } from "fs";
import path from "path";
import "./page.css";
import Link from "next/link";
import { Console } from "console";

// const getData = async () => {
//   const dosesDirectory = path.join(process.cwd(), "data");
//   const dosesJson = await fs.readFile(
//     dosesDirectory + "/sampleDoseResponse.json",
//     "utf8"
//   );
//   return JSON.parse(dosesJson);
// };

const getData = async () => {
  const res = await fetch("http://0.0.0.0:5001/getAllDoses", {
    method: "GET",
    cache: "no-store",
  });
  const dosesData = await res.json();
  console.log(dosesData);
  return dosesData;
};

export default async function Page() {
  const doses = await getData();

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
          {doses.length > 0 ? (
            doses.map((dose, i) => (
              <tr key={dose.id}>
                <td>{dose.patient}</td>
                <td>{dose.medication}</td>
                <td>{new Date(dose.dose_time).toLocaleString()}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td>No doses available</td>
              <td>No doses available</td>
              <td>No doses available</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
