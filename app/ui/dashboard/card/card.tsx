import { MdSupervisedUserCircle } from "react-icons/md";
import styles from "./card.module.css";

type CardProps = {
  title: string;
  number: number;
  detail: string;
  change: number;
};
const Card = ({ item }: { item: Partial<CardProps> }) => {
  return (
    <div className={styles.container}>
      <MdSupervisedUserCircle size={24} />
      <div className={styles.texts}>
        <span className={styles.title}>Total Users</span>
        <span className={styles.number}>10.283</span>
        <span className={styles.detail}>
          <span className={10 > 0 ? styles.positive : styles.negative}>
            10%
          </span>{" "}
          {10 > 0 ? "more" : "less"} than previous week
        </span>
      </div>
    </div>
  );
};

export default Card;
