import { useState } from "react";

import EditIlluvialModal from "./EditIlluvialModal";

const customStyle = () => {
  return {
    background: `linear-gradient(
    ${Math.floor(Math.random() * Math.floor(300))}deg,
    rgba(0, 0, 0, 0) -33.8%,
    #603074 23.54%,
    rgba(0, 0, 0, 0) 132.9%
  ),
  #000000`,
  };
};

const Illuvial = ({ config }) => {
  const {
    name,
    pic,
    stage,
    affinity,
    class: classType,
    range,
    tier,
    genus,
  } = config;

  const [modalIsOpen, setIsOpen] = useState(false);

  const openModal = () => {
    setIsOpen(true);
  };

  return (
    <>
      <div className="illuvial-card">
        <div className="img">
          <img alt="illuvial" src={pic} />
        </div>
        <div className="content">
          <h3 style={customStyle()}>{name}</h3>
          <div className="illuvial-card__content-group">
            <div>
              <label>Tier:</label>
              <div>{tier}</div>
            </div>
            <div>
              <label>Stage:</label>
              <div>{stage}</div>
            </div>
          </div>
          <div className="illuvial-card__content-group">
            <div>
              <label>Affinity:</label>
              <div>{affinity}</div>
            </div>
            <div>
              <label>Class:</label>
              <div>{classType}</div>
            </div>
          </div>
          <div className="illuvial-card__content-group">
            <div>
              <label>Range:</label>
              <div>{range}</div>
            </div>
            <div>
              <label>Genus:</label>
              <div>{genus}</div>
            </div>
          </div>
          <div className="illuvial-card__edit">
            <button onClick={openModal}>EDIT</button>
          </div>
        </div>
      </div>
      {modalIsOpen ? (
        <EditIlluvialModal
          config={config}
          setIsOpen={setIsOpen}
          modalIsOpen={modalIsOpen}
        />
      ) : null}
    </>
  );
};

export default Illuvial;
