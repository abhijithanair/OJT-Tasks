
import { useEffect } from 'react';

const ErrorComponent = ({ error, reset }: { error: Error, reset: () => void }) => {
  useEffect(() => {
    console.error(error); // Log the error
  }, [error]);

  return (
    <div>
      <h2>Something went wrong!</h2>
      <button onClick={reset}>Try again</button>
    </div>
  );
};

export default ErrorComponent;