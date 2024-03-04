// FormPage2.tsx
'use client';
import React, { useEffect, useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useRouter } from 'next/navigation'; // Assuming correct import
import useFormData from '../../hooks/useFormData';
import styles from './FormPage2.module.css';

const FormPage2 = () => {
  useEffect(() => {
    // Check if token exists in local storage
    const token = localStorage.getItem('token');

    // If token doesn't exist, redirect to login page
    if (!token) {
      router.push('/');
    }
  }, []);
  const router = useRouter();
  const { formData, updateFormData, saveFileToLocalFolder } = useFormData();
  const [file, setFile] = useState<string | null>(formData.file); // Update type to string | null
  const [filePreview, setFilePreview] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);

  const handleSubmit = async (values: any) => {
    try {
      const newFormData = { ...formData, ...values, file };
      updateFormData(newFormData);
      console.log('Form data stored:', newFormData);
      router.push('/pages/Confirmation');
    } catch (error) {
      console.log('Error submitting form:', error);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files[0];
    setFile(droppedFile.name); // Set file name instead of File object

    const reader = new FileReader();
    reader.onload = () => {
      setFilePreview(reader.result as string);
    };
    reader.readAsDataURL(droppedFile);

    setFileName(droppedFile.name);
  };

  return (
    <div className={styles.container}>
      <h1>2. Enter ID Proof</h1>
      <Formik initialValues={formData} onSubmit={handleSubmit}>
        <Form>
          <div className={styles.formGroup}>
            <label htmlFor="idcard" className={styles.formLabel}>
              Id Proof:
            </label>
            <Field as="select" id="idcard" name="idcard" className={styles.formDropDown}>
              <option value="">Select a ID Proof</option>
              <option value="driversLicence">Driver's Licence</option>
              <option value="votersId">Voter's ID</option>
              <option value="passport">Passport</option>
            </Field>
            <ErrorMessage name="idcard" component="div" className={styles.error} />
          </div>

          <div className={styles.dropzone} onDragOver={(e) => e.preventDefault()} onDrop={handleDrop}>
            {filePreview ? (
              <img src={filePreview} alt="Preview" className={styles.previewImage} />
            ) : (
              fileName || 'Drag & Drop your file here'
            )}
          </div>

          {file && (
            <button
              type="button"
              onClick={() => file && saveFileToLocalFolder(file)} // Ensure file is not null before invoking the function
              className={styles.formButton}
            >
              Save File
            </button>
          )}

          <button type="submit" className={styles.formButton}>
            Next
          </button>
        </Form>
      </Formik>
    </div>
  );
};

export default FormPage2;
