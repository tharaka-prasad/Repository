import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm, router } from '@inertiajs/react';
import { PageProps } from '@/types';
import { useState } from 'react';

interface Category {
    id: number;
    name: string;
    description: string;
}

interface CategoriesProps extends PageProps {
    categories: Category[];
}

export default function Categories({ auth, categories }: CategoriesProps) {
    // Define state for managing loading state
    const [isLoading, setIsLoading] = useState(false);

    // Handle auto-generate category
    const handleAutoGenerateCategory = async () => {
        setIsLoading(true);
        try {
            await router.post(route('categories.auto-generate'), {}, {
                onSuccess: () => setIsLoading(false),
                onError: () => setIsLoading(false),
            });
        } catch (error) {
            console.error(error);
            setIsLoading(false);
        }
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-black-800 leading-tight">Categories</h2>}
        >
            <Head title="Categories" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="text-lg font-medium">Category List</h3>
                                <div>
                                    <Link
                                        href={route('categories.create')}
                                        className="bg-red-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-2"
                                    >
                                        Create Category
                                    </Link>
                                    <button
                                        onClick={handleAutoGenerateCategory}
                                        disabled={isLoading}
                                        className="bg-teal-500 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                    >
                                        {isLoading ? 'Generating...' : 'Auto-Generate Category'}
                                    </button>
                                </div>
                            </div>

                            {/* Table to display categories */}
                            <table className="min-w-full bg-white">
                                <thead>
                                    <tr>
                                        <th className="py-2 px-4 border-b">ID</th>
                                        <th className="py-2 px-4 border-b">Name</th>
                                        <th className="py-2 px-4 border-b">Description</th>
                                        <th className="py-2 px-4 border-b">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {categories.map((category) => (
                                        <tr key={category.id}>
                                            <td className="py-2 px-4 border-b">{category.id}</td>
                                            <td className="py-2 px-4 border-b">{category.name}</td>
                                            <td className="py-2 px-4 border-b">{category.description}</td>
                                            <td className="py-2 px-4 border-b">
                                                <Link
                                                    href={route('categories.edit', category.id)}
                                                    className="text-blue-600 hover:underline"
                                                >
                                                    Edit
                                                </Link>
                                                <Link
                                                    href={route('categories.destroy', category.id)}
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
