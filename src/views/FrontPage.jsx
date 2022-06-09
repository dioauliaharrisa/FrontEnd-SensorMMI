import React, { useEffect, useState } from "react";
import UnitCard from "../components/UnitCard";
import RoundedBadge from "../components/RoundedBadge";
import DataUpdateColumns from "../components/DataUpdateColumns";
import Dropdown from "../components/Dropdown";
import * as V from "victory";
import {
  VictoryChart,
  VictoryTheme,
  VictoryLine,
  VictoryContainer,
} from "victory";
const axios = require("axios");

export default function FrontPage() {
  const [data, setData] = useState(null);
  const [filteredData, setFilteredData] = useState(null);
  const [filterParameter, setFilterParameter] = useState("debit");
  const [lastRetrievedData, setLastRetrievedData] = useState(null);
  const [lastUpdatedTime, setLastUpdatedTime] = useState(null);

  // useEffect yg hanya jalan diawal
  useEffect(() => {
    axios({
      method: "get",
      url: "http://localhost:3000/data",
    }).then(({ data }) => {
      setData(data.data);
      let modifiedData = data.data[data.data.length - 1];

      setLastUpdatedTime(modifiedData["createdAt"]);

      delete modifiedData["id"];
      delete modifiedData["createdAt"];
      delete modifiedData["updatedAt"];
      setLastRetrievedData(modifiedData);

      const temp = [];

      data.data.filter((e) => {
        const obj = {};
        Object.keys(e).forEach((el) => {
          // console.log(el)
          if (el == filterParameter) {
            obj[filterParameter] = e[filterParameter];
          }
          if (el == "id") {
            obj["id"] = e["id"];
          }
        });

        temp.push(obj);
        return temp;
      });
      setFilteredData(temp);
    });
  }, []);

  // useEffect yg berkali-kali tapi setelah 10s
  useEffect(() => {
    let t;
    t = setInterval(() => {
      (async () => {
        axios({
          method: "get",
          url: "http://localhost:3000/data",
        }).then(({ data }) => {
          setData(data.data);
          let modifiedData = data.data[data.data.length - 1];

          setLastUpdatedTime(modifiedData["createdAt"]);

          delete modifiedData["id"];
          delete modifiedData["createdAt"];
          delete modifiedData["updatedAt"];
          setLastRetrievedData(modifiedData);

          const temp = [];

          data.data.filter((e) => {
            const obj = {};
            Object.keys(e).forEach((el) => {
              if (el == filterParameter) {
                const x = e[filterParameter].split(" ");
                obj["y"] = +x[0];
              }
              if (el == "id") {
                obj["x"] = e["id"];
              }
            });
            temp.push(obj);
            return temp;
          });
          setFilteredData(temp);
        });
      })();
    }, 10000);

    return () => {
      clearInterval(t);
    };
  }, []);

  // console.log(data);
  console.log(filterParameter);

  const iterator = (data) => {
    const rows = [];
    let index = 0;
    for (const element in data) {
      console.log(element, typeof element, 666);
      rows.push(
        <UnitCard
          importedSetFilterParameter={setFilterParameter}
          key={index}
          parameter={element}
          value={data[element]}
        ></UnitCard>
      );
      index++;
    }
    return <div className="grid grid-cols-6 gap-8">{rows}</div>;
  };

  const changeParameter = (x) => {
    console.log(x);
  };

  const homeIcon = () => {
    return <i className="fa-solid fa-house"></i>;
  };
  const logsIcon = () => {
    return <i class="fa-solid fa-list"></i>;
  };
  const configurationIcon = () => {
    return <i class="fa-solid fa-gear"></i>;
  };
  const saveFilesIcon = () => {
    return <i class="fa-solid fa-folder"></i>;
  };

  return (
    <div className="pt-16 px-96">
      {/* First row */}
      <div className="my-5 grid grid-cols-2 gap-4">
        <div className="text-3xl row-span-2">Home</div>
        {/* Ada banyak badges disini */}
        <div className="flex row-span-2 gap-4 justify-self-end">
          <RoundedBadge badgeName={"HOME"} badgeIcon={homeIcon()} />
          <RoundedBadge badgeName={"LOGS"} badgeIcon={logsIcon()} />
          <RoundedBadge
            badgeName={"CONFIGURATION"}
            badgeIcon={configurationIcon()}
          />
          <RoundedBadge badgeName={"SAVE FILES"} badgeIcon={saveFilesIcon()} />
        </div>
      </div>

      {/* Second row */}
      <div className="grid grid-cols-4 gap-4 text-gray-500 ">
        <div className="my-5 p-8 col-span-1 text-sm rounded-md bg-white shadow-lg">
          <div>Last Update</div>
          {lastUpdatedTime && (
            <div className="text-sm text-teal-700">
              {lastUpdatedTime.slice(0, 10) +
                " " +
                lastUpdatedTime.slice(11, 20)}
            </div>
          )}
          <div className="border-t border-gray-500"></div>
          <div className="">Log Summary</div>
          <div className="font-bold">Last 24 Hours</div>

          <DataUpdateColumns title={"Data Transfer"} />

          <DataUpdateColumns title={"Measurement"} />

          <DataUpdateColumns title={"Device Health"} />
        </div>
        {/* Ini untuk chart */}
        <div className="my-5 col-span-3 bg-white rounded-md shadow-lg">
          <div className="grid grid-cols-4">
            <aside className="grid rounded-md ">
              <div className="pt-5 pl-5 text-3xl">{filterParameter}</div>
              {lastRetrievedData && (
                <div className="pl-5 text-3xl">
                  {lastRetrievedData[filterParameter]}
                </div>
              )}
              <div className={"grid grid-cols-2"}>
                <div className="pl-5">Unit ID</div>
                <div className="pl-5">01</div>
                <div className="pl-5">Device ID</div>
                <div className="pl-5 mb-3">SW-02</div>

                <div className="pl-5">Min</div>
                <div className="pl-5">4</div>
                <div className="pl-5">Max</div>
                <div className="pl-5">9</div>
                <div className="pl-5">Median</div>
                <div className="pl-5">6.8</div>
              </div>
            </aside>

            <div className={"col-span-3"}>
              <div className="flex flex-col ">
                <div className="flex flex-row-reverse mt-4 mr-12 ">
                  <Dropdown text={"Select Date"} />
                </div>
                {filteredData && (
                  <VictoryChart
                    theme={VictoryTheme.material}
                    // containerComponent={<VictoryContainer responsive={false} />}
                    width={1000}
                  >
                    <VictoryLine
                      domain={{ x: [0, 1000], y: [0, 200] }}
                      interpolation="natural"
                      style={{
                        data: { stroke: "#c43a31" },
                        parent: { border: "1px solid #ccc" },
                      }}
                      data={filteredData}
                    />
                  </VictoryChart>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Third row */}
      <div className="py-5 flex flex-row-reverse">
        <div className="p-5">
          <Dropdown text={"All Units"} />
        </div>
        <div className="pl-5">
          <Dropdown text={"All Device Type"} />
        </div>
      </div>

      {/* Cards */}
      {lastRetrievedData && iterator(lastRetrievedData)}
    </div>
  );
}
