import React, { useState } from "react";
import LeaderboardTable, {
  LeaderboardConfig,
  RaceEntry,
} from "./LeaderboardTableProps";

import homeStyles from "@/styles/Table.module.css";

// const config: LeaderboardConfig = {
//   columns: ["Name"],
// };
const tableCount = 3; // Number of tables
const names = ["Alice", "Bob", "John"]; // Names for each entry

const data: RaceEntry[] = [];

for (let i = 1; i <= tableCount; i++) {
  for (let j = 0; j < names.length; j++) {
    data.push({
      tableId: i,
      Name: names[j],
    });
  }
}

// const data: RaceEntry[] = [
//   {
//     Name: "Alice",
//   },
//   {
//     Name: "Bob",
//   },
//   {
//     Name: "John",
//   },
// ];

export default function Home() {
  const [config, setConfig] = useState<LeaderboardConfig>({
    columns: ["Name"],
  });
  const [newColumn, setNewColumn] = useState("");
  const [valueAlice, setValueAlice] = useState("");
  const [valueBob, setValueBob] = useState("");
  const [valueJohn, setValueJohn] = useState("");

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Check if newColumn already exists
    // if (config.columns.includes(newColumn)) {
    //   alert("Column already exists");
    //   return; // Prevent further execution
    // }
    const newColumns = [...config.columns, newColumn];

    setConfig({
      ...config,
      columns: newColumns,
    });
    data.forEach((entry) => {
      entry[newColumn] = "";
    });

    data.forEach((entry) => {
      if (entry.Name === "Alice") {
        entry[newColumn] = valueAlice;
      } else if (entry.Name === "Bob") {
        entry[newColumn] = valueBob;
      } else if (entry.Name === "John") {
        entry[newColumn] = valueJohn;
      }
    });

    setNewColumn("");
    setValueAlice("");
    setValueBob("");
    setValueJohn("");
  };

  return (
    <>
      <main>
        <h1 className="ml-16 mt-9 mb-4 text-4xl font-extrabold text-gray-900 dark:text-white">
          <span className="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">
            Apex
          </span>{" "}
          Leaderboard Ranking
        </h1>
        <div className="flex-col">
          <div className={homeStyles.flexContainer}>
            <div className={homeStyles.flexChild}>
              <div>
                <h2 className="mb-4 text-2xl font-extrabold leading-none tracking-tight text-gray-900 dark:text-white">
                  Input data for Race 1
                </h2>
                <form
                  className="rounded-md border-indigo-500/100 shadow-2xl w-96 border-2 "
                  onSubmit={handleFormSubmit}
                >
                  <div className="m-3">
                    <label className="font-sans text-lg">
                      New Column Name:
                    </label>
                    <input
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      type="text"
                      placeholder="Enter column name"
                      value={newColumn}
                      onChange={(e) => setNewColumn(e.target.value)}
                    />
                  </div>
                  <div className="m-3">
                    <label className="font-sans text-lg">
                      Data for Alice:{" "}
                    </label>
                    <input
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      type="text"
                      placeholder="Enter column value"
                      value={valueAlice}
                      onChange={(e) => setValueAlice(e.target.value)}
                    />
                  </div>
                  <div className="m-3">
                    <label className="font-sans text-lg">Data for Bob: </label>
                    <input
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      type="text"
                      placeholder="Enter column value"
                      value={valueBob}
                      onChange={(e) => setValueBob(e.target.value)}
                    />
                  </div>
                  <div className="m-3">
                    <label className="font-sans text-lg">Data for John: </label>
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
                      className="flex-shrink-0 ml-2 mr-3 mb-5 mt-2 flex items-center justify-center focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900"
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
                      <span>Add Column</span>
                    </button>
                  </div>
                </form>
              </div>
            </div>
            <div className={homeStyles.flexChild}>
              <LeaderboardTable config={config} data={data} title={"Race 1"} />
              <div className="flex justify-start">
                <button
                  className="flex-shrink-0 mr-3 mb-5 mt-2 flex items-center justify-center focus:outline-none text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
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
                      d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                    />
                  </svg>
                  <span>Remove Column</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
