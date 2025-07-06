import { createContext, useContext, useState, useEffect, ReactNode, Children } from 'react'
import { useRouter } from 'next/router'
import { Jwt } from 'jsonwebtoken'


enum UserRole {
    ADMIN = 'ADMIN',
    USER = 'USER'
}

type User = {
    id: string
    email: string
    name: string
    role: string
}

type AuthContextType = {
    user: User | null
    login: (email: string, password: string) => Promise<void>
    logout: () => void
    isAuthenticated: boolean
    loading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

// criando provedor
export const AuthProvaider = ({ Children }: { Children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null)
    const [loading, setLoading] = useState(true)
    const router = useRouter()
    
}