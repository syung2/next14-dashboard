"use client";
import { MdSearch } from "react-icons/md";
import styles from "./search.module.css";
import { use } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";

const Search = ({ placeholder }: { placeholder: string }) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const handleSearch = useDebouncedCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const params = new URLSearchParams(searchParams);
      if (e.target.value.length > 2) {
        params.set("q", e.target.value);
      } else {
        params.delete("q");
      }
      replace(`${pathname}?${params}`);
    },
    300
  );
  return (
    <div className={styles.container}>
      <MdSearch />
      <input
        type="text"
        className={styles.input}
        placeholder={placeholder}
        onChange={handleSearch}
      />
    </div>
  );
};

export default Search;
