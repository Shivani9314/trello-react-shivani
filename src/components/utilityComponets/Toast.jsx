import { Toaster } from 'react-hot-toast';

const Toast = () => {
  return (
    <Toaster
    position="top"
    reverseOrder={false}
    gutter={8}
    containerClassName=""
    containerStyle={{}}
    toastOptions={{
      className: '',
      duration: 5000,
      style: {
        background: '#363636',
        color: '#fff',
      },
  
      success: {
        duration: 3000,
        theme: {
          primary: 'green',
          secondary: 'black',
        },
      },
    }}
  />
  );
};

export default Toast