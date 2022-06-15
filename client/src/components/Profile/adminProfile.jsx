import { useSelector } from "react-redux";
import AdminPanel from "../AdminPanel";
function AdminProfile() {
  const user = useSelector((state) => state.currentUser);
  return (
    <div>
      <p>Perfil de admin</p>
      <p>{user && user.email}</p>
      <AdminPanel />
    </div>
  );
}

export default AdminProfile;
