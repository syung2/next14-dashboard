import Pagination from "@/app/ui/dashboard/pagination/pagination";
import Search from "@/app/ui/dashboard/search/search";
import Image from "next/image";
import Link from "next/link";
import styles from "../../ui/dashboard/products/products.module.css";
import { fetchProducts } from "@/app/libs/data";
import { deleteProduct } from "@/app/libs/action";
export default async function page({
  searchParams,
}: {
  searchParams: { q: string; page: string };
}) {
  const q = searchParams.q || "";
  const page = searchParams.page || "1";
  const { count, products } = await fetchProducts(q, Number(page));
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
            {products &&
              products.map((product) => (
                <tr key={product.id}>
                  <td>
                    <div className={styles.product}>
                      <Image
                        src={product.image || "/noavatar.png"}
                        width={40}
                        height={40}
                        alt="user"
                        className={styles.productImage}
                      />
                      {product.title}
                    </div>
                  </td>
                  <td>{product.desc}</td>
                  <td>${product.price}</td>
                  <td>{product.createdAt?.toString()?.slice(4, 16)}</td>
                  <td>{product.stock}</td>
                  <td>
                    <div className={styles.buttons}>
                      <Link href={`/dashboard/products/${product.id}`}>
                        <button className={`${styles.button} ${styles.view}`}>
                          View
                        </button>
                      </Link>
                      <form action={deleteProduct}>
                        <input type="hidden" name="id" value={product.id} />
                        <button className={`${styles.button} ${styles.delete}`}>
                          Delete
                        </button>
                      </form>
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
