import {
  promises as fs
} from "fs";
import path from "path";
import "./page.css";
import Link from "next/link";
import {
  Console
} from "console";
import axios from "axios";

// const getData = async () => {
//   const dosesDirectory = path.join(process.cwd(), "data");
//   const dosesJson = await fs.readFile(
//     dosesDirectory + "/sampleDoseResponse.json",
//     "utf8"
//   );
//   return JSON.parse(dosesJson);
// };

// const getData = async () => {
//   const res = await fetch("http://0.0.0.0:5001/getAllDoses", {
//     method: "GET",
//     cache: "no-store",
//   });
//   const dosesData = res.data;
//   console.log(dosesData);
//   return dosesData;
// };

const getData = async () => {
  const DOSES_GET_ENDPOINT = process.env.DOSES_GET_ENDPOINT;
  const DOSES_ENDPOINT_PORT = process.env.DOSES_ENDPOINT_PORT;
  console.log(`${DOSES_GET_ENDPOINT}:${DOSES_ENDPOINT_PORT}/getAllDoses`);
  try {
    const response = await axios.get(
      `${DOSES_GET_ENDPOINT}:${DOSES_ENDPOINT_PORT}/getAllDoses`, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    );
    const dosesData = response.data;
    // console.log(dosesData);
    return dosesData;
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
};

export default async function Page() {
  const doses = await getData();

  return ( <
    div className = "page-container" >
    <
    h1 className = "page-title" > Doses < /h1> <
    div className = "actions" >
    <
    Link href = "/doses/new" >
    <
    button className = "cta-button add-button" > +Add new < /button> <
    /Link> <
    /div> <
    table className = "ui very basic three column table" >
    <
    thead >
    <
    tr >
    <
    th > Patient < /th> <
    th > Medication < /th> <
    th > Dose time < /th> <
    /tr> <
    /thead> <
    tbody > {
      doses.length > 0 ? (
        doses.map((dose, i) => ( <
          tr key = {
            dose.id
          } >
          <
          td > {
            dose.patient
          } < /td> <
          td > {
            dose.medication
          } < /td> <
          td > {
            new Date(dose.dose_time).toLocaleString()
          } < /td> <
          /tr>
        ))
      ) : ( <
        tr >
        <
        td > No doses available < /td> <
        td > No doses available < /td> <
        td > No doses available < /td> <
        /tr>
      )
    } <
    /tbody> <
    /table> <
    /div>
  );
}
