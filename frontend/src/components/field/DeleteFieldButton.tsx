import Button from "@/components/ui/Button";

interface Props {
  fieldId: string;
  onDelete: (id: string) => void;
}

export default function DeleteFieldButton({ fieldId, onDelete }: Props) {
  function handleDelete() {
    const confirmed = confirm("Are you sure you want to delete this field?");
    if (confirmed) {
      onDelete(fieldId);
    }
  }
  return (
    <Button onClick={handleDelete}>
      Delete
    </Button>
  );
}