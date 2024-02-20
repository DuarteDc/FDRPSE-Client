
import { Link } from 'react-router-dom';
import { authService } from '../../../domain/services/auth.service';

export const NotFound = () => {
    
    const { user } = authService();

    return (
        <section className="container mx-auto text-center flex items-center flex-col justify-center min-h-screen font-Poppins">
            <div className="w-full grid-cols-1 md:grid md:grid-cols-2 flex items-center justify-center">
                <div className="w-full hidden md:block">
                    <img
                        src="/cuestionario/public/assets/NotFound.svg"
                        width={700}
                        height={600}
                        alt="Build"
                    />
                </div>
                <div>
                    <h1 className="text-9xl md:lg:text-[200px] xl:text-[300px] font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-emerald-600 to-blue-emerald-500">404</h1>
                    <h2 className="text-xl lg:text-4xl uppercase">Página no econtrada</h2>
                    <p className="my-5 text-sm lg:text-base">Opps, la página que buscas no esta disponible por el momento</p>
                    <Link to={`${user ? '/auth' : '/'}`}>
                        <button className="px-10 py-4 rounded-full text-white font-bold mt-10 bg-emerald-600 shadow-xl">
                            Volver al inicio
                        </button>
                    </Link>
                </div>
            </div>
        </section>
    )
}
