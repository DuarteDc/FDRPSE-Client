import { Fragment, useEffect } from 'react';
import { Button, Card, useDisclosure } from '@nextui-org/react';

import CardList from '../../../infraestructure/components/ui/CardList';
import { PageLayout } from '../../../infraestructure/components/ui'
import { categoriesService } from '../../../domain/services/categories.service'
import { CategoryIcon, PlusIcon, XIcon } from '../../../infraestructure/components/icons';
import { useNavigation } from '../../hooks/useNavigation';
import { Category } from '../../../domain/models';
import { Modal } from '../../../infraestructure/components/ui/Modal';
import { QualificationCard } from '../../../infraestructure/components/qualification';

export const CategoriesPage = () => {

  const { navigate } = useNavigation();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const { category, categories, loading, startGetCategoryWithQualifications, startGetCategories } = categoriesService();

  useEffect(() => {
    startGetCategories();
  }, []);

  const handleSelectCategory = async (category: Category) => {
    onOpen()
    await startGetCategoryWithQualifications(category.id);
  }

  return (
    <PageLayout title="Categorías">
      <span className="mb-5 block col-span-3">
        <span className="flex items-center [&>svg]:text-emerald-600 mt-1 [&>svg]:border-2 [&>svg]:rounded-full [&>svg]:p-1 [&>svg]:mr-2">
          <CategoryIcon width={35} height={35} strokeWidth={1.5} />
          <p className="font-bold">Lista de categorías</p>
        </span>
        <p className="text-gray-500 font-bold text-xs pl-10">Las categorias son utiles para cuestionarios que cuentan con una calificación</p>
      </span>
      <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 xl:gap-5 my-4 lg:mt-20">
        <CardList data={categories} loading={loading} onPress={handleSelectCategory}>
          <CardList.CreateItem
            title="Crear categoría"
            image={<PlusIcon />}
            onPress={() => navigate('create')}
          />
        </CardList>
      </div>
      <Modal
        isOpen={isOpen}
        onChange={onOpenChange}
        hideCloseButton
        size="4xl"
        renderContent={(onClose) => (
          <Fragment>
            {
              !category ? (<p>Loading xD</p>) : (
                <Fragment>
                  <header className="flex items-center justify-between -mt-6 py-1 border-b-2 ">
                    <div className="flex items-center font-bold [&>svg]:text-emerald-600 text-xl [&>svg]:mr-1 pt-4 [&>svg]:border-2 [&>svg]:rounded-full [&>svg]:p-1">
                      <CategoryIcon width={35} height={35} strokeWidth={1.5} />
                      <h1>Detalle de Categoría</h1>
                    </div>
                    <Button isIconOnly className="border-2 bg-transparent" onClick={onClose}>
                      <XIcon />
                    </Button>
                  </header>
                  <div>
                    <span>{category.name}</span>
                    {
                      category?.qualifications.map(({ despicable, high, id, low, middle, veryHigh }) => (
                        <Card className={`grid grid-cols-5 text-xs text-center border-2 cursor-pointer pb-2 my-2`} key={id}>
                          <span className="bg-emerald-600 pt-2 mb-2 text-white">Nula o despicable</span>
                          <span className="bg-emerald-600 pt-2 mb-2 text-white">Baja</span>
                          <span className="bg-emerald-600 pt-2 mb-2 text-white">Media</span>
                          <span className="bg-emerald-600 pt-2 mb-2 text-white">Alta</span>
                          <span className="bg-emerald-600 pt-2 mb-2 text-white">Muy alta</span>
                          <span>{despicable}</span>
                          <span>{low}</span>
                          <span>{middle}</span>
                          <span>{high}</span>
                          <span>{veryHigh}</span>
                        </Card>
                      ))
                    }
                  </div>
                </Fragment>
              )
            }
          </Fragment>
        )
        }
      />
    </PageLayout>
  )
}
