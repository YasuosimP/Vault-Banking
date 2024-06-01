"use server";

import { ID, Query } from "node-appwrite";
import { createAdminClient } from "../appwrite";
import { parseStringify } from "../utils";

// Environment Variables
const {
  APPWRITE_DATABASE_ID: DATABASE_ID,
  APPWRITE_REQUEST_COLLECTION_ID: REQUEST_COLLECTION_ID,
} = process.env;

// Function to Create Checkbook Request
export const createCheckbookRequest = async (requestParams: CreateCheckbookRequestProps) => {
  try {
    const { database } = await createAdminClient();

    const newRequest = await database.createDocument(
      DATABASE_ID!,
      REQUEST_COLLECTION_ID!,
      ID.unique(),
      {
        bankId: requestParams.bankId,
        checkbookCount: requestParams.checkbookCount,
        deliveryAddress: requestParams.deliveryAddress,
        notes: requestParams.notes,
        createdAt: new Date().toISOString(),
      }
    );

    return parseStringify(newRequest);
  } catch (error) {
    console.error("Failed to create checkbook request:", error);
    throw error;
  }
};

// Function to Fetch Checkbook Requests by Bank ID
export const getCheckbookRequestsByBankId = async ({ bankId }: { bankId: string }) => {
  try {
    const { database } = await createAdminClient();

    const requests = await database.listDocuments(
      DATABASE_ID!,
      REQUEST_COLLECTION_ID!,
      [Query.equal('bankId', bankId)],
    );

    return parseStringify(requests);
  } catch (error) {
    console.error("Failed to fetch checkbook requests:", error);
    throw error;
  }
};

// Function to Fetch All Checkbook Requests
export const fetchCheckbookRequests = async () => {
  try {
    const { database } = await createAdminClient();

    const response = await database.listDocuments(
      DATABASE_ID!,
      REQUEST_COLLECTION_ID!
    );

    return parseStringify(response.documents);
  } catch (error) {
    console.error("Failed to fetch checkbook requests:", error);
    throw error;
  }
};
