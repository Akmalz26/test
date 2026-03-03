import { Head, useForm } from '@inertiajs/react';
import { Eye, EyeOff, LoaderCircle } from 'lucide-react';
import { FormEventHandler, useState } from 'react';

import InputError from '@/components/input-error';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AuthLayout from '@/layouts/auth-layout';

type LoginForm = {
    email: string;
    password: string;
    remember: boolean;
};

interface LoginProps {
    status?: string;
    canResetPassword: boolean;
}

export default function Login({ status, canResetPassword }: LoginProps) {
    const [showPassword, setShowPassword] = useState(false);

    const { data, setData, post, processing, errors, reset } = useForm<Required<LoginForm>>({
        email: '',
        password: '',
        remember: false,
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <div className="min-h-screen bg-black text-white flex items-center justify-center px-4 py-12">
            <Head title="Login" />

            <div className="w-full max-w-md bg-zinc-900/70 rounded-xl border border-zinc-800 shadow-2xl p-8">
                <div className="flex flex-col items-center mb-8">
                    <img src="/assets/images/logo.png" alt="SMK IT Baitul Aziz" className="h-30 w-auto mb-4" />
                    <h1 className="text-2xl font-bold">Login <span className="text-orange-500">Akun</span></h1>
                    <p className="text-zinc-400 text-sm mt-2 text-center">Masukkan email dan password</p>
                </div>

                <form className="flex flex-col gap-6" onSubmit={submit}>
                    <div className="grid gap-6">
                        <div className="grid gap-2">
                            <Label htmlFor="email" className="text-zinc-300">Alamat Email</Label>
                            <Input
                                id="email"
                                type="email"
                                required
                                autoFocus
                                tabIndex={1}
                                autoComplete="email"
                                value={data.email}
                                onChange={(e) => setData('email', e.target.value)}
                                placeholder="email@example.com"
                                className="bg-zinc-800 border-zinc-700 text-white placeholder:text-zinc-500 focus:border-orange-500 focus:ring-orange-500"
                            />
                            <InputError message={errors.email} />
                        </div>

                        <div className="grid gap-2">
                            <div className="flex items-center">
                                <Label htmlFor="password" className="text-zinc-300">Password</Label>
                                {canResetPassword && (
                                    <TextLink href={route('password.request')} className="ml-auto text-sm text-orange-500 hover:text-orange-400" tabIndex={5}>
                                        Lupa password?
                                    </TextLink>
                                )}
                            </div>
                            <div className="relative">
                                <Input
                                    id="password"
                                    type={showPassword ? "text" : "password"}
                                    required
                                    tabIndex={2}
                                    autoComplete="current-password"
                                    value={data.password}
                                    onChange={(e) => setData('password', e.target.value)}
                                    placeholder="Password"
                                    className="bg-zinc-800 border-zinc-700 text-white placeholder:text-zinc-500 focus:border-orange-500 focus:ring-orange-500 pr-10"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-200 transition-colors"
                                    tabIndex={-1}
                                >
                                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                </button>
                            </div>
                            <InputError message={errors.password} />
                        </div>

                        <div className="flex items-center space-x-3">
                            <Checkbox
                                id="remember"
                                name="remember"
                                checked={data.remember}
                                onClick={() => setData('remember', !data.remember)}
                                tabIndex={3}
                                className="border-zinc-700 text-orange-500 focus:ring-orange-500"
                            />
                            <Label htmlFor="remember" className="text-zinc-300">Ingat saya</Label>
                        </div>

                        <Button
                            type="submit"
                            className="mt-4 w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white"
                            tabIndex={4}
                            disabled={processing}
                        >
                            {processing && <LoaderCircle className="h-4 w-4 animate-spin mr-2" />}
                            Masuk
                        </Button>
                    </div>

                    <div className="text-center text-sm text-zinc-400">
                        Belum punya akun?{' '}
                        <TextLink href={route('register')} className="text-orange-500 hover:text-orange-400" tabIndex={5}>
                            Daftar sekarang
                        </TextLink>
                    </div>
                </form>

                {status && <div className="mt-4 text-center text-sm font-medium text-green-500">{status}</div>}
            </div>
        </div>
    );
}
