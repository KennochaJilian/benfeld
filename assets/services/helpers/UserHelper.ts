export class UserHelper{
    public static isAdmin(user){
        return user.roles.includes("ROLE_ADMIN")
    }
}