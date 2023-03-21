import { useState } from "react";
import axios from "axios";
import { Loading } from "../components/Loading";
import img from "../img/fibonacci.png";

export default function ResetPage() {
  const [delDisable, setDelDisable] = useState(true);
  const [deleting, setDeleting] = useState(false);
  const [code, setCode] = useState("");
  const [error, setError] = useState(false);

  const formSettings = {
    disabled: delDisable,
  };

  const resetIndexes = async () => {
    if (code != parseInt(886785)) {
      setError(true);
    } else {
      setError(false);
      setDeleting(true);
      const response = await axios.post("/api/reset");

      if (response) setDeleting(false);
      window.location.reload();
    }
  };

  return (
    <div style={{ width: "400px" }} className="mx-auto fib">
      <h3>Are you sure you would like to RESET?</h3>
      <div className="py-2 mt-2">
        <button
          className={`btn btn-outline-danger ${delDisable && "disabled"}`}
          onClick={resetIndexes}
        >
          Reset
        </button>
        {error ? (
          <p className="mt-4" style={{ color: "red" }}>
            YOU HAVE ENTERED AN INCORRECT CODE
          </p>
        ) : (
          <>
            <div class="mb-3 mt-4">
              <label className="form-label">Enter Code: </label>
              <input
                className="form-control mx-auto"
                style={{ width: "200px" }}
                value={code}
                {...formSettings}
                onChange={(e) => setCode(e.target.value)}
              />
            </div>
            <div class="mb-3 form-check mt-4">
              <input
                type="checkbox"
                class="form-check-input"
                onChange={() => setDelDisable(!delDisable)}
              />
              <label class="form-check-label" for="exampleCheck1">
                Check to reset Calculated Values
              </label>
            </div>
          </>
        )}
        {deleting && <Loading util="danger" message="Deleting Data" />}
      </div>
      <img src={img} alt="fibonacci_image" style={{ width: "400px" }} />
    </div>
  );
}
