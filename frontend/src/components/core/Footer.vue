<template>
    <footer class="bg-primary">
        <div class="w-full max-w-screen-xl mx-auto p-4 md:py-8 text-white">
            <div class="sm:flex sm:items-center sm:justify-between">
                <a class="flex items-center mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse">
                    <img class="h-8" />
                    <span class="self-center text-2xl font-semibold whitespace-nowrap">KLJB Hadersbach</span>
                </a>
                <ul
                    class="flex flex-wrap items-center mb-6 text-sm font-medium sm:mb-0">
                    <li>
                        <RouterLink to="/impressum" class="hover:underline me-4 md:me-6">Impressum</RouterLink>
                    </li>
                    <li>
                        <RouterLink to="/dataprivacy" class="hover:underline me-4 md:me-6">Datenschutz</RouterLink>
                    </li>
                    <li>
                        <RouterLink  to="/contact" class="hover:underline me-4 md:me-6">Kontakt</RouterLink>
                    </li>
                </ul>
            </div>
            <hr class="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
            <span class="block text-sm sm:text-center">© 2024 <a class="hover:underline cursor-default">KLJB Hadersbach</a> Alle Rechte vorbehalten.</span>
        </div>
    </footer>
</template>