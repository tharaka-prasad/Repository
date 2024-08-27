import React, { useState, useEffect } from 'react';
import { useForm } from '@inertiajs/react';
import Dropzone from 'react-dropzone';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';




interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image?: string;
}

interface Auth {
  user: { id: number; name: string };
}

interface Category {
  id: number;
  name: string;
}

interface EditProductProps {
  product: Product;
  auth: Auth;
  categories: Category[];
}


const EditProduct: React.FC<EditProductProps> = ({ product, auth, categories }) => {
  const { data, setData, post, errors } = useForm({
    name: product.name,
    description: product.description,
    price: product.price,
    category_id: product.id,
    image: null as File | null,
  });

  const [files, setFiles] = useState<{ preview: string }[]>([]);

  useEffect(() => {
    if (product.image) {
      setFiles([{ preview: product.image }]);
    }
  }, [product.image]);

  const onDrop = (acceptedFiles: File[]) => {
    setFiles(
      acceptedFiles.map((file) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        })
      )
    );
    setData('image', acceptedFiles[0]);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    post(`/products/${product.id}`);
  };

  return (
    <AuthenticatedLayout
        user={auth.user} // Pass the authenticated user
        header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Edit Product</h2>}
>
    <div>

      <form onSubmit={handleSubmit} className="py-12 max-w-7xl mx-auto sm:px-6 lg:px-8">
        <div >
          <label>Product Name:</label>
          <input
            type="text"
            value={data.name}
            onChange={(e) => setData('name', e.target.value)}
          />
          {errors.name && <span>{errors.name}</span>}
        </div>

        <div>
          <label>Description:</label>
          <textarea
            value={data.description}
            onChange={(e) => setData('description', e.target.value)}
          />
          {errors.description && <span>{errors.description}</span>}
        </div>

        <div>
          <label>Price:</label>
          <input
            type="number"
            value={data.price}
            onChange={(e) => setData('price', parseFloat(e.target.value))}
          />
          {errors.price && <span>{errors.price}</span>}
        </div>

        <div>
          <label>Category Name:</label>
          <select
            value={data.category_id}
            onChange={(e) => setData('category_id', parseInt(e.target.value))}
          >
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
          {errors.category_id && <span>{errors.category_id}</span>}
        </div>

        <div>
          <label>Product Image:</label>
          <Dropzone onDrop={onDrop}>
            {({ getRootProps, getInputProps }) => (
              <div {...getRootProps({ className: 'dropzone' })}>
                <input {...getInputProps()} />
                <p>Drag 'n' drop some files here, or click to select files</p>
                {files.map((file) => (
                  <img
                    key={file.preview}
                    src={file.preview}
                    alt="Preview"
                    width={100}
                  />
                ))}
              </div>
            )}
          </Dropzone>
          {errors.image && <span>{errors.image}</span>}
        </div>

        <button type="submit"
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
            Save Changes</button>
      </form>
    </div>
    </AuthenticatedLayout>
  );
};

export default EditProduct;
