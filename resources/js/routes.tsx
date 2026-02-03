import React from 'react';
import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import Home from './pages/Home';
import ProfileSekolah from './pages/ProfileSekolah';

const routes = {
    '/': Home,
    '/profil-sekolah': ProfileSekolah,
};

// Setup Inertia app
createInertiaApp({
    resolve: (name) => {
        const pages = routes[name];
        
        if (pages) {
            return pages;
        }
        
        return resolvePageComponent(`./pages/${name}.tsx`, import.meta.glob('./pages/**/*.tsx'));
    },
    setup({ el, App, props }) {
        return <App {...props} />;
    },
}); 