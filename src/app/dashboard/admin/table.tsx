"use client";

import React from "react";
import axios from "axios";

interface Barang {
  id: number;
  nama_user: string;
  tanggal_request: string;
  status: string;
  nama_barang: string;
  jumlah: number;
  satuan: string;
}

interface TableProps {
  data: Barang[];
}

const BarangDashboardTable: React.FC<TableProps> = ({ data }) => {
  const handleApprove = (id: number) => {
    const token = localStorage.getItem("token");

    axios
      .post(
        `http://localhost:8080/api/admin/request/approve-reject?id=${id}&status=1`,
        { status: 1 },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "ngrok-skip-browser-warning": "69420",
          },
        }
      )
      .then((response) => {
        console.log("Approve response:", response.data);
      })
      .catch((error) => {
        console.error("Approve error:", error);
      });
  };

  const handleReject = (id: number) => {
    const token = localStorage.getItem("token");

    axios
      .post(
        `http://localhost:8080/api/admin/request/approve-reject?id=${id}&status=2`,
        { status: 2 },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "ngrok-skip-browser-warning": "69420",
          },
        }
      )
      .then((response) => {
        console.log("Reject response:", response.data);
      })

      .catch((error) => {
        console.error("Reject error:", error);
      });
  };

  return (
    <div className="mt-10">
      <table className="min-w-full bg-white border rounded-xl">
        <thead>
          <tr>
            <th className="px-6 py-3 bg-gray-100 text-left text-xs font-bold text-gray-500 uppercase">
              No
            </th>
            <th className="px-6 py-3 bg-gray-100 text-left text-xs font-bold text-gray-500 uppercase">
              Tanggal Request
            </th>
            <th className="px-6 py-3 bg-gray-100 text-left text-xs font-bold text-gray-500 uppercase">
              Nama User
            </th>
            <th className="px-6 py-3 bg-gray-100 text-left text-xs font-bold text-gray-500 uppercase">
              Nama Barang
            </th>
            <th className="px-6 py-3 bg-gray-100 text-left text-xs font-bold text-gray-500 uppercase">
              Jumlah
            </th>
            <th className="px-6 py-3 bg-gray-100 text-left text-xs font-bold text-gray-500 uppercase">
              Satuan
            </th>
            <th className="px-6 py-3 bg-gray-100 text-left text-xs font-bold text-gray-500 uppercase">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={item.id} className="border-t">
              <td className="px-6 py-4 whitespace-nowrap">{index + 1}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                {item.tanggal_request}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                {item.nama_user}
              </td>

              <td className="px-6 py-4 whitespace-nowrap">
                {item.nama_barang}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">{item.jumlah}</td>
              <td className="px-6 py-4 whitespace-nowrap">{item.satuan}</td>
              <td className="px-6 py-4 whitespace-nowrap flex">
                <button
                  onClick={() => handleApprove(item.id)}
                  className="bg-green-500 text-white px-4 py-2 rounded mr-2"
                >
                  Approve
                </button>
                <button
                  onClick={() => handleReject(item.id)}
                  className="bg-red-500 text-white px-4 py-2 rounded"
                >
                  Reject
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BarangDashboardTable;
