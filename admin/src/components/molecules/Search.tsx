import { RiSearchLine } from "@remixicon/react";
import { TextInput } from "@tremor/react";
import { useEffect, useState } from "react";

const init = {
  q: "",
};

const Search = () => {
  const [search, setSearch] = useState(init);
  const [debouncedQ, setDebouncedQ] = useState("");

  const { q } = search;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearch({ ...search, [e.target.name]: e.target.value });
    };

    useEffect(() => {
      const handler = setTimeout(() => {
        if (q.trim()) {
          setDebouncedQ(q);
          // Perform the API search with debouncedQ
          console.log("API search with query:", q, debouncedQ); // Replace this with your actual API call
        }
      }, 3000);

      return () => {
        clearTimeout(handler);
      };
    }, [q]);

  return (
    <>
      <TextInput
      className="w-2/5 md:w-1/3"
        icon={RiSearchLine}
        value={q}
        onChange={handleChange}
        name="q"
        placeholder="Search TX, Address, ID..."
      />
    </>
  );
};

export default Search;
