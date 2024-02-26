// pages/FormPage2.tsx
import { Formik, Form, Field } from 'formik';
import axios from 'axios';
import { useRouter } from 'next/router';

interface FormValues {
  email: string;
  password: string;
}

const FormPage2 = () => {
  const router = useRouter();
  const { id } = router.query;

  const handleSubmit = async (values: FormValues) => {
    try {
      await axios.post(`/api/form2/${id}`, values);
      // Handle success or redirect as needed
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <div>
      <h1>Form Page 2</h1>
      <Formik
        initialValues={{ email: '', password: '' }}
        onSubmit={handleSubmit}
      >
        <Form>
          <label htmlFor="email">Email:</label>
          <Field id="email" name="email" />

          <label htmlFor="password">Password:</label>
          <Field id="password" name="password" type="password" />

          <button type="submit">Submit</button>
        </Form>
      </Formik>
    </div>
  );
};

export default FormPage2;
