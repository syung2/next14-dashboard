"use client";

import { useRouter } from "next/navigation";
import styles from "./pagination.module.css";
import { usePathname, useSearchParams } from "next/navigation";

const Pagination = ({ count }: { count: number }) => {
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const pathname = usePathname();

  const page = searchParams.get("page") || "1";

  const params = new URLSearchParams(searchParams);
  const ITEM_PER_PAGE = 2;

  const hasPrev = ITEM_PER_PAGE * (parseInt(page) - 1) > 0; // 0보다 크면 이전 페이지가 있다는 뜻
  const hasNext = ITEM_PER_PAGE * (parseInt(page) - 1) + ITEM_PER_PAGE < count; // 6은 총 페이지 수 (임의로 설정) 6개보다 작으면 다음 페이지가 있다는 뜻

  const handleChangePage = (type: "prev" | "next") => {
    type === "prev"
      ? params.set("page", String(parseInt(page) - 1))
      : params.set("page", String(parseInt(page) + 1));
    replace(`${pathname}?${params}`);
  };
  return (
    <div className={styles.container}>
      <button
        className={styles.button}
        disabled={!hasPrev}
        onClick={() => {
          handleChangePage("prev");
        }}
      >
        Previous
      </button>
      <button
        className={styles.button}
        disabled={!hasNext}
        onClick={() => {
          handleChangePage("next");
        }}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
