import { Fragment, createRef, useEffect, useRef } from 'react';
import { Button, Card, Spinner, Tooltip, useDisclosure } from '@nextui-org/react';

import CardList from '../../../infraestructure/components/ui/CardList';
import { AlertConfirm, FormQualification, PageLayout } from '../../../infraestructure/components/ui'
import { categoriesService } from '../../../domain/services/categories.service'
import { CategoryIcon, PlusIcon, TrashIcon, XIcon } from '../../../infraestructure/components/icons';
import { useNavigation } from '../../hooks/useNavigation';
import { Category } from '../../../domain/models';
import { Modal } from '../../../infraestructure/components/ui/Modal';
import { CommonQualifictions, QualifictionFormData } from '../../../infraestructure/components/ui/FormQualification';
import { Qualifictions } from '../../../infraestructure/components/categories/FormCategory';

const initialState: Qualifictions = {
  id: new Date().getTime().toString(),
  despicable: 0,
  low: 0,
  middle: 0,
  high: 0,
  very_high: 0
}

export const CategoriesPage = () => {

  const { navigate } = useNavigation();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { isOpen: isOpenAlert, onOpen: onOpenAlert, onOpenChange: onOpenChangeAlert } = useDisclosure();
  const { isOpen: isOpenForm, onOpen: onOpenForm, onOpenChange: onOpenChangeForm } = useDisclosure();

  const { category, categories, loading, startGetCategoryWithQualifications, startGetCategories, startAddQualification, clearCacheCategorySelected, startRemoveQualification } = categoriesService();

  const formRef = createRef<QualifictionFormData>();
  const categoryRef = useRef<{ [key: string]: number }>();

  useEffect(() => {
    startGetCategories();
  }, []);

  const handleSelectCategory = async (category: Category) => {
    onOpen()
    await startGetCategoryWithQualifications(category.id);
  }

  const saveFormQualification = async (formData: CommonQualifictions) => {
    startAddQualification(category?.id!, { qualification: formData })
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
              (!category || loading) ? (
                <div className="w-full h-[20rem] overflow-hidden flex flex-col font-bold justify-center items-center text-emerald-600">
                  <Spinner color="current" />
                  <span>Cargando...</span>
                </div>
              ) : (
                <Fragment>
                  <header className="flex items-center justify-between -mt-6 py-1 border-b-2 ">
                    <div className="flex items-center font-bold [&>svg]:text-emerald-600 text-xl [&>svg]:mr-1 pt-4 [&>svg]:border-2 [&>svg]:rounded-full [&>svg]:p-1">
                      <CategoryIcon width={35} height={35} strokeWidth={1.5} />
                      <h3>Detalle de Categoría</h3>
                    </div>
                    <Button isIconOnly className="border-2 bg-transparent" onClick={() => { onClose(); clearCacheCategorySelected() }}>
                      <XIcon />
                    </Button>
                  </header>
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="mb-5 block col-span-3">
                        <span className="flex items-center [&>svg]:text-emerald-600 mt-1 [&>svg]:border-2 [&>svg]:rounded-full [&>svg]:p-1 [&>svg]:mr-2">
                          <p className="font-bold text-sm">{category.name}</p>
                        </span>
                        <p className="text-gray-500 font-bold md:text-xs md:pl-5 text-[10px]">
                          Aquí se lista una descripción de la categoría con las diferentes calificaciones con las cuales se puede calificar una pregunta.
                        </p>
                      </span>
                      <Tooltip content="Agregar calificación" color="foreground" size="sm">
                        <Button isIconOnly className="bg-slate-800 text-white" onClick={onOpenForm}>
                          <PlusIcon strokeWidth={2.5} width={18} height={18} />
                        </Button>
                      </Tooltip>
                    </div>
                    {
                      category?.qualifications?.map(({ despicable, high, id, low, middle }) => (
                        <Card
                          className={`grid grid-cols-5 text-[10px] md:text-sm text-center border-2 hover:border-emerald-600 hover:scale-[1.005] transition-all duration-400 rounded-lg cursor-pointer pb-2 my-2 font-bold [&>span]:py-1 relative overflow-visible`}
                          key={id}>
                          <span
                            className="bg-white absolute -top-3 -right-2 rounded-full border-2 p-1 hover:border-danger hover:text-danger transition-all duration-400 z-20"
                            onClick={() => { categoryRef.current = { [category.id]: id }; onOpenAlert() }}
                          >
                            <TrashIcon height={15} width={15} strokeWidth={2} />
                          </span>
                          <span className="bg-emerald-600 pt-2 mb-2 text-white">Nula o despreciable</span>
                          <span className="bg-emerald-600 pt-2 mb-2 text-white">Baja</span>
                          <span className="bg-emerald-600 pt-2 mb-2 text-white">Media</span>
                          <span className="bg-emerald-600 pt-2 mb-2 text-white">Alta</span>
                          <span className="bg-emerald-600 pt-2 mb-2 text-white">Muy alta</span>
                          <span>{`< ${despicable}`}</span>
                          <span>{`>= ${despicable} < ${low}`}</span>
                          <span>{`>= ${low} < ${middle}`}</span>
                          <span>{`>= ${middle} < ${high}`}</span>
                          <span>{`>=${high}`}</span>
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
      < Modal
        isOpen={isOpenForm}
        onChange={onOpenChangeForm}
        hideCloseButton
        size="4xl"
        renderContent={(onClose) => (
          <Fragment>
            <header className="flex items-center justify-between -mt-6 py-1 border-b-2 ">
              <div className="flex items-center font-bold [&>svg]:text-emerald-600 text-xl [&>svg]:mr-1 pt-4 [&>svg]:border-2 [&>svg]:rounded-full [&>svg]:p-1">
                <CategoryIcon width={35} height={35} strokeWidth={1.5} />
                <h3>Agregar calificación</h3>
              </div>
              <Button isIconOnly className="border-2 bg-transparent" onClick={onClose}>
                <XIcon />
              </Button>
            </header>

            <FormQualification
              ref={formRef}
              multipleFrom={false}
              saveFormQualification={saveFormQualification}
              initialState={initialState}
            />

            <Button
              className="w-full mt-5 bg-slate-800 py-7 text-white font-bold text-xs"
              isLoading={loading}
              spinner={<Spinner size="sm" color="current" />}
              size="lg"
              type="submit"
              onClick={() => { formRef.current?.sendFrom(); onClose() }}
            >
              Crear
            </Button>
          </Fragment>
        )}
      />

      < AlertConfirm
        isOpen={isOpenAlert}
        isOpenChange={onOpenChangeAlert}
        confirmButtonColor="danger"
        title="¿Estas seguro que deseas eliminar la calificación?"
        callback={() => { startRemoveQualification(Object.keys(categoryRef.current!)[0], Object.values(categoryRef!.current!)[0]) }}
        subtitle={
          < span className={`flex flex-col items-center  [&>svg]:text-danger [&>svg]:border-danger/60' 
                     mt-1 [&>svg]:border-2 [&>svg]:rounded-full [&>svg]:p-1 [&>svg]:mr-2 text-xs text-center py-4 [&>svg]:mb-2`}>
            <TrashIcon width={46} height={46} strokeWidth={1.7} />
            <p className="font-bold">
              La calificación se eliminará de forma permanente
            </p>
          </span >
        }

      />
    </PageLayout >
  )
}

