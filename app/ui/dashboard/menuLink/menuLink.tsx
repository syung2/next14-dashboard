import Link from "next/link";
import styles from "./menuLink.module.css";
export default function MenuLink(item: {
  path: string;
  title: string;
  icon: React.ReactNode;
}) {
  return (
    <>
      <Link href={item.path} className={styles.container}>
        {item.icon}
        {item.title}
      </Link>
    </>
  );
}
