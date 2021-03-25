import { useState, useEffect } from "react";
import { useQuery } from "@apollo/react-hooks";

import { GET_ILLUVIALS } from "./graphql/queries";
import { filterIlluvials } from "./utils/helpers";

import Illuvial from "./components/Illuvial";
import Filters from "./components/Filters";
import IlluviumLogo from "./components/IlluviumLogo";

function App() {
  const { data, loading, error } = useQuery(GET_ILLUVIALS);
  const [illuvials, setIlluvials] = useState(undefined);
  const [filters, setFilters] = useState({});

  useEffect(() => {
    if (!data?.queryIlluvial) return;
    const illuvials = filterIlluvials(data.queryIlluvial, filters);
    setIlluvials(illuvials);
  }, [filters, data]);

  if (loading) return <p>Loading..</p>;
  if (error) return <p>There is an error!</p>;

  return (
    <div className="container-full-width">
      <header>
        <IlluviumLogo />
        <Filters filters={filters} setFilters={setFilters} />
      </header>
      <main>
        {illuvials && (
          <div className="illuvial-list">
            {illuvials.map((illuvial, index) => (
              <div className="card" key={index}>
                <Illuvial config={illuvial} />
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
