// import { useState, useEffect } from "react";
// import Axios from "axios";
// import { Button } from "react-bootstrap";

function TestingNode() {
  return {
    /* <div className="main">
        <div className="head">
          <h1>🎉🎉 Hi! Have a good day</h1>
        </div>
        <div className="in-out">
          <label>Job Name:</label>
          <input
            type="text"
            onChange={(event) => {
              setJobName(event.target.value);
            }}
          ></input>
          <label>Salary:</label>
          <input
            type="number"
            onChange={(event) => {
              setSalary(event.target.value);
            }}
          ></input>
          <button
            onClick={addToList}
            className="btnAdd"
            style={{ backgroundColor: "#28a745" }}
          >
            Add to list
          </button>
        </div>
        <br /> <br /> <br />
        <h2>Job List</h2>
        <div className="new-cus">
          {jobList.map((val, key) => {
            return (
              <div key={key} className="job">
                <h1>{val.jobName}</h1>
                <h1>{val.salary}</h1>
                <input
                  type="text"
                  placeholder="new job name ..."
                  onChange={(event) => {
                    setNewJobName(event.target.value);
                  }}
                ></input>
                <Button
                  onClick={() => updatedJob(val._id)}
                  style={{ backgroundColor: "#ffc107" }}
                  className="btnUpdate"
                >
                  Update
                </Button>
                <Button
                  onClick={() => deletedJob(val._id)}
                  style={{ backgroundColor: "#dc3545" }}
                  className="btnDelete"
                >
                  Delete
                </Button>
              </div>
            );
          })}
        </div>
      </div> */
  };
}

export default TestingNode;
