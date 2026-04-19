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
    <div class="p-6 max-w-6xl mx-auto">

        <!-- Formulario -->
        <form class="bg-white shadow-md rounded-lg p-6 mb-8 space-y-4">
            <h2 class="text-xl font-semibold mb-4">Registrar Producto</h2>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label class="block text-sm font-medium mb-1">Ingrese Nombre</label>
                    <input type="text"
                        class="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
                </div>

                <div>
                    <label class="block text-sm font-medium mb-1">Ingrese Precio</label>
                    <input type="text"
                        class="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
                </div>

                <div>
                    <label class="block text-sm font-medium mb-1">Ingrese Stock</label>
                    <input type="text"
                        class="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
                </div>

                <div>
                    <label class="block text-sm font-medium mb-1">Ingrese Categoria</label>
                    <input type="text"
                        class="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
                </div>
            </div>

            <button type="button" class="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
                Guardar
            </button>
        </form>

        <div>
            <div>
                <input type="text"
                    class="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Buscar..."
                    v-model="buscar"
                    @change="listarProductos()"
                >
            </div>
        </div>

        <!-- Tabla -->
        <h1 class="text-2xl font-bold mb-4">Gestion de Productos</h1>

        <div class="overflow-x-auto bg-white shadow-md rounded-lg">
            <table class="min-w-full">
                <thead class="bg-gray-100">
                    <tr>
                        <td class="px-4 py-2 font-semibold">ID</td>
                        <td class="px-4 py-2 font-semibold">Nombre</td>
                        <td class="px-4 py-2 font-semibold">Precio</td>
                        <td class="px-4 py-2 font-semibold">Stock</td>
                        <td class="px-4 py-2 font-semibold">Imagen</td>
                        <td class="px-4 py-2 font-semibold">Categoria</td>
                        <td class="px-4 py-2 font-semibold">Acciones</td>
                    </tr>
                </thead>

                <tbody>
                    <tr v-for="p in productos" class="border-t hover:bg-gray-50">
                        <td class="px-4 py-2">{{ p.id }}</td>
                        <td class="px-4 py-2">{{ p.nombre }}</td>
                        <td class="px-4 py-2">{{ p.precio }}</td>
                        <td class="px-4 py-2">{{ p.stock }}</td>
                        <td class="px-4 py-2">
                            <img :src="`https://laravue2.blumbit.net/back/public/${p.imagen}`" alt=""
                                class="w-16 h-16 object-cover rounded">
                        </td>
                        <td class="px-4 py-2">{{ p.categoria.nombre }}</td>
                        <td class="px-4 py-2 space-x-2">
                            <button class="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600">
                                Editar
                            </button>
                            <button class="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600">
                                Eliminar
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>

    </div>

    <!-- <p>{{ productos }}</p> -->
    <pre class="mt-6 bg-gray-900 text-green-400 p-4 rounded overflow-auto">
{{ JSON.stringify(productos, null, 2) }}
    </pre>
</template>