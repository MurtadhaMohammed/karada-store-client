import { apiCall } from "@/lib/api";

/**
 * Helper function to cancel an installment
 * @param {string} installmentId - The ID of the installment to cancel
 * @returns {Promise<Object>} - The API response
 */
export const cancelInstallment = async (installmentId) => {
    try {
        const response = await apiCall({
            pathname: `/client/installment/cancel`,
            method: "POST",
            data: {
                installmentId
            },
            auth: true, // Assuming this requires authentication
        });

        return response;
    } catch (error) {
        console.error("Error canceling installment:", error);
        throw error;
    }
};