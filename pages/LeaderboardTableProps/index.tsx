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

  return (
    <div className={homeStyles.tableAlign}>
      <h2 className="fixed mb-4 text-2xl font-extrabold leading-none tracking-tight text-gray-900 dark:text-white">
        {title}
      </h2>
      <div className="mt-10">
        <table className="shadow-lg bg-white">
          <thead>
            <tr>
              {columns.map((column) => (
                <th
                  className="bg-blue-100 border text-left px-8 py-4"
                  key={column}
                >
                  {column}
                </th>
              ))}
            </tr>
          </thead>
          {/* <tbody>
          {data.map((entry, index) => (
            <tr key={index}>
              {columns.map((column) => (
                <td className="border px-8 py-4" key={column}>
                  {(entry as any)[column]}
                </td>
              ))}
            </tr>
          ))}
        </tbody> */}
          <tbody>
            {data.map((entry, index) => (
              <tr key={index}>
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
