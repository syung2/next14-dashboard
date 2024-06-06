import Card from "../ui/dashboard/card/card";
import Chart from "../ui/dashboard/chart/chart";
import styles from "../ui/dashboard/dashboard.module.css";
import Rightbar from "../ui/dashboard/rightbar/rightbar";
import Transactions from "../ui/dashboard/transactions/transactions";
export default function DashboardPage() {
  return (
    <>
      <div className={styles.wrapper}>
        <div className={styles.main}>
          <div className={styles.cards}>
            <Card item={{ title: "Total Users", number: 10.283 }} />
            <Card item={{ title: "Total Users", number: 10.283 }} />
            <Card item={{ title: "Total Users", number: 10.283 }} />
          </div>
          <Transactions />
          <Chart />
        </div>
        <div className={styles.side}>
          <Rightbar />
        </div>
      </div>
    </>
  );
}
