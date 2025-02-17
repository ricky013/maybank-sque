export interface IUser {
  id?: string
  userName: string
  userEmail: string
  userPassword: string
  userRole: string
  userImage?: string | null | Blob
}
