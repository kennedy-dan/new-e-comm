const createCats = (categories, options = []) => {
    categories.map((cats) => {
      options.push({
        _id: cats._id,
        name: cats.name,
        parentId: cats.parentId,
        type: cats.type
      });
      if (cats.children.length > 0) {
        createCats(cats.children, options);
      }
    });

    return options;
  };
  export default createCats