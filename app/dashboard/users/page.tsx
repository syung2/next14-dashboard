import Search from "@/app/ui/dashboard/search/search";
import styles from "../../ui/dashboard/users/users.module.css";
import Link from "next/link";
import Image from "next/image";
import Pagination from "@/app/ui/dashboard/pagination/pagination";
import { fetchUsers } from "@/app/libs/data";
export default async function Users({
  searchParams,
}: {
  searchParams: { q: string; page: string };
}) {
  const q = searchParams.q || "";
  const page = searchParams.page || "1";
  const { count, users } = await fetchUsers(q, Number(page));
  return (
    <>
      <div className={styles.container}>
        <div className={styles.top}>
          <Search placeholder="Search for a user..." />
          <Link href={"/dashboard/users/add"}>
            <button className={styles.addButton}>Add New</button>
          </Link>
        </div>
        <table className={styles.table}>
          <thead>
            <tr>
              <td>Name</td>
              <td>Email</td>
              <td>Created At</td>
              <td>Role</td>
              <td>Status</td>
              <td>Action</td>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td>
                  <div className={styles.user}>
                    <Image
                      src={user.img || "/noavatar.png"}
                      width={40}
                      height={40}
                      alt="user"
                      className={styles.userImage}
                    />
                    {user.name}
                  </div>
                </td>
                <td>{user.email}</td>
                <td>{user.createdAt?.toString()}</td>
                <td>{user.isAdmin ? "Admin" : "Normal"}</td>
                <td>active</td>
                <td>
                  <div className={styles.buttons}>
                    <Link href={`/dashboard/users/${user._id}`}>
                      <button className={`${styles.button} ${styles.view}`}>
                        View
                      </button>
                    </Link>
                    <button className={`${styles.button} ${styles.delete}`}>
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <Pagination count={count} />
      </div>
    </>
  );
}
