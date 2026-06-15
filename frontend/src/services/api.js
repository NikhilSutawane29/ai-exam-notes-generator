import axios from "axios";
import { serverUrl } from "../App";
import { setUserData } from "../redux/userSlice.js";

export const getCurrentUser = async (dispatch) => {
  try {
    const result = await axios.get(serverUrl + "/api/user/currentUser", {
      withCredentials: true,
    });

    dispatch(setUserData(result.data.user));
  } catch (error) {
    console.error("Error fetching current user:", error);
  }
};


export const generateNotes = async (payload) => {
  try {
    const result = await axios.post(serverUrl + "/api/notes/generate-notes", payload, {
      withCredentials: true,
    });
    console.log(result.data);
    return result.data;
  } catch (error) {
    console.error("Error generating notes:", error);
  }
}




// we fetch our pdf api
export const downloadPdf = async (result) => {
  try {
    const response = await axios.post(serverUrl+ "/api/pdf/generate-pdf", {result}, {
      responseType: "blob",
      withCredentials: true
    });

    // we want pdf data inside Blob
    const blob = new Blob([response.data], {
      type: "application/pdf"
    });

    // we create a link for that blob pdf data
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a"); // we create store link in an "anchor("a") tag inside href=""
    link.href = url;
    link.download = "ExamNotesAI.pdf"; // pdf file name ExamNotesAI.pdf
    link.click(); 

    window.URL.revokeObjectURL(url);

  } catch (error) {
    throw new Error("PDF download failed");
  }
}