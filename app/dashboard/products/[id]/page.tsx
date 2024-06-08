import { fetchProduct, updateProduct } from "@/app/libs/action";
import styles from "@/app/ui/dashboard/users/singleUser/singleUser.module.css";
import Image from "next/image";
export default async function SingleUserPage({
  params: { id },
}: {
  params: { id: string };
}) {
  const product = await fetchProduct(id);
  return (
    <div className={styles.container}>
      <div className={styles.infoContainer}>
        <div className={styles.imgContainer}>
          <Image src={product.img || "/noavatar.png"} alt="" fill />
        </div>
      </div>
      <div className={styles.formContainer}>
        <form action={updateProduct} className={styles.form}>
          <input type="hidden" name="id" value={product.id} />
          <label>Title</label>
          <input type="text" name="title" placeholder={product.title} />
          <label>Price</label>
          <input type="number" name="price" placeholder={product.price} />
          <label>Stock</label>
          <input type="number" name="stock" placeholder={product.stock} />
          <label>Color</label>
          <input
            type="text"
            name="color"
            placeholder={product.color || "color"}
          />
          <label>Size</label>
          <textarea name="size" placeholder={product.size || "size"} />
          <label>Cat</label>
          <select name="cat" id="cat">
            <option value="kitchen" selected={product.cat}>
              Kitchen
            </option>
            <option value="computers" selected={product.cat}>
              Computers
            </option>
          </select>
          <label>Description</label>
          <textarea
            name="desc"
            id="desc"
            rows={10}
            placeholder={product.desc}
          ></textarea>
          <button>Update</button>
        </form>
      </div>
    </div>
  );
}
