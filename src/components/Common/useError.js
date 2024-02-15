import { useState } from 'react';

const useErrorModal = () => {
  const [error, setError] = useState(null);

  const showErrorModal = (errorMessage) => {
    setError(errorMessage);
  };

  const closeErrorModal = () => {
    setError(null);
  };

  return { error, showErrorModal, closeErrorModal };
};

export default useErrorModal;