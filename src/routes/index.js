import React from "react";
import { Redirect, } from "react-router-dom";

// Authentication related pages
import Login from "../pages/Authentication/Login";
import Logout from "../pages/Authentication/Logout";
import Register from "../pages/Authentication/Register";
import ForgetPwd from "../pages/Authentication/ForgetPassword";
import CreateUser from '../pages/CreateUser/CreateUser.jsx';
import UserList from '../pages/UserList/UserList.jsx'
import AddWord from '../pages/AddWords/AddWord.jsx'
import UserInfo from '../pages/UserInfo/UserInfo.jsx'
import CreateReferance from '../pages/CreateReferance/CreateReferance.jsx'
import References from '../pages/References/References.jsx'
import ReferenceWords from '../pages/References/ReferenceWords.jsx'
import ReferenceEdit from '../pages/References/editReference'
import Dictionary from '../pages/dictionary/dictionary.jsx'
import WordProfile from '../pages/WordProfile/WordProfile.jsx'
import Categories from '../pages/Categories/Categories.jsx'
import CategoriesList from '../pages/Categories/CategoriesList.jsx'
import CategoriesUpdate from '../pages/Categories/CategoriesUpdate.jsx'


  // Dashboard
import Dashboard from "../pages/Dashboard/index";
import UpdateWord from "../pages/AddWords/UpdateWord";

const authProtectedRoutes = [
	{ path: "/dashboard", component: Dictionary },
	{ path: "/CreateUser",exact: true, component: CreateUser},
	{ path: "/UserList",exact: true, component: UserList},
	{ path: "/Dictionary",exact: true, component: Dictionary},
	{ path: "/AddWord",exact: true, component: AddWord},
	{ path: "/UpdateWord/:id", component: UpdateWord},
	{ path: "/References",exact: true, component: References},
	{path:"/reference-words/:name/:id",component:ReferenceWords},
	{path:"/reference-edit/:id",component:ReferenceEdit},
	{ path: "/user-info/:id", component: UserInfo},
	{path:"/CreateReferance",exact:true,component:CreateReferance},
	{ path: "/word-profile/:id", component: WordProfile},
	{ path: "/Categories",exact: true, component: Categories},
	{ path: "/CategoriesList",exact: true, component: CategoriesList},
    {path:"/categories-update/:id",component:CategoriesUpdate},
	
				
	


	// this route should be at the end of all other routes
	{ path: "/", exact: true, component: () => <Redirect to="/dashboard" /> }
];

const publicRoutes = [
	{ path: "/logout", component: Logout },
	{ path: "/login", component: Login },
	{ path: "/forgot-password", component: ForgetPwd },
	{ path: "/register", component: Register },

];

export { authProtectedRoutes, publicRoutes };
