import React from "react";
import { useForm } from "react-hook-form";
import PropTypes from "prop-types";

const AddKnowledgeBaseForm = ({handleSubmitOnClick}) => {
  const { handleSubmit, register, errors } = useForm();
  const onSubmit = (values) => {
    console.log(values);

    handleSubmitOnClick({...values, key: Math.floor(Math.random()*9874289283)})
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input
        name="que"
        ref={register({
          required: "Required"
        })}
      />
      {errors.que && errors.que.message}

      <input
        name="ans"
        ref={register({
          required: "Required"
        })}
      />
      {errors.ans && errors.ans.message}

      <input
        name="events"
        ref={register()}
      />
      {errors.events && errors.events.message}

      <input
        name="talks"
        ref={register()}
      />
      {errors.talks && errors.talks.message}


      <button type="submit">Submit</button>
    </form>
  );
};

AddKnowledgeBaseForm.propTypes = {
  handleSubmitOnClick: PropTypes.func.isRequired,
};

export default AddKnowledgeBaseForm;
