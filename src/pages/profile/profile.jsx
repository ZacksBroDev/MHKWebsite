import { Link } from "react-router-dom";

export default function Profile() {
  const user = [1, 2, 3, 4, 5];
  return (
    <>
      {user.map((user) => (
        <Link key={user} to={`/profile/${user}`}>
          User {user}
        </Link>
      ))}
    </>
  );
}
