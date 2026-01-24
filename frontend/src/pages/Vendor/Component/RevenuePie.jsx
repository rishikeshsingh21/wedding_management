import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

const data = [
  { name: "Photography", value: 42 },
  { name: "Cinematography", value: 38 },
  { name: "Albums", value: 20 },
];

const COLORS = ["#ec4899", "#a855f7", "#cbd5e1"];

const RevenuePie = () => {
  return (
    <div className="bg-white rounded-3xl shadow p-6 h-[220px] flex flex-col">
      <h4 className="text-sm font-medium text-pink-700 mb-2">
        Revenue by Service
      </h4>

      <div className="flex-1">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              innerRadius={50}
              outerRadius={70}
              paddingAngle={3}
              dataKey="value"
            >
              {data.map((_, index) => (
                <Cell key={index} fill={COLORS[index]} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* LEGEND */}
      <div className="flex justify-center gap-4 text-xs mt-2">
        {data.map((item, i) => (
          <div key={i} className="flex items-center gap-1">
            <span
              className="w-2 h-2 rounded-full"
              style={{ backgroundColor: COLORS[i] }}
            />
            {item.name}
          </div>
        ))}
      </div>
    </div>
  );
};

export default RevenuePie;
