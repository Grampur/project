import { z } from 'zod';

// Base account schema that matches your database structure
export const accountSchema = z.object({
    
    id: z.number(),
    name: z.string().min(1, 'Name is required').max(255),
    email: z.string().email('Invalid email address').max(255),
    password: z.string().min(8, 'Password must be at least 8 characters'),
    admin: z.boolean().default(false),
    created_at: z.string().datetime()

});

export const createAccountSchema = accountSchema.omit({
    id: true,
    created_at: true

}).strict()

// Schema for updating account password
export const updatePasswordSchema = z.object({

    oldPassword: z.string().min(1, 'Old password is required'),
    newPassword: z.string().min(8, 'New password must be at least 8 characters')

}).strict();

export const loginSchema = z.object({

    email: z.string().email('Invalid email address'),
    password: z.string().min(1, 'Password is required')

}).strict();