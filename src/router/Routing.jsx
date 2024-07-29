import { BrowserRouter, Route, Routes } from "react-router-dom"
import { Homepage } from "../pages/Homepage"
import { ProtectedRoutes } from "../components/ProtectedRoutes"
import { Layout } from "../layout/Layout"
import { Login } from "../pages/Login"
import { Register } from "../pages/Register"
import { Recipe } from "../pages/Recipe"
import { Favorites } from "../pages/Favorites"
import { UserRecipes } from "../pages/UserRecipes"
import { Search } from "../pages/Search"
import { Error } from "../pages/Error"
import { SearchByCategory } from "../pages/SearchByCategory"
import { SearchByDifficulty } from "../pages/SearchByDifficulty"
import { CreateRecipe } from "../pages/CreateRecipe"
import { UpdateRecipe } from "../pages/UpdateRecipes"
import { EditProfile } from "../pages/EditProfile"
import { ResetPassword } from "../pages/ResetPassword"

export const Routing = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<Homepage />} />
          <Route path="login" element={<Login />} />
          <Route path="registro" element={<Register />} />
          <Route path="receta/:recipeID" element={<Recipe />} />
          <Route path="search" element={<Search />} />
          <Route path="buscar-por-categoria" element={<SearchByCategory />} />
          <Route path="buscar-por-dificultad" element={<SearchByDifficulty />} />
          <Route path="reset-password/:token" element={<ResetPassword />} />
          <Route element={<ProtectedRoutes />}>
            <Route path="/crear-receta" element={<CreateRecipe />} />
            <Route path="/modificar-receta/:recipeId" element={<UpdateRecipe />} />
            <Route path="/favoritos" element={<Favorites /> } />
            <Route path="/mis-recetas" element={<UserRecipes />} />
            <Route path="/editar-perfil" element= {<EditProfile />} />
          </Route>
          <Route path="*" element={<Error />} />
        </Route>

      </Routes>
    
    </BrowserRouter>
  )
}
