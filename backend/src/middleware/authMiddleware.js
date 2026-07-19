const jwt = require('jsonwebtoken');

const DEMO_TOKEN = 'super_secret_fleet_intel_token_signature_key_2026';

module.exports = (req, res, next) => {
  try {
    // Intercept standard Authorization: Bearer <TOKEN> header
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ success: false, message: 'Access Denied: No token provided.' });
    }

    const token = authHeader.split(' ')[1];

    // The dashboard currently has no sign-in flow. Permit its mock token only
    // in local development, while production continues to require a real JWT.
    if (process.env.NODE_ENV !== 'production' && token === DEMO_TOKEN) {
      req.user = { role: 'Super Admin', isDemo: true };
      return next();
    }
    
    // Verify token validity against your signature secret
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'super_secret_fleet_intel_token_signature_key_2026');
    
    // Inject decoded user payload into downstream route contexts
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(403).json({ success: false, message: 'Authentication failure: Invalid or expired token.' });
  }
};
