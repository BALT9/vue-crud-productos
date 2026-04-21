<script setup>
// Importa Sevicio Producto
import { onMounted, ref } from 'vue';
import productoService from '../services/producto.service';

const productos = ref([]);

// variable de busqueda
const buscar = ref("");

onMounted(() => {
    listarProductos();
})


async function listarProductos() {
    const res = await productoService.funListar(buscar.value);
    console.log(res);
    productos.value = res.data.data;
}


</script>


<template>
    <div class="min-h-screen bg-gray-50 p-4 md:p-8">
        <div class="max-w-6xl mx-auto">

            <div class="mb-8">
                <h1 class="text-3xl font-extrabold text-gray-800">Gestión de Inventario</h1>
                <p class="text-gray-500">Administra tus productos, precios y existencias en tiempo real.</p>
            </div>

            <form class="bg-white shadow-sm border border-gray-100 rounded-xl p-6 mb-10 transition-all hover:shadow-md">
                <div class="flex items-center mb-6">
                    <div class="bg-blue-100 p-2 rounded-lg mr-3">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-blue-600" fill="none"
                            viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
                        </svg>
                    </div>
                    <h2 class="text-xl font-bold text-gray-700">Registrar Nuevo Producto</h2>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
                    <div class="space-y-1">
                        <label class="text-xs font-bold uppercase text-gray-500 tracking-wider">Nombre del
                            Producto</label>
                        <input type="text" placeholder="Ej. Laptop Pro"
                            class="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-2.5 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all">
                    </div>

                    <div class="space-y-1">
                        <label class="text-xs font-bold uppercase text-gray-500 tracking-wider">Precio ($)</label>
                        <input type="text" placeholder="0.00"
                            class="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-2.5 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all">
                    </div>

                    <div class="space-y-1">
                        <label class="text-xs font-bold uppercase text-gray-500 tracking-wider">Stock Inicial</label>
                        <input type="text" placeholder="Cantidad"
                            class="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-2.5 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all">
                    </div>

                    <div class="space-y-1">
                        <label class="text-xs font-bold uppercase text-gray-500 tracking-wider">Categoría</label>
                        <input type="text" placeholder="Ej. Electrónica"
                            class="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-2.5 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all">
                    </div>
                </div>

                <div class="mt-6 flex justify-end">
                    <button type="button"
                        class="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-2.5 rounded-lg shadow-sm hover:shadow-blue-200 transition-all transform active:scale-95">
                        Guardar Producto
                    </button>
                </div>
            </form>

            <div class="bg-white shadow-sm border border-gray-100 rounded-xl overflow-hidden">

                <div
                    class="p-6 border-b border-gray-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <h3 class="text-lg font-bold text-gray-700">Listado de Productos</h3>
                    <div class="relative w-full md:w-72">
                        <span class="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24"
                                stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </span>
                        <input type="text"
                            class="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-full text-sm focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                            placeholder="Buscar por nombre..." v-model="buscar" @keypress.enter="listarProductos()">
                    </div>
                </div>

                <div class="overflow-x-auto">
                    <table class="min-w-full divide-y divide-gray-200">
                        <thead class="bg-gray-50">
                            <tr>
                                <th
                                    class="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-widest">
                                    ID</th>
                                <th
                                    class="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-widest">
                                    Producto</th>
                                <th
                                    class="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-widest">
                                    Precio</th>
                                <th
                                    class="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-widest">
                                    Stock</th>
                                <th
                                    class="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-widest">
                                    Categoría</th>
                                <th
                                    class="px-6 py-3 text-center text-xs font-bold text-gray-500 uppercase tracking-widest">
                                    Acciones</th>
                            </tr>
                        </thead>
                        <tbody class="divide-y divide-gray-100 bg-white">
                            <tr v-for="p in productos" :key="p.id" class="hover:bg-blue-50/30 transition-colors">
                                <td class="px-6 py-4 text-sm font-medium text-gray-400">#{{ p.id }}</td>
                                <td class="px-6 py-4">
                                    <div class="flex items-center">
                                        <img :src="`https://laravue2.blumbit.net/back/public/${p.imagen}`"
                                            class="w-12 h-12 object-cover rounded-lg shadow-sm border border-gray-100 mr-3">
                                        <span class="text-sm font-semibold text-gray-700">{{ p.nombre }}</span>
                                    </div>
                                </td>
                                <td class="px-6 py-4 text-sm text-gray-600 font-mono">${{ p.precio }}</td>
                                <td class="px-6 py-4">
                                    <span
                                        :class="p.stock < 10 ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'"
                                        class="px-2.5 py-0.5 rounded-full text-xs font-medium">
                                        {{ p.stock }} unidades
                                    </span>
                                </td>
                                <td class="px-6 py-4 text-sm text-gray-500 italic">{{ p.categoria.nombre }}</td>
                                <td class="px-6 py-4 text-center">
                                    <div class="flex justify-center space-x-2">
                                        <button
                                            class="p-2 text-yellow-600 hover:bg-yellow-100 rounded-lg transition-colors"
                                            title="Editar">
                                            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none"
                                                viewBox="0 0 24 24" stroke="currentColor">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                    d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                            </svg>
                                        </button>
                                        <button class="p-2 text-red-600 hover:bg-red-100 rounded-lg transition-colors"
                                            title="Eliminar">
                                            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none"
                                                viewBox="0 0 24 24" stroke="currentColor">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                            </svg>
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            <details class="mt-10">
                <summary class="cursor-pointer text-xs text-gray-400 hover:text-gray-600 mb-2">Ver JSON de depuración
                </summary>
                <pre class="bg-gray-900 text-green-400 p-4 rounded-xl text-xs overflow-auto shadow-inner max-h-64">
                    {{ JSON.stringify(productos, null, 2) }}
                </pre>
            </details>
        </div>
    </div>
</template>