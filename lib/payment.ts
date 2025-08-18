import { getDbConnection } from "./db";

// DB operation: insert payment record into the database
export const createPayment = async ({
  session_id,
  amount_total,
  priceId,
  email,
  status,
}: {
  session_id: string;
  amount_total: number;
  priceId: string;
  email: string;
  status: string;
}) => {
  try {
    const sql = await getDbConnection();
    const payment = await sql`
        INSERT INTO payments (amount, status, stripe_payment_id, price_id, user_email)
        VALUES (${amount_total}, ${status}, ${session_id}, ${priceId}, ${email})
        RETURNING *
        `;
    return payment[0];
  } catch (error) {
    console.error(`Error creating payment: ${error}`);
    throw new Error(`Failed to create payment: ${error}`);
  }
};
