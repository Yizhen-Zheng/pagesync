import Stripe from "stripe";
import { CreateOrUpdateUser, updateCancelledUser } from "./user";
import { createPayment } from "./payment";

export const handleCheckoutSessionCompleted = async ({
  session,
  stripe,
}: {
  session: Stripe.Response<Stripe.Checkout.Session>;
  stripe: Stripe;
}) => {
  try {
    const customerId = session.customer as string;
    const customer = await stripe.customers.retrieve(customerId);
    // Check if the customer exists and is not deleted(deleted customers does not have name)
    if (customer.deleted) {
      console.error(`Customer with ID ${customerId} has been deleted.`);
      return;
    }
    const email = session.customer_email || session.customer_details?.email;
    if (!email) {
      console.error(`No email found for customer ID ${customerId}`);
      return;
    }
    const fullName = customer.name as string;
    const priceId = session.line_items?.data[0]?.price?.id;
    const status = session.payment_status === "paid" ? "active" : "incomplete";
    const session_id = session.id;
    const amount_total = session.amount_total;

    //------------ DB operations ------------
    // Create or update the user in the database
    const user = await CreateOrUpdateUser({
      email,
      fullName,
      customerId,
      priceId: priceId || "",
      status: status,
    });
    console.log(`User created or updated: ${user}`);
    // Create a payment record
    const payment = await createPayment({
      session_id: session_id,
      amount_total: amount_total || 0,
      priceId: priceId || "",
      email: email,
      status: status || "",
    });
    console.log(`Payment created: ${payment}`);
    //------------ Finish of DB operations ------------
  } catch (error) {
    console.error(`Error retrieving session: ${error}`);
    throw new Error(`Failed to retrieve session: ${error}`);
  }
};

export const handleSubscriptionDeleted = async ({
  subscriptionId,
  stripe,
}: {
  subscriptionId: string;
  stripe: Stripe;
}) => {
  try {
    // Retrieve the subscription to get customer ID
    const subscription = await stripe.subscriptions.retrieve(subscriptionId);
    const customerId = subscription.customer as string;
    // Update user status to 'cancelled'
    await updateCancelledUser({ customer_id: customerId });
    console.log(
      `User with customer ID ${customerId} has been updated to cancelled.`
    );
  } catch (error) {
    console.error(`Error handling subscription deletion: ${error}`);
    throw error;
  }
};
