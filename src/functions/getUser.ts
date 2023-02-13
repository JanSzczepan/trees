export type User = {
   uid: string
   name: string
   surname: string
   userName: string
   email: string
}

export default function getUser(): User {
   const user =
      localStorage.getItem('user') && JSON.parse(localStorage.getItem('user')!)

   return user || { uid: '', name: '', surname: '', userName: '', email: '' }
}
