import axios from "axios";
import React, { FC, useEffect, useState } from "react";
import Menu from "../../../components/menu/Menu";
import RightSideBar from "../../../components/rightSideBar/RightSideBar";

interface Report {
   id: number;
   reportedUsername: string;
   postOwnerName: string;
   status: string;
   reason: string;
   reportedAt: string;
}

const Reports: FC = () => {
   const [reports, setReports] = useState<Report[]>([]);

   useEffect(() => {
      // Fetch reports data from the backend API
      const fetchReports = async () => {
         try {
            const response = await axios.get("/api/reports");
            setReports(response.data);
         } catch (error) {
            console.error("Error fetching reports:", error);
         }
      };

      fetchReports();
   }, []);

   return (
      <>
         <Menu />
         <div className="container ml-72 mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-6">Reports</h1>
            <div className="overflow-x-auto">
               <table className="table-auto ">
                  <thead>
                     <tr>
                        <th className="px-4 py-2">Reported User</th>
                        <th className="px-4 py-2">Post Owner</th>
                        <th className="px-4 py-2">Status</th>
                        <th className="px-4 py-2">Reason</th>
                        <th className="px-4 py-2">Reported At</th>
                     </tr>
                  </thead>
                  <tbody>
                     <tr className="odd:bg-gray-100">
                        <td className="border px-4 py-2">report.reportedUsername</td>
                        <td className="border px-4 py-2">report.postOwnerName</td>
                        <td className="border px-4 py-2">report.status</td>
                        <td className="border px-4 py-2">report.reason</td>
                        <td className="border px-4 py-2">report.reportedAt</td>
                     </tr>
                  </tbody>
               </table>
            </div>
         </div>
         <RightSideBar />
      </>
   );
};

export default Reports;
