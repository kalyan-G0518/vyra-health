import HealthCard from "./healthcard";

const stats = [
  {
    title: "Heart Rate",
    value: "82 BPM",
    change: "+2.1%",
  },
  {
    title: "Sleep",
    value: "7h 48m",
    change: "+4.3%",
  },
  {
    title: "Calories",
    value: "1,840",
    change: "-1.2%",
  },
  {
    title: "Steps",
    value: "9,240",
    change: "+8.4%",
  },
];

export default function StatsGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mt-8">
      {stats.map((stat) => (
        <HealthCard
          key={stat.title}
          title={stat.title}
          value={stat.value}
          change={stat.change}
        />
      ))}
    </div>
  );
}