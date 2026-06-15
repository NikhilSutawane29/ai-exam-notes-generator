
import UserModel from "../models/user.model.js";
import { getToken } from "../utils/token.js";

// Controller function to handle Google authentication
export const googleAuth = async (req, res) => {

    try {
        const {name, email} = req.body;
        let user = await UserModel.findOne({email});
        if(!user) {
            user = await UserModel.create({
                name, email
            });
        }
        let token = await getToken(user._id);

        // we "token" named cookie to store the JWT token in the user's browser. The cookie is set to be HTTP-only, which means it cannot be accessed by client-side JavaScript, providing an additional layer of security against cross-site scripting (XSS) attacks. The cookie is also set to expire after 7 days, ensuring that users will need to re-authenticate after this period for continued access.
        res.cookie("token", token, {
            httpOnly: true,
            secure: true,
            sameSite: "none",
            maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
        });
        return res.status(200).json(user);
    } catch (error) {
        return res.status(500).json({message: `googleSignUp Error: ${error.message}`});
    }
}







// Logout function to clear the authentication token cookie
export const logOut = async (req, res) => {
    try {
        await res.clearCookie("token");
        return res.status(200).json({message: "Logged out successfully"});
    } catch (error) {
        return res.status(500).json({message: `Logout Error: ${error.message}`});
    }
}
