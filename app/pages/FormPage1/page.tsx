'use client';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';
import * as Yup from 'yup'; 
import styles from './FormPage1.module.css';
import useFormData from '../../hooks/useFormData';
import axiosInstance from '../../utils/axiosInstance'; // Import Axios instance

interface FormValues {
  firstName: string;
  lastName: string;
  gender: string;
  country: string;
  idcard: string;
  file:string;
}

const FormPage1 = () => {
  useEffect(() => {
    // Check if token exists in local storage
    const token = localStorage.getItem('token');

    // If token doesn't exist, redirect to login page
    if (!token) {
      router.push('/');
    }
  }, []);
  const router = useRouter();
  const { formData, updateFormData, isFormDataStored } = useFormData();

  const handleSubmit = async (values: FormValues) => {
    try {
      updateFormData(values);
      console.log('Is form data stored:', isFormDataStored());

      // Make authenticated API request using Axios
      await axiosInstance.post('/api/form1', values);
      router.push('/pages/FormPage2');
    } catch (error) {
      console.log('Error submitting form:', error);
    }
  };

  // Define the validation schema using Yup
  const validationSchema = Yup.object().shape({
    firstName: Yup.string().required('First Name is required'),
    lastName: Yup.string().required('Last Name is required'),
    gender: Yup.string().required('Gender is required'),
    country: Yup.string().required('Country is required'),
  });

  return (
    <div className={styles.container}>
      <h1>1. Enter Basic Details</h1>
      <Formik
        initialValues={formData}
        onSubmit={handleSubmit}
        validationSchema={validationSchema} // Pass the validation schema here
      >
        <Form>
          <div className={styles.formGroup}>
            <label htmlFor="firstName" className={styles.formLabel}>
              First Name:
            </label>
            <Field id="firstName" name="firstName" className={styles.formInput} />
            <ErrorMessage name="firstName" component="div" className={styles.error} /> {/* Display validation error */}
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="lastName" className={styles.formLabel}>
              Last Name:
            </label>
            <Field id="lastName" name="lastName" className={styles.formInput} />
            <ErrorMessage name="lastName" component="div" className={styles.error} /> {/* Display validation error */}
          </div>

          <div className={styles.formGroup}>
            <label className={styles.formLabel}>Gender:</label>
            <div className={styles.radioGroup}>
              <label>
                <Field type="radio" name="gender" value="male" />
                Male
              </label>
              <label>
                <Field type="radio" name="gender" value="female" />
                Female
              </label>
              <label>
                <Field type="radio" name="gender" value="other" />
                Other
              </label>
            </div>
            <ErrorMessage name="gender" component="div" className={styles.error} /> {/* Display validation error */}
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="country" className={styles.formLabel}>
              Country:
            </label>
            <Field as="select" id="country" name="country" className={styles.formDropDown}>
              <option value="">Select a country</option>
              <option value="USA">United States</option>
              <option value="UK">United Kingdom</option>
              <option value="Canada">Canada</option>
            </Field>
            <ErrorMessage name="country" component="div" className={styles.error} /> {/* Display validation error */}
          </div>

          <button type="submit" className={styles.formButton}>
            Next
          </button>
        </Form>
      </Formik>
    </div>
  );
};

export default FormPage1;
