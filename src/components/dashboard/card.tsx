import { Home } from "lucide-react";
import React from "react";

const DashboardCard = [
  {
    title: "Data User",
    icon: <Home size={20} />,
    color: "#C7FFFF",
  },
  {
    title: "Data Barang",
    icon: <Home size={20} />,
    color: "#FBE9DC",
  },
  {
    title: "Data Toko",
    icon: <Home size={20} />,
    color: "#E9E1B6",
  },
  {
    title: "Barang Masuk",
    icon: <Home size={20} />,
    color: "#BAEBB3",
  },
  {
    title: "Barang Keluar",
    icon: <Home size={20} />,
    color: "#F0C1C1",
  },
];

function Card() {
  return (
    <div className="grid grid-cols-5 gap-4 mt-4">
      {DashboardCard.map((item, index) => (
        <div
          key={index} 
          className="flex gap-2 p-4 rounded-xl text-2xl items-center justify-center"
          style={{ backgroundColor: item.color }}
        >
          {item.title}
          {item.icon}
        </div>
      ))}
    </div>
  );
}

export default Card;
