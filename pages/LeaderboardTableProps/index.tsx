import React from "react";
import homeStyles from "@/styles/Table.module.css";
export interface RaceEntry {
  [key: string]: string | number;
  //   columns: { name: string; value: string | number }[];
}

export interface LeaderboardConfig {
  columns: string[];
}

export interface LeaderboardTableProps {
  data: RaceEntry[]; // Union type to allow either RaceEntry or RaceRank data
  config: LeaderboardConfig;
  title: string;
}

const LeaderboardTable: React.FC<LeaderboardTableProps> = ({
  data,
  config,
  title,
}) => {
  const { columns } = config;
  const rowData = data;
  return (
    <div className={homeStyles.tableAlign}>
      <h2 className="mb-4 text-xl font-extrabold leading-none tracking-tight text-gray-900 dark:text-white">
        {title}
      </h2>
      <div className="">
        <table className="shadow-lg bg-white table-auto">
          <thead>
            <tr>
              {columns.map((column) => (
                <th
                  className="overflow-hidden whitespace-nowrap text-ellipsis max-w-[300px] bg-blue-100 border text-left px-8 py-4"
                  key={column}
                >
                  {column}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {/* {data &&
              data.map((entry, index) => (
                <tr key={index} className={homeStyles.row}>
                  {columns.map((column) => (
                    <td className="border px-8 py-4" key={column}>
                      {entry[column]}
                    </td>
                  ))}
                </tr>
              ))} */}
            {rowData &&
              rowData.map((entry, index) => (
                <tr key={index} className={homeStyles.row}>
                  {columns.map((column) => (
                    <td className="border px-8 py-4" key={column}>
                      {entry[column]}
                    </td>
                  ))}
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LeaderboardTable;
