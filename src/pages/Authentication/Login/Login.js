import { Link } from 'react-router-dom';
import Input from '~/components/Input';

function Login() {
    return (
        <div className="flex h-screen bg-gradient-to-r from-cyan-500 to-blue-500 p-9">
            <form className="m-auto h-3/6 border backdrop-blur-lg bg-white/50 rounded-lg 0 w-full p-4 md:w-8/12 lg:w-4/12 md:p-10">
                <h1 className="text-center md:text-3xl text-sm font-semibold text-blue-800 mb-2">Đăng Nhập</h1>
                <p className="text-center text-sm">
                    Không có tài khoản?
                    <Link className="ml-2 text-blue-800 font-semibold" to={'/SignIn'}>
                        Đăng ký
                    </Link>
                </p>
                <div className="flex flex-col my-8 mx-1">
                    <div className="my-1 justify-center h-8">
                        <Input type="text" placeholder="Tên tài khoản" />
                    </div>
                    <div className="my-1 justify-center h-8">
                        <Input type="text" placeholder="Tên tài khoản" />
                    </div>
                </div>
            </form>
        </div>
    );
}

export default Login;
