import { useMutation } from "@apollo/react-hooks";
import Modal from "react-modal";
import ReactSelect from "react-select";
import { useForm, Controller } from "react-hook-form";

import {
  GET_ILLUVIALS,
  UPDATE_ILLUVIAL,
  DELETE_ILLUVIAL,
} from "../graphql/queries";
import {
  affinities,
  genera,
  stages,
  classes,
  ranges,
  tiers,
} from "../utils/formOptions";

Modal.setAppElement("body");
const customStyles = {
  content: {
    background: "#190c29",
    maxWidth: "50%",
    margin: "0 auto",
    padding: "40px",
    top: "10%",
    maxHeight: "600px",
  },
};

const customStylesSelect = {
  option: (provided) => ({
    ...provided,
    color: "black",
  }),
};

const EditIlluvialModal = ({ config, modalIsOpen, setIsOpen }) => {
  const [deleteIlluvial] = useMutation(DELETE_ILLUVIAL);
  const [updateIlluvial] = useMutation(UPDATE_ILLUVIAL, {
    refetchQueries: [{ query: GET_ILLUVIALS }],
  });

  const {
    name,
    stage,
    affinity,
    class: classType,
    range,
    genus,
    tier,
  } = config;

  const { register, handleSubmit, errors, control } = useForm({
    defaultValues: config,
  });

  const closeModal = () => {
    setIsOpen(false);
  };

  const handleDelete = async () => {
    try {
      await deleteIlluvial({
        variables: {
          id: [config.id],
        },
        refetchQueries: [{ query: GET_ILLUVIALS }],
      });
      closeModal();
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdate = async (data) => {
    try {
      await updateIlluvial({
        variables: {
          input: {
            filter: { id: config.id },
            set: {
              name: data.name,
              pic: data.pic,
              stage: data.stage.value,
              affinity: data.affinity?.value || undefined,
              class: data.class?.value || undefined,
              range: data.range?.value || undefined,
              tier: data.tier?.value || undefined,
              genus: data.genus?.value || undefined,
            },
          },
        },
      });
      closeModal();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={closeModal}
      style={customStyles}
      contentLabel="Edit Illuvial"
    >
      <button className="close-modal" onClick={closeModal}>
        X
      </button>
      <h2 className="modal-header">{name}</h2>

      <form className="illuvial-form">
        <section>
          <label>Name:</label>
          <input name="name" ref={register({ required: true })} />
          {errors.name && "Name is required."}
        </section>

        <section>
          <label>Image:</label>
          <input name="pic" ref={register({ required: true })} />
          {errors.pic && "pic is required."}
        </section>

        <div className="modal-form__content-group">
          <section>
            <label>Tier:</label>
            <Controller
              render={(props) => (
                <ReactSelect
                  defaultValue={tiers.find(
                    (tierItem) => tierItem.value === parseInt(tier)
                  )}
                  onChange={props.onChange}
                  options={tiers}
                  styles={customStylesSelect}
                  isClearable
                />
              )}
              name="tier"
              control={control}
            />
          </section>

          <section>
            <label>Stage:</label>
            <Controller
              render={(props) => (
                <ReactSelect
                  defaultValue={stages.find(
                    (stageItem) => stageItem.value === parseInt(stage)
                  )}
                  onChange={props.onChange}
                  styles={customStylesSelect}
                  isClearable
                  options={stages}
                />
              )}
              name="stage"
              control={control}
              rules={{ required: true }}
            />
            {errors.stage && "Stage is required."}
          </section>
        </div>
        <div className="modal-form__content-group">
          <section>
            <label>Affinity:</label>
            <Controller
              render={({ onChange }) => (
                <ReactSelect
                  defaultValue={affinities.find(
                    (affinityItem) => affinityItem.value === affinity
                  )}
                  onChange={onChange}
                  styles={customStylesSelect}
                  isClearable
                  options={affinities}
                />
              )}
              name="affinity"
              control={control}
            />
          </section>

          <section>
            <label>Class:</label>
            <Controller
              render={({ onChange }) => (
                <ReactSelect
                  defaultValue={classes.find(
                    (classItem) => classItem.value === classType
                  )}
                  onChange={onChange}
                  styles={customStylesSelect}
                  isClearable
                  options={classes}
                />
              )}
              name="class"
              control={control}
            />
          </section>
        </div>
        <div className="modal-form__content-group">
          <section>
            <label>Range:</label>
            <Controller
              render={({ onChange }) => (
                <ReactSelect
                  defaultValue={ranges.find(
                    (rangeItem) => rangeItem.value === range
                  )}
                  onChange={onChange}
                  styles={customStylesSelect}
                  isClearable
                  options={ranges}
                />
              )}
              name="range"
              control={control}
            />
          </section>

          <section>
            <label>Genus:</label>
            <Controller
              render={({ onChange }) => (
                <ReactSelect
                  defaultValue={genera.find(
                    (genusItem) => genusItem.value === genus
                  )}
                  onChange={onChange}
                  styles={customStylesSelect}
                  isClearable
                  options={genera}
                />
              )}
              name="genus"
              control={control}
            />
          </section>
        </div>
        <div className="modal-form__footer">
          <button
            className="btn--update"
            type="button"
            onClick={handleSubmit(handleUpdate)}
          >
            Update
          </button>
          <button
            className="btn-caution btn--delete"
            type="button"
            onClick={handleDelete}
          >
            Delete Illuvial
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default EditIlluvialModal;
