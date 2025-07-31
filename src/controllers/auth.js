import {
    registerUser,
    loginUser,
    logoutUser,
    refreshSession,
    
} from '../services/auth.js';



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
   console.log('req.body:', req.body);
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