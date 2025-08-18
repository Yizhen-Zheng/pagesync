import { getDbConnection } from "@/lib/db";
import { getUserUploadCount } from "./summaries";
import { plans, priceIdToPlan, planMap } from "@/utils/constants";
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
  try {
    const sql = await getDbConnection();
    const user = await sql`SELECT * FROM users WHERE email = ${email}`;
    if (user.length === 0) {
      // Create a new user if not exists
      const res =
        await sql`INSERT INTO users (email,full_name,customer_id,price_id,status) VALUES (${email},${fullName},${customerId},${priceId},${status}) RETURNING *`;
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
  try {
    const sql = await getDbConnection();
    const res = await sql`
        UPDATE users
        SET status = 'cancelled'
        WHERE customer_id = ${customer_id}
        RETURNING *
        `;
  } catch (error) {
    console.error(`Error updating user status: ${error}`);
    throw error;
  }
};

export const getUserByEmail = async (email: string, fields: string[] = []) => {
  try {
    const sql = await getDbConnection();
    const user = await sql`SELECT * FROM users WHERE email = ${email}`;
    if (user.length === 0) {
      throw new Error(`User with email ${email} not found`);
    }
    if (fields.length === 0) {
      return user[0];
    }
    return Object.fromEntries(fields.map((key) => [key, user[0][key]]));
  } catch (error) {
    console.error(`Error retrieving user: ${error}`);
    return null;
  }
};

export const getUploadLimitOfUser = async (userId: string, email: string) => {
  const uploadCount = await getUserUploadCount(userId);
  const userInfo = await getUserByEmail(email, ["price_id"]);
  const planName = userInfo ? priceIdToPlan(userInfo.price_id) : "free";
  const uploadLimit = planMap[planName].uploadLimit;
  return { uploadLimit, uploadCount };
};
export const getStatusOfUser = async (email: string) => {
  const userInfo = await getUserByEmail(email, ["status"]);
  return userInfo ? userInfo.status : "inactive";
};
