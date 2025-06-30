import { Award, BookOpen, ChartArea, GraduationCap, House, SquareTerminal } from "lucide-react"


export const routes = [
    {
        title: "Home",
        url: "/",
        icon: House
    },
    {
        title: "Cursos",
        url: "/courses",
        icon: SquareTerminal
    },
    {
        title: "Mis Cursos",
        url: "/my-courses",
        icon: BookOpen
    },
    {
        title: "Certificados",
        url: "/certificates",
        icon: Award
    },
]

export const rutesTeacher = [
    {
        title: "Cursos",
        url: "/teacher",
        icon: GraduationCap
    },
    {
        title: "Analíticas",
        url: "/teacher/analytics",
        icon: ChartArea
    },
]
