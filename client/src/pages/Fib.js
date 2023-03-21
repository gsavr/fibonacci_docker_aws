import { useEffect, useState } from "react";
import axios from "axios";
import { Loading } from "../components/Loading";

export default function Fib() {
  const [seenIndexes, setSeenIndexes] = useState([]);
  const [values, setValues] = useState({});
  const [index, setIndex] = useState("");
  const [loading, setLoading] = useState(false);
  const [disabled, setDisabled] = useState("disabled");
  const [error, setError] = useState(false);
  // console.log(seenIndexes);
  // console.log(values);
  // console.log(index);

  useEffect(() => {
    fetchValues();
    fetchIndexes();
  }, [index, loading]);

  useEffect(() => {
    if (parseInt(index) < 0 || parseInt(index) > 40 || index === "") {
      setDisabled("disabled");
    } else {
      setDisabled("");
    }
  }, [index]);

  const fetchValues = async () => {
    const values = await axios.get("/api/values/current");

    // console.log(values);
    setValues(values.data);
  };

  const fetchIndexes = async () => {
    const seenIndexes = await axios.get("/api/values/all");

    // console.log(seenIndexes);
    setSeenIndexes(seenIndexes.data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (parseInt(index) < 0 || parseInt(index) > 40 || index === "") {
      setError(true);
    } else {
      setError(false);
      setLoading(true);
      // console.log(index);
      const response = await axios.post("/api/values", {
        index,
      });
      //console.log(response);
      if (response) setLoading(false);
      setIndex("");
    }
  };

  const renderSeenIndexes = () => {
    return seenIndexes
      .slice(seenIndexes.length - 5, seenIndexes.length)
      .map(({ number }) => number)
      .join(", ");
  };

  const renderValues = () => {
    const entries = [];

    for (let key in values) {
      entries.push(
        <div key={key} className="d-flex flex-row justify-content-between">
          <div>For index {key}</div>
          <div className="">...........................</div>
          {loading ? <div>...</div> : <div>{values[key]}</div>}
        </div>
      );
    }
    return entries;
  };

  return (
    <div className="fib">
      <form onSubmit={handleSubmit}>
        <div class="mb-3">
          <label className="form-label">Enter Index between 0 and 40: </label>
          <input
            type="number"
            className="form-control mx-auto"
            style={{ width: "200px" }}
            value={index}
            onChange={(e) => setIndex(e.target.value)}
          />
        </div>
        <button className={`btn btn-info ${disabled}`}>Submit</button>
      </form>
      {error && (
        <div style={{ color: "red" }}>Please enter a supported index</div>
      )}
      {loading && <Loading util="info" message="Working" />}

      <h3 className="mt-5">Latest 5 Indexes Calculated:</h3>
      {renderSeenIndexes()}

      <h3>Calculated Values:</h3>
      <div
        className="d-flex flex-column justify-content-center mx-auto"
        style={{ width: "300px" }}
      >
        {renderValues()}
      </div>
    </div>
  );
}
