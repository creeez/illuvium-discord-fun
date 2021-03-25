import { useState, useEffect } from "react";
import { useQuery } from "@apollo/react-hooks";

import { GET_ILLUVIALS } from "./graphql/queries";

import Illuvial from "./components/Illuvial";
import Filters from "./components/Filters";
import IlluviumLogo from "./components/IlluviumLogo";

function App() {
  const { data, loading, error } = useQuery(GET_ILLUVIALS);
  const [illuvials, setIlluvials] = useState(undefined);
  const [filters, setFilters] = useState({});

  useEffect(() => {
    if (!data?.queryIlluvial) return;

    const filterIlluvials = (illuvials, filters) => {
      const filterKeys = Object.keys(filters);
      return illuvials.filter((illuvial) =>
        filterKeys.every((key) => {
          if (!filters[key].length) return true;
          if (Array.isArray(illuvial[key])) {
            return illuvial[key].some((keyEle) =>
              filters[key].includes(keyEle)
            );
          }
          return filters[key].includes(illuvial[key]);
        })
      );
    };

    const sortIlluvials = (a, b) => {
      if (a.affinity < b.affinity) {
        return -1;
      }
      if (a.affinity > b.affinity) {
        return 1;
      }
      if (a.stage < b.stage) {
        return -1;
      }
      if (a.stage > b.stage) {
        return 1;
      }
      return 0;
    };

    const filteredIlluvials = filterIlluvials(
      data?.queryIlluvial,
      filters
    ).sort(sortIlluvials);

    setIlluvials(filteredIlluvials);
  }, [filters, data]);

  if (loading) return <p>Still loading..</p>;
  if (error) return <p>There is an error!</p>;

  return (
    <div className="container-full-width">
      <IlluviumLogo />
      <Filters filters={filters} setFilters={setFilters} />

      {illuvials && (
        <div className="illuvial-list">
          {illuvials.map((illuvial, index) => (
            <div className="card" key={index}>
              <Illuvial config={illuvial} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default App;
