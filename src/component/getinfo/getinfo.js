import React, { useState, useEffect } from "react";
import "./getinfo.css";
import axios from "axios";

const Getinfo = () => {
  const [data, setData] = useState([]);
  const [pageCount, setPageCount] = useState(2);
  const [active, setActive] = useState(false);
  const [isActive, setIsActive] = useState(true);

  useEffect(() => {
    const information = async () => {
      const res = await axios.get("https://reqres.in/api/users");
      setPageCount(res.data.total_pages);
      console.log(res.data.page);
      setData(res.data.data);
    };

    information();
  }, []);

  const Getinfo = async () => {
    const newRes = await axios.get(
      `https://reqres.in/api/users?page=${pageCount}`
    );
    let data = newRes.data.data;
    setData(data);
  };

  const next = () => {
    Getinfo(setPageCount(pageCount + 1));
    setIsActive(true);
    setActive(false);
  };

  const prev = () => {
    Getinfo(setPageCount(pageCount - 1));
    setActive(true);
    setIsActive(false);
  };


  return (
    <div>
      <div className="card">
        {data.map((info) => (
          <div className="card-body" key={info.id}>
            <img src={info.avatar} alt="profile" />
            <p>{info.first_name + " " + info.last_name}</p>
            <a href={"mailto:" + info.email}>Contact</a>
          </div>
        ))}
      </div>
      {}
      <div className="btn-place">
        <button className="btn" disabled={isActive} onClick={next}>
          1
        </button>
        <button className="btn" disabled={active} onClick={prev}>
          2
        </button>
      </div>
    </div>
  );
};

export default Getinfo;
