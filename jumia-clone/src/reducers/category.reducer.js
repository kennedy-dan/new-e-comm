import { categoryConstants } from "../actions/constants";

const initState = {
  categories: [],
  loading: false,
  error: null,
};

const addnewCategory = (parentId, categories, category) => {
  let getCategory = [];

  if(parentId === undefined){
    return [
      ...categories,
      {
        name: category.name,
        slug: category.slug,
        _id: category._id,
        children: []
      }
    ]
  }
  
  categories.map((cats) => {
    if(cats._id == parentId){
      getCategory.push({
        ...cats,
        children:
          cats.children 
            ? addnewCategory(parentId,[...cats.children, {
              _id: category._id,
              name: category.name,
              parentId: category.parentId,
              slug: category.slug,
              children: category.children
            }], category)
            : [],
      });
    }else{
      getCategory.push({
        ...cats,
        children:
          cats.children 
            ? addnewCategory(parentId, cats.children, category)
            : [],
      });
    }
    
  });
  return getCategory
// console.log(categories)
};

export default (state = initState, action) => {
  switch (action.type) {
    case categoryConstants.GET_CATEGORY_SUCCESS:
      state = {
        ...state,
        categories: action.payload.categories,
      };
      break;
    case categoryConstants.ADD_CATEGORY_REQUEST:
      state = {
        ...state,
        loading: true,
      };
      break;
    case categoryConstants.ADD_CATEGORY_SUCCESS:
      const category =  action.payload.category
      const updatedCats =  addnewCategory(category.parentId ,state.categories,category) 
      console.log('updated categories', updatedCats)
      state = {
        ...state,
        categories: updatedCats,
        loading: false,
      };
      break;
    case categoryConstants.ADD_CATEGORY_FAILURE:
      state = {
        ...initState,
      };
  }
  return state;
};
