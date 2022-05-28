import { useSelector } from "react-redux";

function AdminProfile() {
  const user = useSelector((state) => state.currentUser);
  return (
    <div>
      <p>Admin Profile</p>
      <p>{user && user.email}</p>
    </div>
  );
}

export default AdminProfile;
