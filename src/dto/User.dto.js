export default class UserDTO {
    static getUserTokenFrom = (user) =>{
        return {
            name: `${user.first_name} ${user.last_name}`,
            role: user.role,
            email:user.email
        }
    }

    static getUserInputFrom = (user) =>{
        return {
            first_name:user.first_name||'',
            last_name:user.last_name||'',
            email:user.email||'',
            password: user.password||'',
            role:user.role||'user'
        }
    }
}