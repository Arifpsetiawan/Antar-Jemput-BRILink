import { useMutation } from "react-query";
import Cookies from "universal-cookie";

const cookies = new Cookies();

const useUpdateTransaction = (transactionId, rating, onSuccess, onError) => {
    const { mutate, data, isLoading, isError } = useMutation(
        async () => {
            const response = await fetch(`http://34.81.92.192/transactions/rating/${transactionId}`, {
                method: "PUT", // *GET, POST, PUT, DELETE, etc.
                headers: {
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin":"*",
                    "Access-Control-Allow-Headers": "*",
                    "Authorization": "Bearer " + cookies.get("accessToken"),
                },
                redirect: "follow", // manual, *follow, error
                referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
                body: JSON.stringify(rating), // body data type must match "Content-Type" header
            });
            if (response.ok) {
                return await response.json()
            } else {
                throw new Error("Network response was not ok");
            }
        },
        { onError, onSuccess }
    );

    return { mutate, data, isLoading, isError };
};

export default useUpdateTransaction;
