import {
    registerUser,
    loginUser,
    logoutUser,
    refreshSession,
    requestPasswordReset,
    resetPassword,
    loginOrRegistr,
    
} from '../services/auth.js';

import { getOAuthURL, validateCode } from '../utils/googleOAuth.js';



//registerController

export const registerController = async (req, res, next) => {
   
        const user = await registerUser(req.body);
        res.status(201).json({
            status: 201,
            message: 'Successfully registered a user!',
            data: user,
        });
    
};


//loginController

export const loginController = async (req, res, next) => {
   //console.log('req.body:', req.body);
    const session = await loginUser(req.body.email, req.body.password);

    res.cookie('sessionId', session._id, {
        httpOnly: true,
        expires: session.refreshTokenValidUntil,
    });

    res.cookie('refreshToken', session.refreshToken, {
        httpOnly: true,
        expires: session.refreshTokenValidUntil,
    });
    
    res.json({
        status: 200,
        message: 'User login successfully',
        data: {
            accessToken: session.accessToken,
        }
    });
    
};

//logoutController

export const logoutController = async (req, res) => {
    const { sessionId } = req.cookies;

    if (sessionId) {
        await logoutUser(sessionId);
    }

    res.clearCookie('sessionId');
    res.clearCookie('refreshToken');

    res.status(204).end();
};

//refreshController

export const refreshController = async (req, res) => {
    const { sessionId, refreshToken } = req.cookies;

    const session = await refreshSession(sessionId, refreshToken);

    res.cookie('sessionId', session._id, {
        httpOnly: true,
        expires: session.refreshTokenValidUntil,
    });

    res.cookie('refreshToken', session.refreshToken, {
        httpOnly: true,
        expires: session.refreshTokenValidUntil,
    });

    res.json({
        status: 200,
        message: 'Session refreshed successfully',
        data: {
            accessToken: session.accessToken,
        },
    });
};

//requestPasswordResetController


export const requestPasswordResetController = async (req, res) => {
    await requestPasswordReset(req.body.email);

    res.json({ status: 200, message: "Message sent successfully" });

};

// resetPasswordController

export const resetPasswordController = async (req, res) => {
    const { token, password } = req.body;

    await resetPassword(token, password);

    res.json({
        status: 200,
        message: ""
    });
};

//getOAuthController

export const getOAuthController = async (req, res) => {
    const url = await getOAuthURL();

    res.json({
        status: 200,
        message: 'Successfully get OAuth url',
        data: {
            oauth_url: url,
        }
    });
};


//confirmOAuthController

export const confirmOAuthController = async (req, res) => {
    const tiket = await validateCode(req.body.code);
    
    const session = await loginOrRegistr(tiket.payload.email, tiket.payload.name);


    res.cookie('sessionId', session._id, {
        httpOnly: true,
        expires: session.refreshTokenValidUntil,
    });

    res.cookie('refreshToken', session.refreshToken, {
        httpOnly: true,
        expires: session.refreshTokenValidUntil,
    });

    res.json({
        status: 200,
        message: 'Login via OAuth succesfully',
        data: {
            accessToken: session.accessToken,
        },
    });

};