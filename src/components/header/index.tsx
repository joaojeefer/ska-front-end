'use client'

/* eslint-disable @next/next/no-img-element */
import { useContext, useState } from 'react'
import { Dialog, DialogPanel, PopoverGroup } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import { AuthContext } from '@/contexts'
  
export const Header = () => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

    const { user, handleLogout } = useContext(AuthContext);

    return (
        <header className="bg-gray-800">
            <nav aria-label="Global" className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8">
                <div className="flex lg:flex-1">
                    <div className="-m-1.5 p-1.5">
                        <span className="sr-only">Sua empresa</span>
                        <img
                            alt="Sua empresa"
                            src="https://tailwindui.com/plus/img/logos/mark.svg?color=indigo&shade=500"
                            className="h-8 w-8"
                        />
                    </div>
                </div>
                <div className="flex lg:hidden">
                    <button
                        type="button"
                        onClick={() => setMobileMenuOpen(true)}
                        className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-white"
                    >
                        <span className="sr-only">Abre menu</span>
                        <Bars3Icon aria-hidden="true" className="h-6 w-6" />
                    </button>
                </div>
                <PopoverGroup className="hidden lg:flex lg:gap-x-12">
                    <a href='/machines' className="text-sm font-semibold leading-6 text-white">
                        Máquinas
                    </a>
                </PopoverGroup>
                <div className="hidden lg:flex lg:flex-1 lg:justify-end">
                    {!!user ? (
                        <div className='flex flex-row items-center'>
                            <p className='text-md font-bold leading-6 text-white px-5'>{user.username}</p>
                            <button onClick={handleLogout} className="text-sm font-semibold leading-6 text-white">
                                Sair <span aria-hidden="true">&rarr;</span>
                            </button>
                        </div>
                    ) : (
                        <a href="#" className="text-sm font-semibold leading-6 text-white">
                            Entrar <span aria-hidden="true">&rarr;</span>
                        </a>
                    )}
                </div>
            </nav>
            <Dialog open={mobileMenuOpen} onClose={setMobileMenuOpen} className="lg:hidden">
                <div className="fixed inset-0 z-10" />
                <DialogPanel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
                    <div className="flex items-center justify-between">
                        <a href="#" className="-m-1.5 p-1.5">
                            <span className="sr-only">Sua empresa</span>
                            <img
                                alt=""
                                src="https://tailwindui.com/plus/img/logos/mark.svg?color=indigo&shade=500"
                                className="h-8 w-auto"
                            />
                        </a>
                        <button
                            type="button"
                            onClick={() => setMobileMenuOpen(false)}
                            className="-m-2.5 rounded-md p-2.5 text-gray-700"
                        >
                            <span className="sr-only">Fechar menu</span>
                            <XMarkIcon aria-hidden="true" className="h-6 w-6" />
                        </button>
                    </div>
                    <div className="mt-6 flow-root">
                        <div className="-my-6 divide-y divide-gray-500/10">
                            <div className="space-y-2 py-6">
                                <a
                                    href="/machines"
                                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                                >
                                    Máquinas
                                </a>
                            </div>
                            <div className="py-6">
                                {!!user ? (
                                    <>
                                        <p className='text-md font-bold leading-6 text-gray-900'>{user.username}</p>
                                        <button onClick={handleLogout} className="text-sm font-semibold leading-6 text-gray-900">
                                            Sair <span aria-hidden="true">&rarr;</span>
                                        </button>
                                    </>
                                ) : (
                                    <a
                                        href="#"
                                        className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                                    >
                                        Entrar
                                    </a>
                                )}
                            </div>
                        </div>
                    </div>
                </DialogPanel>
            </Dialog>
        </header>
    )
}
