import Card from "../ui/Card";

type DashboardCardProps = {
  title: string;
  value: number;
};

export default function DashboardCard({
  title,
  value,
}: DashboardCardProps) {
  return (
    <Card>
      <h3 className="text-sm text-gray-500">{title}</h3>

      <p className="mt-2 text-3xl font-display text-emerald-600">{value}</p>
    </Card>
  );
}