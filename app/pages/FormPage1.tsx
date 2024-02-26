// FormPage1.tsx
'use Client'
import { useFormik } from 'formik';
import React from 'react';
import { useRouter } from 'next/navigation';
import styles from './FormPage1.module.css';

const FormPage1 = () => {
  const router = useRouter();
  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName:'',
    },
    onSubmit: values => {
      alert(JSON.stringify(values, null, 2));
      // try {
      //   await axios.post('/api/form1', values);
      //   router.push('/FormPage2');
      // } catch (error) {
      //   console.log('Error submitting form:', error);
      // }
    },
  });
  

  return (
        <form onSubmit={formik.handleSubmit}>
          <div className={styles.formGroup}>
            <label htmlFor="firstName">First Name:</label>
            <input id="firstName" name="firstName" type="firstName"
         onChange={formik.handleChange}
         value={formik.values.firstName} />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="lastName">Last Name:</label>
            <input id="lastName" name="lastName" type="lastName"
         onChange={formik.handleChange}
         value={formik.values.firstName} />
          </div>

          <button type="submit" className={styles.formButton}>Next</button>
        </form>
  );
};

export default FormPage1;
