import { z } from 'zod';
import { ZodError } from 'zod';

// Define session validation schemas
const sessionSchema = z.object({
    userId: z.number({
        required_error: "User ID is required",
        invalid_type_error: "User ID must be a number"
    }),
    userEmail: z.string().email("Invalid email format"),
    isAdmin: z.boolean()
}).strict();

const adminSessionSchema = sessionSchema.extend({
    isAdmin: z.literal(true, {
        invalid_type_error: "Admin privileges required"
    })
});

export const isAuthenticated = (req, res, next) => {
    try {
        // Validate session data against schema
        sessionSchema.parse({
            userId: req.session?.userId,
            userEmail: req.session?.userEmail,
            isAdmin: req.session?.isAdmin
        });
        next();
    } catch (error) {
        if (error instanceof ZodError) {
            const errorMessages = error.errors.map((issue) => ({
                message: `${issue.path.join('.')} is ${issue.message}`,
            }));
            res.status(401).json({
                error: 'Authentication failed',
                details: errorMessages
            });
        } else {
            res.status(500).json({
                error: 'Internal Server Error'
            });
        }
    }
};

export const isAdmin = (req, res, next) => {
    try {
        // Validate session data against admin schema
        adminSessionSchema.parse({
            userId: req.session?.userId,
            userEmail: req.session?.userEmail,
            isAdmin: req.session?.isAdmin
        });
        next();
    } catch (error) {
        if (error instanceof ZodError) {
            const errorMessages = error.errors.map((issue) => ({
                message: `${issue.path.join('.')} is ${issue.message}`,
            }));
            res.status(403).json({
                error: 'Admin access required',
                details: errorMessages
            });
        } else {
            res.status(500).json({
                error: 'Internal Server Error'
            });
        }
    }
};