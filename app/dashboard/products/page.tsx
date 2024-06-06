import Pagination from "@/app/ui/dashboard/pagination/pagination";
import Search from "@/app/ui/dashboard/search/search";
import Image from "next/image";
import Link from "next/link";
import styles from "../../ui/dashboard/products/products.module.css";
export default function page() {
  return (
    <>
      <div className={styles.container}>
        <div className={styles.top}>
          <Search placeholder="Search for a user..." />
          <Link href={"/dashboard/products/add"}>
            <button className={styles.addButton}>Add New</button>
          </Link>
        </div>
        <table className={styles.table}>
          <thead>
            <tr>
              <td>Title</td>
              <td>Description</td>
              <td>Price</td>
              <td>Create At</td>
              <td>Stock</td>
              <td>Action</td>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <div className={styles.product}>
                  <Image
                    src="/noproduct.jpg"
                    width={40}
                    height={40}
                    alt="user"
                    className={styles.productImage}
                  />
                  Jonh Doe
                </div>
              </td>
              <td>Desc</td>
              <td>$99</td>
              <td>13.01.2022</td>
              <td>7</td>
              <td>
                <div className={styles.buttons}>
                  <Link href="/dashboard/products/1">
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
          </tbody>
        </table>
        <Pagination />
      </div>
    </>
  );
}
