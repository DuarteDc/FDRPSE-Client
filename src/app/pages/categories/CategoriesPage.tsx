import { useEffect } from "react";
import { categoriesService } from "../../../domain/services/categories.service"
import { Card } from "../../../infraestructure/components/ui"

export const CategoriesPage = () => {

  const { categories, startGetCategories, loading } = categoriesService();

  useEffect(() => {
    startGetCategories();
  }, []);


  return (
    <div>
      <h1 className="text-center text-6xl font-extrabold text-emerald-700">Categorias</h1>
      <div className="grid grid-cols-4 gap-10 mt-20">
        {
          categories?.map((category) => (
            <Card title={category.name} />
          ))
        }
      </div>
    </div>
  )
}
