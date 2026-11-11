import FieldCard,{FieldCardData} from "./FieldCard";

const fields:FieldCardData[] = [
  {
    id: "1",
    name: "North Farm",
    crop: "Maize",
    location: "Nakuru",
    acreage: 15,
    status: "Healthy",
    
  },
  {
    id: "2",
    name: "West Field",
    crop: "Beans",
    location: "Eldoret",
    acreage: 8,
    status: "Needs Attention",
    
  },
];

interface Props {
  role: "ADMIN" | "AGENT";
  onDelete: (id: string) => void;
}

export default function FieldList({ role, onDelete }: Props) {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {fields.map((field) => (
        <FieldCard
          key={field.id}
          field={field}
          role={role}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}