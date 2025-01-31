import {
  useStripe,
  useElements,
  PaymentElement,
} from '@stripe/react-stripe-js';

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event) => {
    // We don't want to let default form submission happen here,
    // which would refresh the page.
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js hasn't yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    const result = await stripe.confirmPayment({
      //`Elements` instance that was used to create the Payment Element
      elements,
      confirmParams: {
        return_url:
          `${process.env.REACT_APP_SITE_URL}/payment-successfull`,
      },
    });

    if (result.error) {
      // Show error to your customer (for example, payment details incomplete)
      console.log(result.error.message);
    } else {
      // Your customer will be redirected to your `return_url`. For some payment
      // methods like iDEAL, your customer will be redirected to an intermediate
      // site first to authorize the payment, then redirected to the `return_url`.
    }
  };

  return (
    <form onSubmit={handleSubmit} className='h-screen'>
      <div className='flex items-center justify-center'>
        <div className='border rounded-lg p-4 w-[40%] bg-white'>
          <PaymentElement />
          <button
            className={`w-full bg-[#6772e5] cursor-pointer transition-all duration-300 ease-in disabled:bg-[#d3d3d3] disabled:cursor-not-allowed text-lg font-semibold hover:bg-[#5469d4] text-white p-3 rounded-xl mt-6`}
            disabled={!stripe}
          >
            Submit
          </button>
        </div>
      </div>
    </form>
  );
};

export default CheckoutForm;
