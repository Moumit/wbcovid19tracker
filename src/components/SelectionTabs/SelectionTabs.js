import React, { useState, useEffect } from "react";
import { Paper, Tabs, Tab } from "@material-ui/core";
// import SwipeableViews from 'react-swipeable-views';


import "./SelectionTabs.css";
import DataTable from "../DataTable/DataTable";

import Cards from "../Cards/Cards";
import { fetchIndiaData, fetchIndiaGraphData, fetchWBData, fetchWBTotalCnt } from "../../api";

const SelectionTabs = () => {
  const [value, setValue] = useState(0);
  const [data, setData] = useState([]);
  const [wbData, setWBData] = useState({});
  const [wbCnt, setWbTotalCnt] = useState({});
  // console.log({ wbData })
  // console.log({ data })
  useEffect(() => {
    // const fetchData = async () => {
    //   setData(await fetchIndiaData());
    // };
    // fetchData();

    const fetchWBTotCnt = async () => {
      setWbTotalCnt(await fetchWBTotalCnt());
    }
    fetchWBTotCnt();
    const fetchWBCntData = async () => {
      setWBData(await fetchWBData());
    }
    fetchWBCntData();
  }, []);

  const handleChange = (event, newVal) => {
    setValue(newVal);
    if (newVal === 0) {
      const fetchWBTotCnt = async () => {
        setWbTotalCnt(await fetchWBTotalCnt());
      }
      fetchWBTotCnt();
      const fetchWBCntData = async () => {
        setWBData(await fetchWBData());
      }
      fetchWBCntData();
    } else if (newVal === 1) {
      const fetchData = async () => {
        setData(await fetchIndiaData());
      };
      fetchData();
    }
  };

  return (
    <>
      <div className="tab-container">
        <h2>Total Covid 19 record of India</h2>

      </div>

      <div className="tab-container">
        <Paper square className="tab-style">
          <Tabs
            value={value}
            indicatorColor="primary"
            textColor="primary"
            onChange={handleChange}
            centered
          >
            <Tab label="West Bengal's Data" />
            <Tab label="India's Data" />
          </Tabs>
        </Paper>
        <Cards data={wbCnt} value={value} index={0} />
        <DataTable data={wbData} value={value} index={0} />
        <Cards data={data} value={value} index={1} />
        <DataTable data={data} value={value} index={1} />
      </div>
    </>
  );
};

export default SelectionTabs;
