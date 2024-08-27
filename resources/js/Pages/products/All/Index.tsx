import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import { PageProps } from '@/types';


interface Category {
    id: number;
    name: string;
}

interface Product {
    id: number;
    name: string;
    description: string;
    price: number;
    category: Category;
    status: string;

}

interface ProductsProps extends PageProps {
    products: Product[];
}

export default function Products({ auth, products }: ProductsProps) {
    console.log (products)
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-black-800 leading-tight">Products</h2>}
        >
            <Head title="Products" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="text-lg font-medium">Product List</h3>
                                <Link
                                    href={route('products.create')}
                                    className="bg-red-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                >
                                    Create Product
                                </Link>
                            </div>

                            <table className="min-w-full bg-white">
                                <thead>
                                    <tr>
                                        <th className="py-2 px-4 border-b">ID</th>
                                        <th className="py-2 px-4 border-b">Name</th>
                                        <th className="py-2 px-4 border-b">Description</th>
                                        <th className="py-2 px-4 border-b">Price</th>
                                        <th className="py-2 px-4 border-b">Category Name</th>
                                        <th className="py-2 px-4 border-b">Status</th>
                                        <th className="py-2 px-4 border-b">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {products.map((product) => (
                                        <tr key={product.id}>
                                            <td className="py-2 px-4 border-b">{product.id}</td>
                                            <td className="py-2 px-4 border-b">{product.name}</td>
                                            <td className="py-2 px-4 border-b">{product.description}</td>
                                            <td className="py-2 px-4 border-b">{product.price}</td>
                                            <td className="py-2 px-4 border-b">{product.category.name}</td>
                                            <td className="py-2 px-4 border-b">{product.status}</td>
                                            <td className="py-2 px-4 border-b">
                                            <Link href={route('products.show', product.id)} className="text-green-600 hover:underline button-space">
                                                    View
                                                </Link>
                                                 <Link
                                                    href={route('products.edit', product.id)}
                                                    className="text-blue-600 hover:underline"
                                                >
                                                    Edit
                                                </Link>

                                                <Link
                                                    href={route('products.destroy', product.id)}
                                                    className="text-red-600 hover:underline ml-4"
                                                    method="delete"
                                                    as="button"
                                                >
                                                    Delete
                                                </Link>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>

                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
