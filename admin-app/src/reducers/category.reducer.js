import { categoryConstants } from "../actions/constants";

const initState = {
  categories: [],
  loading: false,
  error: null,
};

const addnewCategory = (parentId, categories, category) => {
  let getCategory = [];

  if (parentId === undefined) {
    return [
      ...categories,
      {
        name: category.name,
        slug: category.slug,
        type: category.type,
        _id: category._id,
        children: [],
      },
    ];
  }

  categories.map((cats) => {
    if (cats._id == parentId) {
      const newcategory = {
        _id: category._id,
        name: category.name,
        parentId: category.parentId,
        type: category.type,
        slug: category.slug,
        children: [],
      };
      getCategory.push({
        ...cats,
        children:
          cats.children.length > 0
            ? [...cats.children, newcategory]
            : [newcategory],
      });
    } else {
      getCategory.push({
        ...cats,
        children: cats.children
          ? addnewCategory(parentId, cats.children, category)
          : [],
      });
    }
  });
  return getCategory;
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
      const category = action.payload.category;
      const updatedCats = addnewCategory(
        category.parentId,
        state.categories,
        category
      );
      console.log("updated categories", updatedCats);
      state = {
        ...state,
        categories: updatedCats,
        loading: false,
      };
      break;
    case categoryConstants.ADD_CATEGORY_FAILURE:
      state = {
        ...initState,
        loading: false,
        error: action.payload.error

      };
      break;
    case categoryConstants.UPDATE_CATEGORY_REQUEST:
      state = {
        ...state,
        loading: true,
      };
      break;
    case categoryConstants.UPDATE_CATEGORY_SUCCESS:
      state = {
        ...state,
        loading: false,
      };
      break;
    case categoryConstants.UPDATE_CATEGORY_FAILURE:
      state = {
        ...state,
        error: action.payload.error,
        loading: false
      };
      break;
    case categoryConstants.DELETE_CATEGORY_REQUEST:
      state = {
        ...state,
        loading: true
      };
      break;
    case categoryConstants.DELETE_CATEGORY_SUCCESS:
      state = {
        ...state,
        loading: false
      };
      break;
    case categoryConstants.DELETE_CATEGORY_FAILURE:
      state = {
        ...state,
        error: action.payload.error,
        loading: false
      };
      break;
  }
  return state;
};
