import { useSelector } from "react-redux";

function UserProfile() {
  const user = useSelector((state) => state.currentUser);
  console.log(user, "HOLAAAAAAAA");
  return (
    <div>
      <p>User Profile</p>
      <p>{user && user.email}</p>
    </div>
  );
}

export default UserProfile;
