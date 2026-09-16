import { User } from "@/types/user";
import Button from "../ui/Button";

interface Props {
  userId: string;
  onDelete: (id: string) => void; 
  
}

export default function DeleteUserButton({ userId,onDelete}: Props){

  const  handleDelete =() =>{
        const confirmed = confirm("Are you sure you want to delete this user?");
    if (confirmed) {
      onDelete(userId);
    }
  }

  return(
    <div>
      <Button onClick={handleDelete}>Delete</Button>
    </div>
  )

}

