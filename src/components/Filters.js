import { useState } from "react";
import ReactSelect from "react-select";

import {
  affinities,
  genera,
  stages,
  classes,
  ranges,
  tiers,
} from "../utils/formOptions";

import AddIlluvialModal from "../components/AddIlluvialModal";

import "../styles/filters.scss";

const customStylesSelect = {
  option: (provided) => ({
    ...provided,
    color: "black",
  }),
};

const Filters = ({ setFilters }) => {
  const [modalIsOpen, setIsOpen] = useState(false);
  const openModal = () => {
    setIsOpen(true);
  };

  const handleOnChange = (_, { name, option, removedValue }) => {
    if (!option && removedValue) {
      setFilters((prev) => ({
        ...prev,
        [name]: prev[name].filter((filter) => filter !== removedValue.value),
      }));
    } else {
      setFilters((prev) => ({
        ...prev,
        [name]: prev[name] ? [...prev[name], option.value] : [option.value],
      }));
    }
  };

  return (
    <>
      <div className="filters">
        <section>
          <label>Tier:</label>
          <ReactSelect
            styles={customStylesSelect}
            name="tier"
            onChange={handleOnChange}
            options={tiers}
            isMulti
          />
        </section>

        <section>
          <label>Stage:</label>
          <ReactSelect
            styles={customStylesSelect}
            name="stage"
            onChange={handleOnChange}
            options={stages}
            isMulti
          />
        </section>

        <section>
          <label>Affinity:</label>
          <ReactSelect
            styles={customStylesSelect}
            name="affinity"
            onChange={handleOnChange}
            options={affinities}
            isMulti
          />
        </section>

        <section>
          <label>Class:</label>
          <ReactSelect
            styles={customStylesSelect}
            name="class"
            onChange={handleOnChange}
            options={classes}
            isMulti
          />
        </section>

        <section>
          <label>Range:</label>
          <ReactSelect
            styles={customStylesSelect}
            name="range"
            onChange={handleOnChange}
            options={ranges}
            isMulti
          />
        </section>

        <section>
          <label>Genus:</label>
          <ReactSelect
            styles={customStylesSelect}
            name="genus"
            onChange={handleOnChange}
            options={genera}
            isMulti
          />
        </section>
      </div>
      <div className="add-illuvial-btn">
        <button onClick={openModal}>Add Illuvial</button>
      </div>
      <AddIlluvialModal setIsOpen={setIsOpen} modalIsOpen={modalIsOpen} />
    </>
  );
};

export default Filters;
