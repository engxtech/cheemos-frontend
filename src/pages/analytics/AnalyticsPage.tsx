import React, { useEffect, useState } from "react";
import AnalyticsHeader from "../../header/AnalyticsHeader";
import { Button, Skeleton } from "antd";
import { Heading3Icon } from "lucide-react";

interface TokenAnalysis{
  timestamp:string;
  chatId:string;
  tokensUsed:string;
  id:string;
}

export const AnalyticsPage: React.FC = () => {
  const filterOptions = [
    { label: "Last 6 Months", value: "6months" },
    { label: "Last 3 Months", value: "3months" },
    { label: "Last 1 Month", value: "1month" },
  ];

  const [filteredData, setFilteredData] = useState<TokenAnalysis[]>([]);
  const [selectedFilter, setSelectedFilter] = useState("1month");
  const [loading, setLoading] = useState(false);
  const getTokenDetails = async (selectedFilter) => {
    setLoading(true)
    const url =
      process.env.REACT_APP_API_URL +
      `/api/v1/token?duration=${selectedFilter}`;
    const response = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    });
    const data = await response.json();
    setFilteredData(data.data.content);
    setLoading(false);
  };
  // Filter Data based on selected time range
  const handleFilterChange = (months: string) => {
    setSelectedFilter(months)
    getTokenDetails(months)
  };

  useEffect(() => {
    setLoading(true);
    getTokenDetails(selectedFilter);
    setLoading(false);
  }, []);

  return (
    <div className="flex flex-col h-screen">
      <div className="fixed top-0 left-0 right-0 z-10 bg-black shadow">
        <AnalyticsHeader />
      </div>
      <div
        className="flex-1 overflow-y-auto sm:p-8 p-1 bg-black"
        style={{ paddingTop: "84px" }}
      >
        <div className="flex justify-between">
          <h3 className="text-xl mb-2">Credits Used</h3>
          <div className="mb-2">
            <label htmlFor="filter" className="mr-2">
              Filter by:
            </label>
            <select
              id="filter"
              className="bg-gray-800 text-white  cursor-pointer text-sm py-1 px-4 rounded-md"
              value={selectedFilter}
              onChange={(e) => handleFilterChange(e.target.value)}
            >
              {filterOptions.map((option) => (
                <option
                  key={option.value}
                  value={option.value}
                  className="cursor-pointer"
                >
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Dropdown for Time Range Filter */}
        <div className="rounded-md text-sm overflow-x-auto">
        <table className="min-w-full bg-gray-800 text-white">
          <thead>
            <tr>
              <th className="py-3 px-3 text-left">Items</th>
              <th className="py-3 px-3 text-left">Credits</th>
              <th className="py-3 px-3 text-left">Date/Time</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              // Skeleton loading state
              Array(5).fill(null)
                .map((_, index) => (
                  <tr key={index} className="bg-gray-900 border-b border-gray-700">
                    <td className=" px-8">
                      <Skeleton active paragraph={{ rows: 0 }} />
                    </td>
                    <td className=" px-8">
                      <Skeleton active paragraph={{ rows: 0 }} />
                    </td>
                    <td className="px-8">
                      <Skeleton active paragraph={{ rows: 0 }} />
                    </td>
                  </tr>
                ))
            ) : (
              // Normal data
              filteredData.map((row) => (
                <tr
                  key={row.id}
                  className="bg-gray-900 border-b border-gray-700 hover:bg-gray-200"
                >
                  <td className="py-2 px-4">{row.chatId}</td>
                  <td className="py-2 px-4">{row.tokensUsed}</td>
                  <td className="py-2 px-4">{row.timestamp}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
        <div className="flex justify-center ">
          <Button type="primary" className="px-3 py-1 mt-1">
            Load More
          </Button>
        </div>
      </div>
    </div>
  </div>
  );
};

export default AnalyticsPage;
