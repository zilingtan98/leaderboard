import React, { useEffect, useState } from "react";
import LeaderboardTable, {
  LeaderboardConfig,
  RaceEntry,
} from "./LeaderboardTableProps";
import homeStyles from "@/styles/Table.module.css";
import { addColumn } from "@/request/addColumn";
import { removeColumn } from "@/request/removeColumn";
import { predefined } from "@/request/predefined";
import { queryDisplayTable } from "@/request/queryDisplayTable";
import { updateColumnData } from "@/request/updateColumnData";
interface GroupedData {
  [key: string]: any[];
}
const tableCount = 2; // Number of tables
const names = ["Alice", "Bob", "John"]; // Names for each entry
// const data: RaceEntry[] = [];
let idCounter = 1;
// for (let i = 0; i <= tableCount; i++) {
//   for (let j = 0; j < names.length; j++) {
//     // const uniqueId = `entry_${idCounter}`;
//     data.push({
//       tableId: i,
//       Name: names[j],
//     });
//   }
// }

export default function Home() {
  const [data, setData] = useState<RaceEntry[]>([]);
  const [config, setConfig] = useState<LeaderboardConfig>({
    columns: ["name"],
  });
  const [currGroup, setCurrGroup] = useState<GroupedData>({});
  const [newColumn, setNewColumn] = useState("");
  const [valueAlice, setValueAlice] = useState("");
  const [valueBob, setValueBob] = useState("");
  const [valueJohn, setValueJohn] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenColumn, setIsOpenColumn] = useState(false);
  const [selectedValue, setSelectedValue] = useState("");
  const [raceDisplayValue, setRaceDisplayValue] = useState("");
  const [isOpenConfig, setIsOpenConfig] = useState(false);
  const [selectedConfigValue, setSelectedConfigValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const clearValues = () => {
    setRaceDisplayValue("--Select--");
    setSelectedValue("");
    setSelectedConfigValue("--Select--");
    setNewColumn("");
    setValueAlice("");
    setValueBob("");
    setValueJohn("");
  };

  const reloadData = () => {
    setIsLoading(true);
    queryDisplayTable()
      .then((data) => {
        setData(data);
        setIsLoading(false);
        // Handle the response data
        const excludedProperties = ["id", "raceId", "userId"];
        const keysArray = Object.keys(data[0]).filter(
          (key) => !excludedProperties.includes(key)
        );

        setConfig((prevConfig) => {
          const newColumns = keysArray.filter((key) => !prevConfig.columns.includes(key));
          return {
            ...prevConfig,
            columns: [...prevConfig.columns, ...newColumns],
          };
        });
        updateData(setConfig);
      })

      .catch((error) => {
        console.error("Error:", error);
        setIsLoading(false);
        // Handle the error
      });
  };

  useEffect(() => {
    predefined();
    queryDisplayTable()
      .then((resdata) => {
        setData(resdata);
        setIsLoading(false);
        // Handle the response data
        const excludedProperties = ["id", "raceId", "userId"];
        const keysArray = Object.keys(resdata[0]).filter(
          (key) => !excludedProperties.includes(key)
        );
        setConfig((prevConfig) => {
          const newColumns = keysArray.filter((key) => !prevConfig.columns.includes(key));
          return {
            ...prevConfig,
            columns: [...prevConfig.columns, ...newColumns],
          };
        });
        // console.log(resdata);
        updateData(resdata);
      })
      .catch((error) => {
        console.error("Error:", error);
        setIsLoading(false);
        // Handle the error
      });
    // updateData();
    reloadData();
  }, []);

  const updateData = (data) => {
    // const groupedData: GroupedData = {};
    // data.forEach((entry) => {
    //   const { raceId, ...properties } = entry;
    //   if (!groupedData[raceId]) {
    //     groupedData[raceId] = [];
    //   }
    //   groupedData[raceId].push(properties);
    // });
    // setCurrGroup(groupedData);
    const groupedData: GroupedData = data.reduce((acc: GroupedData, entry: RaceEntry) => {
      const { raceId, ...properties } = entry;
      if (!acc[raceId]) {
        acc[raceId] = [];
      }
      acc[raceId].push(properties);
      return acc;
    }, {});
    
    setCurrGroup(groupedData);
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const toggleConfigDropdown = () => {
    setIsOpenConfig(!isOpenConfig);
  };

  const handleConfigClick = (value: React.SetStateAction<string>) => {
    setSelectedConfigValue(value);
    setIsOpenConfig(false);
  };

  const toggleColumnDropdown = () => {
    setIsOpenColumn(!isOpenColumn);
  };

  const handleItemClick = (value: React.SetStateAction<string>) => {
    if (value == "0") {
      setRaceDisplayValue("Race 1");
    } else if (value == "1") {
      setRaceDisplayValue("Race 2");
    } else if (value == "2") {
      setRaceDisplayValue("Race 3");
    }

    setSelectedValue(value);
    setIsOpen(false);
  };

  const handleAddColumn = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (
      config.columns.some(
        (column) => column.toLowerCase() === newColumn.toLowerCase()
      )
    ) {
      clearValues();
      alert("Column already exists");
      return; // Prevent further execution
    }

    if (!newColumn) {
      clearValues();
      alert("Column cannot be empty");
      return;
    }
    const newColumns = [...config.columns, newColumn];

    setConfig({
      ...config,
      columns: newColumns,
    });

    data.forEach((entry) => {
      if (entry.name === "Alice") {
        entry[newColumn] = 0;
      } else if (entry.name === "Bob") {
        entry[newColumn] = 0;
      } else if (entry.name === "John") {
        entry[newColumn] = 0;
      }
    });

    updateData(data);
    console.log(data);
    clearValues();

    addColumn(newColumn)
      .then((data) => {
        console.log("Response data:", data);
        queryDisplayTable().then((res) => {
          setData(res);
        });
        // Handle the response data
      })
      .catch((error) => {
        console.error("Error:", error);
        // Handle the error
      });
  };

  const handleRemoveColumn = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (newColumn == "Name") {
      clearValues();
      alert("Unable to remove this column");
      return; // Prevent further execution
    }
    const columnNameToRemove = newColumn;
    const updatedColumns = [...config.columns];

    const columnIndexToRemove = updatedColumns.findIndex(
      (column) => column === columnNameToRemove
    );
    if (columnIndexToRemove !== -1) {
      updatedColumns.splice(columnIndexToRemove, 1);
      setConfig({
        ...config,
        columns: updatedColumns,
      });
    } else {
      alert(
        "Column 'Name' cannot be removed. Please enter a valid column name."
      );
    }
    updateData(data);
    clearValues();

    removeColumn(newColumn)
      .then((data) => {
        console.log("Response data:", data);
        // Handle the response data
      })
      .catch((error) => {
        console.error("Error:", error);
        // Handle the error
      });
  };

  const handleSaveToDB = (e: React.FocusEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Check if newColumn already exists

    if (!selectedValue) {
      alert("Please select the current race round.");
      clearValues();
      return;
    }

    if (config.columns.length === 1) {
      alert("You do not have a column available, please create one");
      clearValues();
      return;
    }

    if (selectedConfigValue == "--Select--") {
      alert("Please select a column.");
      clearValues();
      return;
    }

    if (valueAlice) {
      if (!Number.isInteger(parseInt(valueAlice))) {
        alert("Please enter integer value for data.");
        clearValues();
        return;
      }
    }

    data.forEach((entry) => {
      console.log(entry)
      if (entry.raceId.toString() === selectedValue) {
        if (
          entry.name === "Alice" &&
          typeof valueAlice !== "undefined" &&
          valueAlice
        ) {
          entry[selectedConfigValue] = valueAlice;
          updateColumnData(selectedConfigValue, selectedValue, 0, valueAlice);
        } else if (
          entry.name === "Bob" &&
          typeof valueBob !== "undefined" &&
          valueBob
        ) {
          entry[selectedConfigValue] = valueBob;
          updateColumnData(selectedConfigValue, selectedValue, 1, valueBob);
        } else if (
          entry.name === "John" &&
          typeof valueJohn !== "undefined" &&
          valueJohn
        ) {
          entry[selectedConfigValue] = valueJohn;
          updateColumnData(selectedConfigValue, selectedValue, 2, valueJohn);
        }
      }
    });

    updateData(data);
    console.log(data);

    clearValues();
  };

  return (
    <>
      <main>
        <h1 className="ml-16 mt-6 mb-4 text-2xl font-extrabold text-gray-900 dark:text-white">
          <span className="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">
            Apex
          </span>{" "}
          Leaderboard Ranking
        </h1>
        <div className="flex-col">
          <div className={homeStyles.flexContainer}>
            <div className={homeStyles.flexChild}>
              <div>
                <button
                  className="focus:outline-none text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:focus:ring-yellow-900"
                  onClick={reloadData} hidden
                >
                  Load From Database
                </button>
                <h2 className="mb-4 text-xl font-extrabold leading-none tracking-tight text-gray-900 dark:text-white">
                  Toggle Items For Current Race
                </h2>
                <form
                  className="rounded-md border-indigo-500/100 shadow-2xl w-72 border-2 "
                  onSubmit={handleFormSubmit}
                >
                  <div className="m-3">
                    <label className="font-sans text-m">
                      Add/Remove Column
                    </label>
                    <input
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      type="text"
                      placeholder="Enter column name"
                      value={newColumn}
                      onChange={(e) => setNewColumn(e.target.value)}
                    />
                  </div>
                  <div className="flex justify-start">
                    <button
                      className="flex-shrink-0 ml-3 mr-3 mb-5 mt-2 flex items-center justify-center focus:outline-none text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-3 py-2 text-center mr-2 mb-2"
                      type="submit"
                      onClick={handleRemoveColumn}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-6 h-6 mr-2"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                        />
                      </svg>
                      <span>Remove</span>
                    </button>

                    <button
                      className="flex-shrink-0 ml-8 mr-3 mb-5 mt-2 flex items-center justify-center focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-6 py-2.5 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900"
                      type="submit"
                      onClick={handleAddColumn}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-6 h-6 mr-2"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M12 4.5v15m7.5-7.5h-15"
                        />
                      </svg>
                      <span>Add</span>
                    </button>
                  </div>
                </form>

                <form
                  className="mt-4 rounded-md border-indigo-500/100 shadow-2xl w-72 border-2 "
                  onSubmit={handleFormSubmit}
                >
                  <div className="ml-3 mt-2">
                    <label className="font-sans text-m">
                      Select Current Race Round
                    </label>
                    <button
                      id="dropdownDefaultButton"
                      className="min-w-[45%] text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                      type="button"
                      onClick={toggleDropdown}
                    >
                      {raceDisplayValue || "--Select--"}
                      <svg
                        className={`w-4 h-4 ml-2 ${
                          isOpen ? "transform rotate-180" : ""
                        }`}
                        aria-hidden="true"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </button>
                    {isOpen && (
                      <div
                        id="dropdown"
                        className="absolute z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 mt-1"
                      >
                        <ul
                          className="py-2 text-sm text-gray-700 dark:text-gray-200"
                          aria-labelledby="dropdownDefaultButton"
                        >
                          <li>
                            <div
                              className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white cursor-pointer"
                              onClick={() => handleItemClick("0")}
                            >
                              Race 1
                            </div>
                          </li>
                          <li>
                            <div
                              className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white cursor-pointer"
                              onClick={() => handleItemClick("1")}
                            >
                              Race 2
                            </div>
                          </li>
                          <li>
                            <div
                              className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white cursor-pointer"
                              onClick={() => handleItemClick("2")}
                            >
                              Race 3
                            </div>
                          </li>
                        </ul>
                      </div>
                    )}
                  </div>

                  <div className="ml-3 mt-2 mr-5">
                    <label className="font-sans text-m">
                      Select Column to Update
                    </label>
                    <div
                      id="dropdownConfigButton"
                      className="min-w-[50%] text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 cursor-pointer"
                      onClick={toggleConfigDropdown}
                    >
                      <span>{selectedConfigValue || "--Select--"}</span>
                      <svg
                        className={`w-4 h-4 ml-2 ${
                          isOpenConfig ? "transform rotate-180" : ""
                        }`}
                        aria-hidden="true"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        ></path>
                      </svg>
                    </div>
                    {isOpenConfig && (
                      <div
                        id="dropdownConfig"
                        className="absolute z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 mt-1 overflow-y-auto max-h-40"
                      >
                        <ul className="py-2 text-sm text-gray-700 dark:text-gray-200">
                          {config.columns.map(
                            (option, index) =>
                              option !== "name" && (
                                <li key={index}>
                                  <div
                                    className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white cursor-pointer"
                                    onClick={() => handleConfigClick(option)}
                                  >
                                    {option}
                                  </div>
                                </li>
                              )
                          )}
                        </ul>
                      </div>
                    )}
                  </div>

                  <div className="m-3">
                    <label className="font-sans text-m">Data for Alice: </label>
                    <input
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      type="text"
                      placeholder="Enter column value"
                      value={valueAlice}
                      onChange={(e) => setValueAlice(e.target.value)}
                    />
                  </div>
                  <div className="m-3">
                    <label className="font-sans text-m">Data for Bob: </label>
                    <input
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      type="text"
                      placeholder="Enter column value"
                      value={valueBob}
                      onChange={(e) => setValueBob(e.target.value)}
                    />
                  </div>
                  <div className="m-3">
                    <label className="font-sans text-m">Data for John: </label>
                    <input
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      type="text"
                      placeholder="Enter column value"
                      value={valueJohn}
                      onChange={(e) => setValueJohn(e.target.value)}
                    />
                  </div>

                  <div className="flex justify-end">
                    <button
                      className="flex-shrink-0 ml-8 mr-3 mb-5 mt-2 flex items-center justify-center focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-6 py-2.5 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900"
                      type="submit"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-6 h-6 mr-2"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M12 4.5v15m7.5-7.5h-15"
                        />
                      </svg>
                      <span>Add</span>
                    </button>
                  </div>
                </form>
                <h2 className="mb-4 mt-6 text-xl font-extrabold leading-none tracking-tight text-gray-900 dark:text-white">
                  Filter and Generate Race Result
                </h2>
                <form
                  className="mt-4 rounded-md border-indigo-500/100 shadow-2xl w-72 border-2"
                  onSubmit={handleSaveToDB}
                >
                  <div className="ml-3 mt-2">
                    <label className="font-sans text-m">
                      Filter Result By:
                    </label>
                  </div>
                </form>
              </div>
            </div>
            <div className={homeStyles.flexChild}>
              <div>
                {data.length > 0 && (
                  <>
                    <LeaderboardTable
                      config={config}
                      data={currGroup[0]}
                      title={"Race 1"}
                    />
                    <LeaderboardTable
                      config={config}
                      data={currGroup[1]}
                      title={"Race 2"}
                    />
                    <LeaderboardTable
                      config={config}
                      data={currGroup[2]}
                      title={"Race 3"}
                    />
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
