import { cn } from "@/lib/utils"
import Link, { LinkProps } from "next/link"
import { useRouter } from "next/router"

type ActiveLink = {
    children: React.ReactNode
} & LinkProps

export default function ActiveLink({ children, href, ...rest }: ActiveLink) {
    const router = useRouter()
    const isCurrentPath = 
    const isHomePage = router.pathname === '/'
    const isBlogPage = router.pathname.startsWith('/blog')


    return (
        <Link
            href={href}
            className={
                cn('text-sm font-medium transition-colors hover:text-secondary',
                    isHomePage ? 'text-blue-500 font' : 'text-muted-foreground')}
        >
            Início
        </Link>
    )
}