// ConfirmationPageContent.tsx
'use client';
import React from 'react';
import useFormData from '../../hooks/useFormData'; // Assuming you have a custom hook to access form data
import styles from './ConfirmationPageContent.module.css';

const ConfirmationPageContent = () => {
  const { formData } = useFormData(); // Assuming useFormData hook provides access to form data

  // Function to handle confirmation
  const handleConfirm = () => {
    // Perform actions on confirmation, such as submitting data or navigating to the next page
    console.log('Form data confirmed:', formData);
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Confirmation Page</h1>
      <div className={styles.item}>
        <label>Name :</label> {formData.firstName} {formData.lastName}
      </div>
      <div className={styles.item}>
        <label>Gender :</label> {formData.gender}
      </div>
      <div className={styles.item}>
        <label>Country :</label> {formData.country}
      </div>
      <div className={styles.item}>
        <label>Selected ID:</label> {formData.idcard}
      </div>

      {formData.file && (
        <div className={styles.item}>
          <p>Uploaded File:</p>
          {formData.file.endsWith('.jpg') ? (
            <img src={`../../../uploads/${formData.file}`} alt="Uploaded File" />
          ) : (
            <p>{formData.file}</p>
          )}
        </div>
      )}
      {/* <button className={styles.confirmButton} onClick={handleConfirm}>Confirm</button> */}
    </div>
  );
};

export default ConfirmationPageContent;
