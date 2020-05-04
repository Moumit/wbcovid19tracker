import axios from "axios";

export const fetchIndiaData = async () => {
  try {
    const {
      data: { statewise },
    } = await axios.get("https://api.covid19india.org/data.json");
    const stateData = statewise
      .filter((a, b) => a.state !== "Total")
      .sort((a, b) => parseInt(b.confirmed) - parseInt(a.confirmed))
      .map(
        ({
          state,
          confirmed,
          active,
          recovered,
          deaths,
          lastupdatedtime,
          deltaconfirmed,
          deltadeaths,
          deltarecovered,
        }) => {
          return {
            stateName: state,
            confirmed: parseInt(confirmed),
            active: parseInt(active),
            recovered: parseInt(recovered),
            deaths: parseInt(deaths),
            deltaconfirmed: parseInt(deltaconfirmed),
            deltarecovered: parseInt(deltarecovered),
            deltadeaths: parseInt(deltadeaths),
            lastUpdated: lastupdatedtime,
          };
        }
      );
    const totData = statewise
      .filter((a, b) => a.state === "Total")
      .map(
        ({
          confirmed,
          active,
          recovered,
          deaths,
          deltaconfirmed,
          deltadeaths,
          deltarecovered,
        }) => {
          return {
            confirmed: { value: parseInt(confirmed) },
            active: { value: parseInt(active) },
            recovered: { value: parseInt(recovered) },
            deaths: { value: parseInt(deaths) },
            deltaconfirmed: parseInt(deltaconfirmed),
            deltarecovered: parseInt(deltarecovered),
            deltadeaths: parseInt(deltadeaths),
          };
        }
      );
    return { stateData, totData };
  } catch (error) {
    console.log("fetchIndiaData -> error", error);
  }
};


export const fetchWBData = async () => {
  try {
    const res = await axios.get("https://api.covid19india.org/v2/state_district_wise.json");

    const selectstateData = res.data
      .filter((a, b) => a.statecode === "WB")

    // console.log(stateData[0].districtData)

    const distData = selectstateData[0].districtData
      .sort((a, b) => parseInt(b.confirmed) - parseInt(a.confirmed))
      .map(
        ({
          district,
          confirmed,
          active,
          recovered,
          deceased,
        }) => {
          return {
            stateName: district,
            confirmed: parseInt(confirmed),
            active: parseInt(active),
            recovered: parseInt(recovered),
            deaths: parseInt(deceased),
          };
        }
      );

    return { distData };
  } catch (error) {
    console.log("fetchWBData -> error", error)
  }
}

export const fetchWBTotalCnt = async () => {
  try {
    const { data: { statewise } } = await axios.get("https://api.covid19india.org/data.json");
    const { confirmed, active, recovered,
      deaths, deltaconfirmed, deltadeaths, deltarecovered } = statewise.find((a, b) => a.state === 'West Bengal');
    return {
      confirmed: { value: parseInt(confirmed) },
      active: { value: parseInt(active) },
      recovered: { value: parseInt(recovered) },
      deaths: { value: parseInt(deaths) },
      deltaconfirmed: parseInt(deltaconfirmed),
      deltarecovered: parseInt(deltarecovered),
      deltadeaths: parseInt(deltadeaths),
    }
  } catch (error) {
    console.log("fetchWBTotalCnt -> error", error)
  }
}