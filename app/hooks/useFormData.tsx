// useFormData.tsx
import { useState, useEffect } from 'react';

interface FormValues {
  firstName: string;
  lastName: string;
  gender: string;
  country: string;
  idcard: string;
  file: string; // Change type to string
}

const useFormData = () => {
  const [formData, setFormData] = useState<FormValues>(() => {
    const storedFormData = localStorage.getItem('formData');
    return storedFormData
      ? JSON.parse(storedFormData)
      : {
          firstName: '',
          lastName: '',
          gender: '',
          country: '',
          idcard: '',
          file: '',
        };
  });

  const updateFormData = (newFormData: FormValues) => {
    setFormData(newFormData);
    localStorage.setItem('formData', JSON.stringify(newFormData));
  };

  const isFormDataStored = () => {
    return !!localStorage.getItem('formData');
  };

  const saveFileToLocalFolder = (fileName: string) => {
    // Create a dummy File object with the provided file name
    const file = new File([""], fileName, { type: "text/plain" });
  
    const reader = new FileReader();
    reader.onload = function () {
      const dataUrl = reader.result as string;
      const a = document.createElement('a');
      a.href = dataUrl;
      a.download = fileName;
      a.click();
    };
    reader.readAsDataURL(file);
  };

  useEffect(() => {
    const storedFormData = localStorage.getItem('formData');
    if (storedFormData) {
      setFormData(JSON.parse(storedFormData));
    }
  }, []);

  return { formData, updateFormData, isFormDataStored, saveFileToLocalFolder };
};

export default useFormData;
