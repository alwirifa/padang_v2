// import React from "react";

// function Search() {
//   return (
//     <div className=" px-4 py-2 max-w-md bg-[#9CC2E5] rounded-full flex gap-2 text-xl items-center justify-start w-full ">
// <svg
//   width="24"
//   height="24"
//   viewBox="0 0 24 24"
//   fill="none"
//   xmlns="http://www.w3.org/2000/svg"
// >
//   <path
//     d="M16.5698 16.15C18.1558 14.4866 19.0454 12.2795 19.0561 9.98121C19.0668 7.68292 18.1978 5.46762 16.6273 3.78956C15.0569 2.11149 12.9039 1.09782 10.61 0.956399C8.31603 0.814974 6.05488 1.55651 4.29019 3.02896C2.5255 4.50141 1.39099 6.59319 1.11929 8.87539C0.847589 11.1576 1.45929 13.4573 2.82896 15.3029C4.19863 17.1485 6.22248 18.4001 8.48552 18.8012C10.7486 19.2023 13.0793 18.7224 14.9998 17.46L21.2498 23.71L22.6698 22.29L16.5698 16.15ZM13.5698 16.01C12.0403 16.935 10.2171 17.2464 8.46725 16.8813C6.71739 16.5162 5.17078 15.5019 4.13868 14.0424C3.10658 12.583 2.66563 10.7867 2.90458 9.01525C3.14352 7.24376 4.04462 5.62854 5.42651 4.49468C6.8084 3.36082 8.56849 2.7925 10.3525 2.9041C12.1366 3.0157 13.8121 3.79894 15.0419 5.09618C16.2717 6.39341 16.9645 8.10834 16.9808 9.89579C16.9971 11.6832 16.3358 13.4105 15.1298 14.73C14.681 15.2259 14.1622 15.6538 13.5898 16L13.5698 16.01Z"
//     fill="black"
//   />
// </svg>

//       <p>Search</p>
//     </div>
//   );
// }

// export default Search;

"use client";

import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";

export default function Search({ placeholder }: { placeholder: string }) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleSearch = useDebouncedCallback((term) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", "1");
    if (term) {
      params.set("query", term);
    } else {
      params.delete("query");
    }
    replace(`${pathname}?${params.toString()}`);
  }, 300);

  return (
    <div className="w-full bg-[#9CC2E5]  text-sm max-w-xs px-4 py-2 rounded-md flex items-center gap-2  border border-black text-black ">
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M16.5698 16.15C18.1558 14.4866 19.0454 12.2795 19.0561 9.98121C19.0668 7.68292 18.1978 5.46762 16.6273 3.78956C15.0569 2.11149 12.9039 1.09782 10.61 0.956399C8.31603 0.814974 6.05488 1.55651 4.29019 3.02896C2.5255 4.50141 1.39099 6.59319 1.11929 8.87539C0.847589 11.1576 1.45929 13.4573 2.82896 15.3029C4.19863 17.1485 6.22248 18.4001 8.48552 18.8012C10.7486 19.2023 13.0793 18.7224 14.9998 17.46L21.2498 23.71L22.6698 22.29L16.5698 16.15ZM13.5698 16.01C12.0403 16.935 10.2171 17.2464 8.46725 16.8813C6.71739 16.5162 5.17078 15.5019 4.13868 14.0424C3.10658 12.583 2.66563 10.7867 2.90458 9.01525C3.14352 7.24376 4.04462 5.62854 5.42651 4.49468C6.8084 3.36082 8.56849 2.7925 10.3525 2.9041C12.1366 3.0157 13.8121 3.79894 15.0419 5.09618C16.2717 6.39341 16.9645 8.10834 16.9808 9.89579C16.9971 11.6832 16.3358 13.4105 15.1298 14.73C14.681 15.2259 14.1622 15.6538 13.5898 16L13.5698 16.01Z"
          fill="black"
        />
      </svg>
      <input
        className="bg-[#9CC2E5]   outline-none font-inter text-xl text-black placeholder:text-black/80"
        placeholder={placeholder}
        onChange={(e) => {
          handleSearch(e.target.value);
        }}
        defaultValue={searchParams.get("query")?.toString()}
      />
    </div>
  );
}
