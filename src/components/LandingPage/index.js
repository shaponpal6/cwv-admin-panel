import React, { useState } from "react";
import { connect } from "react-redux";
import { addKnowledge } from "../../redux/actions";
import { useForm } from "react-hook-form";
import { Form } from "antd";

const FromModel = () => {
  const [componentSize, setComponentSize] = useState("default");
  const { register, handleSubmit, watch, errors } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    addKnowledge(data);
  };

  console.log(watch("example")); // watch input value by passing the name of it

  const onFormLayoutChange = ({ size }) => {
    setComponentSize(size);
  };

  return (
    <>
      <Form
        onSubmit={handleSubmit(onSubmit)}
        labelCol={{
          span: 4,
        }}
        wrapperCol={{
          span: 14,
        }}
        layout="horizontal"
        initialValues={{
          size: componentSize,
        }}
        onValuesChange={onFormLayoutChange}
        size={componentSize}
      >
        <input name="id" type="number" ref={register({ min: 1 })} />
        <input name="que" ref={register({ required: true, maxLength: 100 })} />
        <input name="ans" ref={register({ pattern: /^[A-Za-z]+$/i })} />
        <select name="ents" ref={register}>
          <option value="female">female</option>
          <option value="male">male</option>
          <option value="other">other</option>
        </select>
        <select name="talks" ref={register}>
          <option value="female">female</option>
          <option value="male">male</option>
          <option value="other">other</option>
        </select>
        {/* errors will return when field validation fails  */}
        {errors.exampleRequired && <span>This field is required</span>}

        <input type="submit" />
      </Form>
    </>
  );
};

const mapStateToProps = (state) => {
  console.log("state.knowledgeBase.knowledges");
  console.log(state.knowledgeBase.knowledges);
  return { knowledges: state.knowledgeBase.knowledges };
};
// export default VisibilityFilters;
export default connect(mapStateToProps, { addKnowledge })(FromModel);
