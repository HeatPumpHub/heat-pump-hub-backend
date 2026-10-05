import { Role, UserStatus } from "@prisma/client";
import z, { any, object, record, string } from "zod";


const payload = {
    body: object({
        email: string({
            message: 'Email is required'
        }),
        phoneNumber: string({
            message: 'Phone number is required'
        }),
        firstName: string({
            message: 'First name is required'
        }),
        lastName: string({
            message: 'Last name is required'
        }),
        role: z.enum(Object.values(Role) as [string, ...string[]], {
            message: 'Role is required'
        }),
        roleSpecificCharacteristics: record(string(), any(), {
            message: 'Role specific characteristics are required'
        }),
        status: z.enum(Object.values(UserStatus) as [string, ...string[]], {
            message: 'Status is required'
        })
    }),
}

const params = {
    params: object({
        id: string({
            message: 'ID is required'
        })
    })
}