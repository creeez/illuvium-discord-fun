import Modal from "react-modal";
import { useForm, Controller } from "react-hook-form";
import { useMutation } from "@apollo/react-hooks";
import ReactSelect from "react-select";

import {
  affinities,
  genera,
  stages,
  classes,
  ranges,
  tiers,
} from "../utils/formOptions";
import { ADD_ILLUVIAL, GET_ILLUVIALS } from "../graphql/queries";

Modal.setAppElement("body");
const customStyles = {
  content: {
    top: "10%",
    background: "#190c29",
    maxWidth: "50%",
    margin: "0 auto",
    maxHeight: "600px",
    padding: "40px",
  },
};

const customStylesSelect = {
  option: (provided) => ({
    ...provided,
    color: "black",
  }),
};

const AddIlluvialForm = ({ modalIsOpen, setIsOpen }) => {
  const [addIlluvial] = useMutation(ADD_ILLUVIAL, {
    refetchQueries: [{ query: GET_ILLUVIALS }],
  });

  const { register, handleSubmit, errors, control } = useForm();

  const closeModal = () => {
    setIsOpen(false);
  };

  const onSubmit = async (data) => {
    try {
      await addIlluvial({
        variables: {
          input: [
            {
              ...data,
              stage: data.stage.value,
              class: data.class?.value,
              affinity: data.affinity?.value,
              range: data.range?.value,
              genus: data.genus?.value,
              tier: data.tier?.value,
            },
          ],
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
      <h2 className="modal-header">Add Illuvial</h2>
      <form className="illuvial-form" onSubmit={handleSubmit(onSubmit)}>
        <section>
          <label>Name:</label>
          <input
            name="name"
            control={control}
            ref={register({ required: true })}
          />
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
                  onChange={props.onChange}
                  styles={customStylesSelect}
                  options={stages}
                  isClearable
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
                  onChange={onChange}
                  styles={customStylesSelect}
                  options={affinities}
                  isClearable
                />
              )}
              name="affinity"
              control={control}
            />
            {errors.affinity && "Affinity is required."}
          </section>

          <section>
            <label>Class:</label>
            <Controller
              render={({ onChange }) => (
                <ReactSelect
                  onChange={onChange}
                  styles={customStylesSelect}
                  options={classes}
                  isClearable
                />
              )}
              name="class"
              control={control}
            />
            {errors.class && "Class is required."}
          </section>
        </div>

        <div className="modal-form__content-group">
          <section>
            <label>Range:</label>
            <Controller
              render={({ onChange }) => (
                <ReactSelect
                  onChange={onChange}
                  styles={customStylesSelect}
                  options={ranges}
                  isClearable
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
                  onChange={onChange}
                  styles={customStylesSelect}
                  options={genera}
                  isClearable
                />
              )}
              name="genus"
              control={control}
            />
          </section>
        </div>

        <section className="modal-form__footer">
          <button className="btn-primary" type="submit">
            Add Illuvial
          </button>
        </section>
      </form>
    </Modal>
  );
};

export default AddIlluvialForm;
