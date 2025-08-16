import { getDbConnection } from "@/lib/db";
// DB operation: create or update user in the database
export const CreateOrUpdateUser = async ({
  email,
  fullName,
  customerId,
  priceId,
  status,
}: {
  email: string;
  fullName: string;
  customerId: string;
  priceId: string;
  status: string;
}) => {
  console.log("insert user:");
  console.log(email, fullName, customerId, priceId, status);
  try {
    const sql = await getDbConnection();
    const user = await sql`SELECT * FROM users WHERE email = ${email}`;
    if (user.length === 0) {
      // Create a new user if not exists
      const res =
        await sql`INSERT INTO users (email,full_name,customer_id,price_id,status) VALUES (${email},${fullName},${customerId},${priceId},${status}) RETURNING *`;
      console.log(`User created: ${res[0]}`);
    }
  } catch (error) {
    console.error(`Error creating or updating user: ${error}`);
    throw error;
  }
};

export const updateCancelledUser = async ({
  customer_id,
}: {
  customer_id: string;
}) => {
  console.log("update user status to cancelled:");
  console.log(customer_id);
  try {
    const sql = await getDbConnection();
    const res = await sql`
        UPDATE users
        SET status = 'cancelled'
        WHERE customer_id = ${customer_id}
        RETURNING *
        `;
    console.log(`User updated: ${res[0]}`);
  } catch (error) {
    console.error(`Error updating user status: ${error}`);
    throw error;
  }
};
