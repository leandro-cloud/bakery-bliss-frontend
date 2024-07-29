import { useEffect, useState } from "react"
import { axiosInstance, axiosPrivateInstance } from "../api/axios"
import { useFieldArray, useForm } from "react-hook-form"
import { objectToFormData } from "../utils/formData"
import { ACCEPTED_FILE_TYPES, DIFFICULTY_LEVELS } from "../utils/constants"
import { AddIcon, ArrowIcon, DeleteIcon, UploadIcon } from "./icons/Icons"
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useNavigate } from "react-router-dom"
import { toast, Toaster } from "sonner"

const ingredientSchema = z.object({
  ingredientName: z.string().min(1, 'El ingrediente es requerido'),
  quantity: z.string().min(1, 'La cantidad es requerida')
})

const recipeSchema = z.object({
  title: z.string().min(1, 'El título es requerido'),
  ingredients: z.array(ingredientSchema).min(2, 'Debes agregar al menos dos ingredientes'),
  instructions: z.array(z.string().min(1, 'Las instrucciones no pueden estar vacias')).min(1, 'Debes agregar al menos una instrucción'),
  prepTime: z.string(),
  quantity: z.string(),
  category: z.array(z.string()),
  difficulty: z.string(),
  image: z.any()
})

export const FormRecipe = () => {
  const [categories, setCategories] = useState(null)
  const [backgroundImage, setBackgroundImage] = useState({
    image: '',
    backGroundURL: ''
  })
  const navigate = useNavigate()

  const { register, setError, clearErrors, formState: { errors }, handleSubmit, control, watch, setValue } = useForm({
    resolver: zodResolver(recipeSchema),
    defaultValues: {
      ingredients: [
        { ingredientName: '', quantity: '' },
        { ingredientName: '', quantity: '' }
      ],
      instructions: [''],
      prepTime: '',
      quantity: '',
      category: [],
      difficulty: '',
      image: ''
    }
  })

  const { fields: ingredientsFields, append: appendIngredient, remove: removeIngredient } = useFieldArray({
    name: "ingredients",
    control
  })

  const { fields: instructionFields, append: appendInstruction, remove: removeInstruction } = useFieldArray({
    control,
    name: 'instructions'
  })

  const selectedCategories = watch("category") || []
  const selectedDifficulty = watch("difficulty") || []

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axiosInstance.get('categories/get-categories')
        setCategories(response.data.categories)
      } catch (error) {
        console.log(error)
        toast.error(error.response.data.message, {
          className: 'toast-error'
        })
      }
    }

    fetchCategories()
  }, [])

  useEffect(() => {
    if (instructionFields.length === 0) {
      appendInstruction('')
    }
  }, [instructionFields, appendInstruction])

  const handleFileChange = (event) => {
    const file = event.target.files[0]
    if (file && ACCEPTED_FILE_TYPES.includes(file.type)) {
      clearErrors('image')
      const imageUrl = URL.createObjectURL(file)
      setBackgroundImage({
        backGroundURL: imageUrl,
        image: file
      })
      setValue('image', file)
    } else {
      setValue('image', '')
      setBackgroundImage({
        image: '',
        backGroundURL: ''
      })
      setError('image', {
        type: 'manual',
        message: 'El archivo tiene que ser tipo imagen'
      })
    }
  }

  const cleanData = (data) => {
    const dataCleaned = {}

    Object.entries(data).forEach(([key, value]) => {
      if (typeof value === 'string' && value !== '') {
        dataCleaned[key] = value
      } else if (Array.isArray(value) && value.length > 0) {
        dataCleaned[key] = value
      } else if (typeof value === 'object' && value !== null && !Array.isArray(value) && Object.keys(value).length > 0) {
        dataCleaned[key] = value
      } else if (value instanceof File) {
        dataCleaned[key] = value
      }
    })

    return dataCleaned
  }

  const onSubmit = async (data) => {
    try {
      const newData = cleanData(data)
      const formulario = objectToFormData(newData)
      const response = await axiosPrivateInstance.post('/recipes/create-recipe', formulario)
      toast.success('Receta creada', {
        className: 'toast-success'
      })

      setTimeout(() => {
        navigate(`/receta/${response.data.recipe}`)
      }, 2000)
    } catch (error) {
      console.log(error)
      toast.error(error.response.data.message, {
        className: 'toast-error'
      })
    }
  }

  return (
    <main className="recipe-form-main">
      <div className='form-recipe-container-main'>
        <form className='recipe-form' onSubmit={handleSubmit(onSubmit)}>
          {/* Title Field */}
          <div className='title-container'>
            <input
              name="title"
              type="text"
              {...register("title")}
              placeholder="Escribe aquí el nombre de tu receta"
            />
            {errors.title && <span className="error-message">{errors.title.message}</span>}
          </div>

          {/* Image Field */}
          <div className="recipe-form-container">
            <div className="container-1">
              <label htmlFor="image">
                <div className='image-input-container'
                  style={{ backgroundImage: `url(${backgroundImage.backGroundURL})` }}>
                  <UploadIcon height={'60px'} width={'60px'} />
                  <p>Haz clic para subir una imagen</p>
                  <input type='file' id="image" name="image" onChange={handleFileChange} accept="image/jpeg, image/png, image/gif" hidden />
                </div>
                {errors.image && <span className="error-message">{errors.image.message}</span>}
              </label>

              {/* Prep Time Field */}
              <div className='prepTime-container'>
                <label>Tiempo de preparación:</label>
                <input type="text" {...register("prepTime")} placeholder="1 hora" />
                {errors.prepTime && <span className="error-message">{errors.prepTime.message}</span>}
              </div>

              {/* Quantity Field */}
              <div className='quantity-container'>
                <label>Porciones:</label>
                <input type="text" {...register("quantity")} placeholder="4 porciones" />
                {errors.quantity && <span className="error-message">{errors.quantity.message}</span>}
              </div>

              {/* Difficulty Field */}
              <div className='difficulty-container'>
                <input type="checkbox" id="toggle-difficulty" className="check-difficulty" hidden />
                <label htmlFor="toggle-difficulty">
                  <div className="difficulty-check-container">
                    <span>Dificultad:</span>
                    <ArrowIcon className="arrow-icon" />
                  </div>
                </label>
                <div className="difficulties">
                  {Object.entries(DIFFICULTY_LEVELS).map(([key, value]) => (
                    <div key={key} className={`difficulty ${selectedDifficulty.includes(key) ? 'selected' : ''}`}>
                      <label htmlFor={key}>{value}</label>
                      <input id={key} value={key} type="radio" {...register("difficulty")} hidden />
                    </div>
                  ))}
                </div>
                {errors.difficulty && <span className="error-message">{errors.difficulty.message}</span>}
              </div>

              {/* Categories Field */}
              <div className='categories-container'>
                <input type="checkbox" id="toggle-categories" className="check-categories" hidden />
                <label htmlFor="toggle-categories">
                  <div className="category-label-container">
                    <span>Categorias</span>
                    <ArrowIcon className="arrow-icon" />
                  </div>
                </label>
                <div className='category-container'>
                  {categories?.map((category) => (
                    <div className={`category ${selectedCategories.includes(category._id) ? 'selected' : ''}`} key={category._id}>
                      <label htmlFor={category._id}>{category.category}</label>
                      <input id={category._id} type="checkbox" value={category._id} {...register("category")} hidden />
                    </div>
                  ))}
                </div>
                {errors.category && <span className="error-message">{errors.category.message}</span>}
              </div>
            </div>

            {/* Ingredients Field */}
            <div className="container-2">
              <div className='ingredients-container'>
                <label>Ingredientes:</label>
                <div className="ingredients">
                  {ingredientsFields.map((field, index) => (
                    <div key={field.id} className="ingredient">

                      <div className="ingredient-container">
                        <input
                          {...register(`ingredients.${index}.ingredientName`)}
                          defaultValue={field.ingredientName}
                          placeholder='Ingrediente'
                        />
                        {errors.ingredients?.[index]?.ingredientName && (
                          <span className="error-message">{errors.ingredients[index].ingredientName.message}</span>
                        )}
                      </div>


                      <div className="quantity-ingredient-container">
                        <input
                          type="text"
                          {...register(`ingredients.${index}.quantity`)}
                          defaultValue={field.quantity}
                          placeholder='Cantidad'
                        />
                        {errors.ingredients?.[index]?.quantity && (
                          <span className="error-message">{errors.ingredients[index].quantity.message}</span>
                        )}
                      </div>


                      <div className="delete-ingredient-container">
                        <button className="delete-button" type="button" onClick={() => removeIngredient(index)}>
                          <DeleteIcon />
                        </button>
                      </div>

                    </div>
                  ))}
                  <div className="add-button-container">
                    <button
                      className="add-button"
                      type="button"
                      onClick={() => appendIngredient({ ingredientName: '', quantity: '' })}
                      title="Agregar Ingrediente"
                    >
                      <AddIcon />
                    </button>
                  </div>
                </div>
                {errors.ingredients && <span className="error-message">{errors.ingredients.message}</span>}
              </div>

              {/* Instructions Field */}
              <div className='instructions-container'>
                <label>Instrucciones:</label>
                <div className="instructions">
                  {instructionFields.map((field, index) => (
                    <div key={field.id} className="instruction-container">
                      <div className="instruction">
                        <textarea className="instruction-text"
                          {...register(`instructions.${index}`)}
                          placeholder={'Escribe el siguiente paso'}
                        />
                        {errors.instructions && errors.instructions[index] && (
                          <span className="error-message">{errors.instructions[index].message}</span>
                        )}
                      </div>
                      <div className="delete-button-container">
                        <button className="delete-instruction-button" type="button" onClick={() => removeInstruction(index)}
                          title="Eliminar Instruccion"  >
                          <DeleteIcon />
                        </button>
                      </div>
                    </div>
                  ))}
                  <div className="add-instruction-container">
                    <button className="add-button" type="button" onClick={() => appendInstruction('')}
                      title="Agregar Instruccion"  >
                      <AddIcon />
                    </button>
                  </div>
                </div>
                {errors.instructions && <span className="error-message">{errors.instructions.message}</span>}
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className='submit-container'>
            <button type="submit">Enviar</button>
          </div>
        </form>
      </div>
      <Toaster />
    </main>
  )
}
