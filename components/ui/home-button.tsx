import Link from "next/link"


export const HomeButton = () => {
    return (
        <div className="flex items-center justify-between">
            {/* Header fondo blanco, borde bottom, que se mantenga en la parte de arriba, y z index 40 */}
            <Link className="flex px-4 py-3 items-center space-x-3 cursor-pointer
                hover:bg-gray-100 active:scale-98
                transition-transform duration-150 ease-in-out rounded-md
                origin-left"             
                href="/"
                >
            <img src="IconoFiscalIAVectorSinFondo.svg" className="w-8 h-8" />
                <div>
                    <h1 className="text-xl">Fiscal IA</h1>
                    <p className="text-xs text-muted-foreground">
                        Tu asistente fiscal inteligente
                    </p>
                </div>
            </Link>
        </div> 
    )
}